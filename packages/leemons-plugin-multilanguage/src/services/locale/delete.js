const { validateLocaleCode, validateLocaleCodeArray } = require('../../validations/locale');

const localesTable = leemons.query('plugins_multilanguage::locales');

/**
 * Deletes the locale that matches the code
 * @param {string} code The locale iso code xx-YY or xx
 * @returns {Promise<Boolean>} if the locale was deleted or not
 */
async function deleteOne(code) {
  // Validates the code and returns it in lowercase
  const _code = validateLocaleCode(code);

  try {
    // Delete the locale with the give code, return a boolean
    return (await localesTable.deleteMany({ code: _code, $limit: 1 })).count === 1;
  } catch (e) {
    leemons.log.debug(e.message);
    throw new Error('An error occurred while deleting the locale');
  }
}

/**
 * Deletes the locales that matches the codes array
 * @param {string[]} codes An array of the locales iso codes xx-YY or xx
 * @returns {Promise<Number>} The number of locales deleted
 */
async function deleteMany(codes) {
  // Validates the codes and returns them in lowercase
  const _codes = validateLocaleCodeArray(codes);

  try {
    // Delete the given codes an return the deleted count
    return (await localesTable.deleteMany({ code_$in: _codes })).count;
  } catch (e) {
    leemons.log.debug(e.message);
    throw new Error('An error occurred while deleting the locales');
  }
}

module.exports = {
  delete: deleteOne,
  deleteMany,
};
