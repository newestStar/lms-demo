const { encryptPassword } = require('./encryptPassword');
const { table } = require('../tables');

/**
 * Create the first super-administrator user only if no user exists in the database.
 * @public
 * @static
 * @param {string} name - User name
 * @param {string} surnames - User surnames
 * @param {string} email - User email
 * @param {string} password - User password in raw
 * @param {string} language - User language
 * @return {Promise<User>} Created / Updated role
 * */
async function addFirstSuperAdminUser(name, surnames, email, password, language) {
  const hasUsers = await table.users.count();
  if (!hasUsers) {
    return table.users.transaction(async (transacting) => {
      const user = await table.users.create(
        {
          name,
          surnames,
          email,
          password: await encryptPassword(password),
          language,
          active: true,
        },
        { transacting }
      );
      await table.superAdminUser.create({ user: user.id }, { transacting });
      delete user.password;
      return user;
    });
  }
  throw new Error(
    'The first super administrator user can only be created if there are no users in the database.'
  );
}

module.exports = { addFirstSuperAdminUser };
