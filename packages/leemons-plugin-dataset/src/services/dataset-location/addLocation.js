const { translations, getTranslationKey } = require('../translations');
const existLocation = require('./existLocation');
const { table } = require('../tables');

/** *
 *  ES:
 *  Añade una localización para usar un dataset, usualmente se añade una localización en cada sitio
 *  de tu plugin donde quieres permitir que el administrador pueda añadir campos adicionales, ya sean
 *  predefinidos por tu plugin o creados por el administrador
 *
 *  EN:
 *  Add a location to use a dataset, usually you add a location in each place of your plugin where
 *  you want to allow the administrator to add additional fields, either predefined by your plugin
 *  or created by the administrator.
 *
 *  @public
 *  @static
 *  @param {DatasetAddLocation} data - New dataset location
 *  @param {any=} transacting - DB Transaction
 *  @return {Promise<Action>} The new dataset location
 *  */
async function addLocation(
  { name, description, locationName, pluginName },
  { transacting: _transacting } = {}
) {
  if (pluginName !== this.calledFrom) throw new Error(`The plugin name must be ${this.calledFrom}`);
  if (await existLocation(locationName, pluginName, { transacting: _transacting }))
    throw new Error(`The '${locationName}' location already exist`);
  return global.utils.withTransaction(
    async (transacting) => {
      const promises = [table.dataset.create({ locationName, pluginName }, { transacting })];
      if (translations()) {
        promises.push(
          translations().contents.addManyByKey(
            getTranslationKey(locationName, pluginName, 'name'),
            name,
            { transacting }
          )
        );
        promises.push(
          translations().contents.addManyByKey(
            getTranslationKey(locationName, pluginName, 'description'),
            description,
            { transacting }
          )
        );
      }
      const response = await Promise.all(promises);
      if (response[1] && !response[1].warnings) response[0].name = name;
      if (response[2] && !response[2].warnings) response[0].description = description;
      return response[0];
    },
    table.dataset,
    _transacting
  );
}

module.exports = addLocation;
