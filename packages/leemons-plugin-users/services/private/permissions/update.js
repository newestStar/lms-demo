const _ = require('lodash');
const { getTranslationKey } = require('../../../next/src/permissions/getTranslationKey');
const { translations } = require('../translations');
const { table } = require('../tables');

/**
 * Update the permit only if the permissionName is already exist
 * @public
 * @static
 * @param {PermissionAdd} data - Array of permissions
 * @return {Promise<Permission>} Updated permission
 * */
async function update(data) {
  const permission = await table.permissions.count({
    permissionName: data.permissionName,
    pluginName: this.calledFrom,
  });
  if (!permission)
    throw new Error(
      `Permission '${data.permissionName}' for plugin '${this.calledFrom}' not exists`
    );

  leemons.log.info(`Updating permission '${data.permissionName}' for plugin '${this.calledFrom}'`);
  return table.permissions.transaction(async (transacting) => {
    await table.permissionAction.deleteMany(
      { permissionName: data.permissionName },
      { transacting }
    );
    await table.permissionAction.createMany(
      _.map(data.actions, (actionName) => ({
        actionName,
        permissionName: data.permissionName,
      })),
      { transacting }
    );

    if (translations()) {
      translations().common.setKey(
        getTranslationKey(data.permissionName, 'name'),
        data.localizationName,
        { transacting }
      );
    }

    return table.permissions.findOne({
      permissionName: data.permissionName,
      pluginName: this.calledFrom,
    });
  });
}

module.exports = { update };
