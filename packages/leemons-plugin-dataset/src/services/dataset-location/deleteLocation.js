const { validatePluginName, validateNotExistLocation } = require('../../validations/exists');
const { translations, getTranslationKey } = require('../translations');
const { validateLocationAndPlugin } = require('../../validations/dataset-location');
const { table } = require('../tables');

/** *
 *  ES:
 *  Borra una localización y todas sus traducciones
 *
 *  EN:
 *  Deletes a localization and all its translations
 *
 *  @public
 *  @static
 *  @param {string} locationName - Location name
 *  @param {string} pluginName - Plugin name
 *  @param {any=} transacting - DB Transaction
 *  @return {Promise<boolean>} The new dataset location
 *  */
async function deleteLocation(locationName, pluginName, { transacting: _transacting } = {}) {
  validateLocationAndPlugin(locationName, pluginName);
  validatePluginName(pluginName, this.calledFrom);
  await validateNotExistLocation(locationName, pluginName, { transacting: _transacting });

  return global.utils.withTransaction(
    async (transacting) => {
      const promises = [table.dataset.delete({ locationName, pluginName }, { transacting })];
      if (translations()) {
        promises.push(
          translations().contents.deleteAll(
            { key: getTranslationKey(locationName, pluginName, 'name') },
            { transacting }
          )
        );
        promises.push(
          translations().contents.deleteAll(
            { key: getTranslationKey(locationName, pluginName, 'description') },
            { transacting }
          )
        );
        promises.push(
          translations().contents.deleteAll(
            { key: getTranslationKey(locationName, pluginName, 'jsonSchema') },
            { transacting }
          )
        );
        promises.push(
          translations().contents.deleteAll(
            { key: getTranslationKey(locationName, pluginName, 'jsonUI') },
            { transacting }
          )
        );
      }
      // TODO Añadir que se borre un el apartado del menu del plugin si es el ultimo dataset existente para ese plugin
      await Promise.all(promises);
      return true;
    },
    table.dataset,
    _transacting
  );
}

module.exports = deleteLocation;
