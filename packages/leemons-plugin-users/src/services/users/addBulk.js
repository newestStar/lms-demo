const _ = require('lodash');
const { table } = require('../tables');
const {
  getRoleForRelationshipProfileCenter,
} = require('../profiles/getRoleForRelationshipProfileCenter');
const { encryptPassword } = require('./bcrypt/encryptPassword');
const getDefaultLocale = require('../platform/getDefaultLocale');
const {
  addCalendarToUserAgentsIfNeedByUser,
} = require('../user-agents/calendar/addCalendarToUserAgentsIfNeedByUser');
const { validateAddUsersBulkForm } = require('../../validations/forms');
const { sendWelcomeEmailToUser } = require('./sendWelcomeEmailToUser');
const { setUserForRegisterPassword } = require('./setUserForRegisterPassword');
const { sendNewProfileAddedEmailToUser } = require('./sendNewProfileAddedEmailToUser');
const { addUserAvatar } = require('./addUserAvatar');

async function addUserBulk(
  role,
  { id, tags, password, birthdate, avatar, created_at, ...userData },
  ctx,
  { profile, transacting } = {}
) {
  const tagsService = leemons.getPlugin('common').services.tags;

  let user = null;
  if (id) {
    user = await table.users.findOne({ id }, { transacting });
  } else {
    user = await table.users.findOne({ email: userData.email }, { transacting });
  }
  let isNewUser = false;
  if (!user) {
    user = await table.users.create(
      {
        ...userData,
        birthdate: birthdate ? global.utils.sqlDatetime(birthdate) : birthdate,
        password: password ? await encryptPassword(password) : undefined,
      },
      {
        transacting,
      }
    );
    await setUserForRegisterPassword(user.id, { transacting });
    await sendWelcomeEmailToUser(user, ctx, { transacting });
    isNewUser = true;
  } else if (id) {
    await table.users.update(
      { id },
      {
        ...userData,
        birthdate: birthdate ? global.utils.sqlDatetime(birthdate) : birthdate,
      },
      {
        transacting,
      }
    );
  }
  let userAgent = await table.userAgent.findOne(
    {
      deleted_$null: false,
      user: user.id,
      role,
    },
    { transacting }
  );
  if (!userAgent) {
    userAgent = await table.userAgent.create(
      {
        role,
        user: user.id,
        reloadPermissions: true,
      },
      { transacting }
    );
    // ES: Si no tenia el perfil y no es nuevo usuario, le mandamos el email
    if (!isNewUser) {
      await sendNewProfileAddedEmailToUser(user, profile, ctx, { transacting });
    }
  } else if (userAgent.deleted) {
    console.log('vamos a actualizar el user agent', role, user.id);
    userAgent = await table.userAgent.update(
      {
        deleted_$null: false,
        role,
        user: user.id,
      },
      {
        deleted: false,
        deleted_at: null,
      },
      { transacting }
    );
    await leemons.events.emit('user-agent:restore', { userAgent, transacting });
  }

  if (isNewUser) {
    await addUserAvatar({ ...user, userAgents: [userAgent] }, avatar, { transacting });
  }

  if (tags && _.isArray(tags) && tags.length) {
    await tagsService.setTagsToValues('plugins.users.user-agent', tags, userAgent.id, {
      transacting,
    });
  }

  if (leemons.getPlugin('calendar')) {
    await addCalendarToUserAgentsIfNeedByUser(user.id, { transacting });
  }
  return user;
}

async function addBulk(data, ctx, { transacting: _transacting } = {}) {
  const { center, profile, users } = data;
  return global.utils.withTransaction(
    async (transacting) => {
      validateAddUsersBulkForm(data);
      const [role, locale, _profile, _center] = await Promise.all([
        getRoleForRelationshipProfileCenter(profile, center, { transacting }),
        getDefaultLocale({ transacting }),
        table.profiles.findOne({ id: profile }, { transacting }),
        table.centers.findOne({ id: center }, { transacting }),
      ]);

      return Promise.all(
        _.map(users, (user) =>
          addUserBulk(
            role.id,
            {
              ...user,
              locale: user.locale || _center.locale || locale,
              status: 'created',
              active: false,
            },
            ctx,
            { profile: _profile, transacting }
          )
        )
      );
    },
    table.users,
    _transacting
  );
}

module.exports = { addBulk };
