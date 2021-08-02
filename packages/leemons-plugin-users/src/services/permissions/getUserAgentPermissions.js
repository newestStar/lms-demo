const _ = require('lodash');
const { table } = require('../tables');
const constants = require('../../../config/constants');
const { updateUserAgentPermissions } = require('../users/updateUserAgentPermissions');

/**
 * Return all user auth permissions
 * @public
 * @static
 * @param {UserAgent} userAgent - User auth
 * @param {object} _query
 * @param {any=} transacting - DB Transaction
 * @return {Promise<ListOfUserPermissions>} User permissions
 * */
async function getUserAgentPermissions(userAgent, { query: _query, transacting } = {}) {
  const _userAgents = _.isArray(userAgent) ? userAgent : [userAgent];

  const reloadPermissionPromises = [];
  _.forEach(_userAgents, (_userAgent) => {
    if (_userAgent.reloadPermissions)
      reloadPermissionPromises.push(updateUserAgentPermissions(_userAgent.id, { transacting }));
  });

  await Promise.all(reloadPermissionPromises);

  const query = { ..._query, userAgent_$in: _.map(_userAgents, 'id') };

  const results = await table.userAgentPermission.find(query, { transacting });

  const group = _.groupBy(
    results,
    ({ actionName, id, userAgent, created_at, updated_at, ...rest }) => JSON.stringify(rest)
  );

  const responses = [];
  _.forIn(group, (values) => {
    responses.push({
      ...values[0],
      actionNames: _.map(values, 'actionName'),
    });
  });

  // Add default permission for all users
  if (!_query) {
    responses.push({
      permissionName: constants.basicPermission.permissionName,
      actionNames: [constants.basicPermission.actionName],
      role: null,
      target: null,
      center: null,
    });
  }

  return responses;
}

module.exports = { getUserAgentPermissions };
