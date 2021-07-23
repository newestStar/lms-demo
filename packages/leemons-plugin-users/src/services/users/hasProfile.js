const { table } = require('../tables');

/**
 * Checks if the user has the profile
 * @public
 * @static
 * @param {string} user - User id
 * @param {string} profile - Profile id
 * @param {any=} transacting - DB Transaction
 * @return {Promise<boolean>} If have permission return true if not false
 * */
async function hasProfile(user, profile, { transacting } = {}) {
  // TODO VER (CAMBIO)
  const results = await table.userAuth.count({ user, profile }, { transacting });
  return !!results;
}

module.exports = hasProfile;
