const _ = require('lodash');
const existValues = require('./existValues');
const { table } = require('../tables');

/** *
 *  ES:
 *  Devuelve si existen los datos solicitas o si se le especifica alguna key solo el valor de dichas keys
 *
 *  EN:
 *  Returns if the requested data exists or if any key is specified only the value of these keys.
 *
 *  @public
 *  @static
 *  @param {string} locationName Location name (For backend)
 *  @param {string} pluginName Plugin name (For backend)
 *  @param {string[]=} keys Keys to get
 *  @param {any=} transacting - DB Transaction
 *  @param {string=} target Any string to differentiate what you want, for example a user id.
 *  @return {Promise<any>} Passed formData
 *  */
async function getValues(locationName, pluginName, { target, keys, transacting } = {}) {
  if (!(await existValues(locationName, pluginName, { target, transacting }))) return null;

  let _keys = keys;

  const query = { locationName, pluginName };
  if (target) query.target = target;
  if (keys && !_.isArray(keys)) _keys = [keys];
  if (_keys) query.key_$in = _keys;

  const response = await table.datasetValues.find(query, { transacting });

  return response.reduce((acc, value) => {
    acc[value.key] = JSON.parse(value.value);
    return acc;
  }, {});
}

module.exports = getValues;
