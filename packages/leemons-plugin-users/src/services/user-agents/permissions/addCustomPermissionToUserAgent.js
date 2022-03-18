const _ = require('lodash');
const { existUserAgent } = require('../existUserAgent');
const { validatePermissionName } = require('../../../validations/exists');
const { validateUserAddCustomPermission } = require('../../../validations/permissions');
const { table } = require('../../tables');
const { userAgentHasCustomPermission } = require('./userAgentHasCustomPermission');

async function _addCustomPermissionToUserAgent(userAgentId, data, { transacting } = {}) {
  await existUserAgent({ id: userAgentId }, false, { transacting });

  const hasPermissions = _.uniq(
    await Promise.all(
      _.map(data, (d) => userAgentHasCustomPermission(userAgentId, d, { transacting }))
    )
  );
  if (hasPermissions.length > 1 || hasPermissions[0]) {
    console.dir(data, { depth: null });

    throw new Error(`You have already been assigned this custom permit`);
  }

  const dataToCreate = [];
  _.forEach(data, ({ actionNames, ...d }) => {
    _.forEach(actionNames, (actionName) => {
      dataToCreate.push({
        ...d,
        actionName,
        userAgent: userAgentId,
      });
    });
  });

  return table.userAgentPermission.createMany(dataToCreate, { transacting });
}

/**
 * Add a user to platform
 * @public
 * @static
 * @param {string || string[]} userAgentId - User auth id
 * @param {UserAddCustomPermission || UserAddCustomPermission[]} data - New permission data
 * @param {any=} transacting - DB Transaction
 * @return {Promise<boolean>}
 *
 * @example
 *
 *
 * leemons
 * .getPlugin('users')
 * .services.permissions.addCustomPermissionToUserAgent(
 * 'userAgentId',
 * {
 *    permissionName: 'plugins.classroom.level',
 *    actionNames: ['admin'],
 *    target: level,
 * });
 *
 * */
async function addCustomPermissionToUserAgent(userAgentId, data, { transacting } = {}) {
  const _data = _.isArray(data) ? data : [data];
  _.forEach(_data, (d) => {
    validatePermissionName(d.permissionName, this.calledFrom);
    validateUserAddCustomPermission(d);
  });

  if (_.isArray(userAgentId)) {
    return global.utils.settledResponseToManyResponse(
      await Promise.allSettled(
        _.map(userAgentId, (id) => _addCustomPermissionToUserAgent(id, _data, { transacting }))
      )
    );
  }
  return _addCustomPermissionToUserAgent(userAgentId, _data, { transacting });
}

module.exports = { addCustomPermissionToUserAgent };
