const _ = require('lodash');
const { table } = require('../tables');
const { validateKeyPrefix, validateNotExistRoomKey } = require('../../validations/exists');

async function add(room, userAgent, { transacting }) {
  const response = await table.userAgentInRoom.findOne(
    {
      deleted_$null: false,
      room,
      userAgent,
    },
    { transacting }
  );
  if (response) {
    // Si la existe el usuario en la sala, pero borrado se le reactiva
    if (response.deleted) {
      const result = await table.userAgentInRoom.update(
        {
          deleted_$null: false,
          room,
          userAgent,
        },
        {
          deleted: false,
          deleted_at: null,
        },
        { transacting }
      );
      return {
        added: true,
        userAgent,
        result,
      };
    }
    return {
      added: false,
      userAgent,
      result: response,
    };
  }
  // Si el usuario no esta en la sala le añadimos
  const result = await table.userAgentInRoom.create(
    {
      room,
      userAgent,
      encryptKey: global.utils.randomString(16),
    },
    { transacting }
  );
  return {
    added: true,
    userAgent,
    result,
  };
}

async function addUserAgents(
  key,
  _userAgents,
  { ignoreCalledFrom, transacting: _transacting } = {}
) {
  if (!ignoreCalledFrom) validateKeyPrefix(key, this.calledFrom);

  const userAgents = _.isArray(_userAgents) ? _userAgents : [_userAgents];

  return global.utils.withTransaction(
    async (transacting) => {
      await validateNotExistRoomKey(key, { transacting });

      const currentUserAgentsInRoom = await table.userAgentInRoom.find(
        { room: key },
        { transacting }
      );

      const results = await Promise.all(
        _.map(userAgents, (userAgent) => add(key, userAgent, { transacting }))
      );

      const responsesAdded = _.filter(results, { added: true });

      // Informamos a los usuarios añadidos de que han sido añadidos
      _.forEach(responsesAdded, ({ userAgent }) => {
        leemons.socket.emit(userAgent, `COMUNICA:ROOM:ADDED`, {
          room: key,
        });
      });

      // Vamos a sacar los usuarios añadidos para enviarle a todas los usuarios de antes los nuevos usuarios
      const userAgen = await leemons
        .getPlugin('users')
        .services.users.getUserAgentsInfo(_.map(responsesAdded, 'userAgent'), {
          withProfile: true,
        });
      const userAgentsById = _.keyBy(userAgen, 'id');
      const userAgentsAddedGood = _.map(responsesAdded, (a) => ({
        userAgent: userAgentsById[a.userAgent],
        adminMuted: a.result.adminMuted,
        isAdmin: a.result.isAdmin,
        deleted: a.result.deleted,
      }));

      _.forEach(currentUserAgentsInRoom, (userAgentInRoom) => {
        _.forEach(userAgentsAddedGood, (data) => {
          leemons.socket.emit(userAgentInRoom.userAgent, `COMUNICA:ROOM:USER_ADDED`, {
            key,
            userAgent: data,
          });
        });
      });

      const responses = _.map(results, 'result');
      _.forEach(responses, (response) => {
        delete response.encryptKey;
      });

      return _.isArray(_userAgents) ? responses : responses[0];
    },
    table.room,
    _transacting
  );
}

module.exports = { addUserAgents };
