const _ = require('lodash');
const { updateUserAuthPermissions } = require('./updateUserAuthPermissions');
const { isSuperAdmin } = require('./isSuperAdmin');
const { table } = require('../tables');
const constants = require('../../../config/constants');

/**
 * Checks if the user has 1 or more of the specified permissions.
 * @public
 * @static
 * @param {UserSession} userSession - User session to check
 * @param {Object} allowedPermissions - Allowed permission by key
 * @property {string[]} allowedPermissions.actions - Array of allowed actions
 * @property {string} allowedPermissions.target - Target
 * @param {any} ctx - Koa context
 * @return {Promise<boolean>} If have permission return true if not false
 * */
async function hasPermissionCTX(userSession, allowedPermissions, ctx) {
  if (_.isArray(userSession.userAuths) && userSession.userAuths.length) {
    const perPromises = [];
    _.forEach(userSession.userAuths, (userAuth) => {
      if (userAuth.reloadPermissions) perPromises.push(updateUserAuthPermissions(userAuth.id));
    });
    await Promise.all(perPromises);
  }

  const promises = [];
  let query;
  _.forIn(allowedPermissions, (value, permissionName) => {
    // We check the default permission of all users
    if (constants.basicPermission.permissionName === permissionName) {
      promises.push(value.actions.indexOf(constants.basicPermission.actionName) >= 0 ? 1 : 0);
    } else {
      query = {
        userAuth_$in: _.map(userSession.userAuths, 'id'),
        permissionName,
        actionName_$in: value.actions,
      };
      if (value.target) {
        query.target = value.target;
        if (ctx) query.target = _.get(ctx, value.target, value.target);
      }
      promises.push(table.userAuthPermission.count(query));
    }
  });

  const values = await Promise.all(promises);

  let _hasPermission = false;
  let i = 0;
  const maxIterations = values.length;

  while (i < maxIterations && !_hasPermission) {
    if (values[i]) {
      _hasPermission = true;
    }
    i++;
  }

  if (_hasPermission) return true;
  _hasPermission = await isSuperAdmin(userSession.id);
  if (_hasPermission) return true;
  return false;
}

module.exports = hasPermissionCTX;
