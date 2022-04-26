const permission = require('../../permission');
const getPermissionName = require('../getPermissionName');
const getRoleMatchingActions = require('../getRoleMatchingActions');
const getTeacherPermission = require('./getTeacherPermission');

module.exports = async function getUserPermission(assignable, { userSession, transacting } = {}) {
  const permissions = await permission.getUserAgentPermissions(userSession.userAgents, {
    query: { permissionName_$contains: getPermissionName(assignable) },
    transacting,
  });

  if (!permissions.length) {
    permissions.push(...(await getTeacherPermission(assignable, { userSession, transacting })));
  }

  return {
    role: getRoleMatchingActions(permissions[0].actionNames),
    actions: permissions[0].actionNames,
  };
};
