const _ = require('lodash');
const { validateLocaleCode, validateLocaleCodeArray } = require('../../validations/locale');

const localesTable = leemons.query('plugins_multilanguage::locales');

/**
 * Checks if the given locale exists
 * @param {LocaleCode} code The locale iso code xx-YY or xx
 * @returns {Promise<boolean>} if the locale exists
 */
async function has(code) {
  // Validates the code and returns it in lowercase
  const _code = validateLocaleCode(code);

  try {
    // Get if there is at least 1 locale with the given code
    return (await localesTable.count({ code: _code })) > 0;
  } catch (e) {
    leemons.log.debug(e.message);
    throw new Error('An error occurred while creating the locale');
  }
}

/**
 * Checks if the given locales exists
 * @param {LocaleCode[]} codes The locale iso code xx-YY or xx
 * @returns {Promise<Object<string, boolean>>} An array with the locales that exists
 */
async function hasMany(codes) {
  // Validates the code and returns them lowercased
  const _codes = validateLocaleCodeArray(codes);

  try {
    // Find the locales that exists in the database
    let existingLocales = await localesTable.find({ code_$in: _codes }, { columns: ['code'] });
    existingLocales = existingLocales.map((locale) => locale.code);

    // Generate an object of {locale: boolean}
    return _.fromPairs(_codes.map((code) => [code, existingLocales.includes(code)]));
  } catch (e) {
    leemons.log.debug(e.message);
    throw new Error('An error occurred while deleting the locales');
  }
}

module.exports = {
  has,
  hasMany,
};
