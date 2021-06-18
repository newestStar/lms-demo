const _ = require('lodash');
const { hasActionMany } = require('./hasActionMany');

/**
 * Check if the many permission has many actions
 * @public
 * @static
 * @param {Array.<[string, Array.<string>]>} data
 * @return {Promise<boolean>}
 * */
async function manyPermissionsHasManyActions(data) {
  const response = await Promise.all(_.map(data, (d) => hasActionMany(d[0], d[1])));
  const result = _.uniq(response);
  return result.length > 1 ? false : result[0];
}

module.exports = { manyPermissionsHasManyActions };
