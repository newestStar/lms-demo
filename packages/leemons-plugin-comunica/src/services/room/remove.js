const _ = require('lodash');
const { table } = require('../tables');
const { validateKeyPrefix, validateNotExistRoomKey } = require('../../validations/exists');

async function remove(key, { transacting: _transacting } = {}) {
  validateKeyPrefix(key, this.calledFrom);

  return global.utils.withTransaction(
    async (transacting) => {
      await validateNotExistRoomKey(key, { transacting });

      const userAgents = await table.userAgentInRoom.find({ room: key }, { transacting });

      await Promise.all([
        table.room.delete({ key }, { transacting }),
        table.userAgentInRoom.deleteMany({ room: key }, { transacting }),
        table.message.deleteMany({ room: key }, { transacting }),
        leemons.getPlugin('users').services.permissions.removeItems(
          {
            type: 'plugins.comunica.room.view',
            item: key,
          },
          { transacting }
        ),
      ]);

      _.forEach(userAgents, ({ userAgent }) => {
        leemons.socket.emit(userAgent, `COMUNICA:CONFIG:ROOM:REMOVE`, { key });
      });

      return true;
    },
    table.room,
    _transacting
  );
}

module.exports = { remove };
