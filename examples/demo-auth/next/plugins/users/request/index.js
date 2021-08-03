import login from './login';
import reset from './reset';
import recover from './recover';
import canReset from './canReset';
import listUsers from './listUsers';
import listActions from './listActions';
import addRole from './addRole';
import getRole from './getRole';
import listRoles from './listRoles';
import updateRole from './updateRole';
import listPermissions from './listPermissions';
import getUserProfiles from './getUserProfiles';
import getUserProfileToken from './getUserProfileToken';
import getRememberProfile from './getRememberProfile';
import setRememberProfile from './setRememberProfile';
import getCenters from './getCenters';
import listProfiles from './listProfiles';
import getDefaultPlatformLocale from './getDefaultPlatformLocale';
import getPlatformLocales from './getPlatformLocales';

export const loginRequest = login;
export const resetRequest = reset;
export const recoverRequest = recover;
export const canResetRequest = canReset;
export const listUsersRequest = listUsers;
export const listActionsRequest = listActions;
export const addRoleRequest = addRole;
export const getRoleRequest = getRole;
export const listRolesRequest = listRoles;
export const updateRoleRequest = updateRole;
export const getRememberProfileRequest = getRememberProfile;
export const setRememberProfileRequest = setRememberProfile;
export const listPermissionsRequest = listPermissions;
export const getUserProfilesRequest = getUserProfiles;
export const getUserProfileTokenRequest = getUserProfileToken;
export const getCentersRequest = getCenters;
export const listProfilesRequest = listProfiles;
export const getDefaultPlatformLocaleRequest = getDefaultPlatformLocale;
export const getPlatformLocalesRequest = getPlatformLocales;
