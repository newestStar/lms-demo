module.exports = [
  ...leemons.getPlugin('common').services.tags.getRoutes('tags', {
    authenticated: true,
    allowedPermissions: {
      'plugins.users.users': {
        actions: ['update', 'create', 'delete', 'admin'],
      },
    },
  }),
  {
    path: '/test-socket-io',
    method: 'GET',
    handler: 'init.testSocketIo',
    authenticated: true,
  },
  /**
   * Init config
   * */
  {
    path: '/init/status',
    method: 'GET',
    handler: 'init.status',
  },
  {
    path: '/init/today-quote',
    method: 'GET',
    handler: 'init.todayQuote',
  },
  /**
   * Config
   * */
  {
    path: '/config/system-data-fields',
    method: 'GET',
    handler: 'config.getSystemDataFieldsConfig',
    authenticated: true,
    allowedPermissions: {
      'plugins.users.users': {
        actions: ['view', 'update', 'create', 'delete', 'admin'],
      },
    },
  },
  {
    path: '/config/system-data-fields',
    method: 'POST',
    handler: 'config.saveSystemDataFieldsConfig',
    authenticated: true,
    allowedPermissions: {
      'plugins.users.users': {
        actions: ['update', 'create', 'delete', 'admin'],
      },
    },
  },
  /**
   * Users
   * */
  {
    path: '/user/login',
    method: 'POST',
    handler: 'users.login',
  },
  {
    path: '/user/recover',
    method: 'POST',
    handler: 'users.recover',
  },
  {
    path: '/user/reset',
    method: 'POST',
    handler: 'users.reset',
  },
  {
    path: '/user/can/reset',
    method: 'POST',
    handler: 'users.canReset',
  },
  {
    path: '/user/can/register-password',
    method: 'POST',
    handler: 'users.canRegisterPassword',
  },
  {
    path: '/user/register-password',
    method: 'POST',
    handler: 'users.registerPassword',
  },
  {
    path: '/user',
    method: 'GET',
    handler: 'users.detail',
    authenticated: true,
  },
  {
    path: '/user/profile',
    method: 'GET',
    handler: 'users.profiles',
    authenticated: true,
  },
  {
    path: '/user/centers',
    method: 'GET',
    handler: 'users.centers',
    authenticated: true,
  },
  {
    path: '/user/remember/login',
    method: 'GET',
    handler: 'users.getRememberLogin',
    authenticated: true,
  },
  {
    path: '/get-data-for-user-agent-datasets',
    method: 'GET',
    handler: 'users.getDataForUserAgentDatasets',
    authenticated: true,
    disableUserAgentDatasetCheck: true,
  },
  {
    path: '/save-data-for-user-agent-datasets',
    method: 'POST',
    handler: 'users.saveDataForUserAgentDatasets',
    authenticated: true,
    disableUserAgentDatasetCheck: true,
  },
  {
    path: '/user/remember/login',
    method: 'POST',
    handler: 'users.setRememberLogin',
    authenticated: true,
  },
  {
    path: '/user/profile/:id/token',
    method: 'GET',
    handler: 'users.profileToken',
    authenticated: true,
  },
  {
    path: '/user/center/:centerId/profile/:profileId/token',
    method: 'GET',
    handler: 'users.centerProfileToken',
    authenticated: true,
  },
  {
    path: '/user/list',
    method: 'POST',
    handler: 'users.list',
    authenticated: true,
    allowedPermissions: {
      'plugins.users.users': {
        actions: ['view', 'update', 'create', 'delete', 'admin'],
      },
    },
  },
  {
    path: '/user-agents/search',
    method: 'POST',
    handler: 'users.searchUserAgents',
    authenticated: true,
    allowedPermissions: {
      'plugins.users.users': {
        actions: ['view', 'update', 'create', 'delete', 'admin'],
      },
    },
  },
  {
    path: '/user-agents/info',
    method: 'POST',
    handler: 'users.getUserAgentsInfo',
    authenticated: true,
    allowedPermissions: {
      'plugins.users.users': {
        actions: ['view', 'update', 'create', 'delete', 'admin'],
      },
    },
  },

  {
    path: '/user/create/bulk',
    method: 'POST',
    handler: 'users.createBulk',
    authenticated: true,
    allowedPermissions: {
      'plugins.users.users': {
        actions: ['create', 'admin'],
      },
    },
  },
  {
    path: '/user/:id/detail/page',
    method: 'GET',
    handler: 'users.detailForPage',
    authenticated: true,
    allowedPermissions: {
      'plugins.users.users': {
        actions: ['view', 'update', 'create', 'delete', 'admin'],
      },
    },
  },
  {
    path: '/user/:id/update',
    method: 'POST',
    handler: 'users.updateUser',
    authenticated: true,
    allowedPermissions: {
      'plugins.users.users': {
        actions: ['update', 'admin'],
      },
    },
  },
  {
    path: '/user-agent/:id/update',
    method: 'POST',
    handler: 'users.updateUserAgent',
    authenticated: true,
    allowedPermissions: {
      'plugins.users.users': {
        actions: ['update', 'admin'],
      },
    },
  },
  {
    path: '/user-agent/:id/detail/page',
    method: 'GET',
    handler: 'users.agentDetailForPage',
    authenticated: true,
    allowedPermissions: {
      'plugins.users.users': {
        actions: ['view', 'update', 'create', 'delete', 'admin'],
      },
    },
  },
  {
    path: '/super-admin',
    method: 'POST',
    handler: 'users.createSuperAdmin',
  },
  {
    path: '/user/contacts',
    method: 'POST',
    handler: 'users.contacts',
    authenticated: true,
  },
  /**
   * Profiles
   * */
  {
    path: '/add-all-permissions-to-all-profiles',
    method: 'POST',
    handler: 'profiles.addAllPermissionsToAllProfiles',
    authenticated: true,
  },
  {
    path: '/profile/list',
    method: 'POST',
    handler: 'profiles.list',
    authenticated: true,
    allowedPermissions: {
      'plugins.users.profiles': {
        actions: ['view', 'update', 'create', 'delete', 'admin'],
      },
    },
  },
  {
    path: '/profile/add',
    method: 'POST',
    handler: 'profiles.add',
    authenticated: true,
    allowedPermissions: {
      'plugins.users.profiles': {
        actions: ['create', 'admin'],
      },
    },
  },
  {
    path: '/profile/detail/:uri',
    method: 'GET',
    handler: 'profiles.detail',
    authenticated: true,
    allowedPermissions: {
      'plugins.users.profiles': {
        actions: ['view', 'update', 'create', 'delete', 'admin'],
      },
    },
  },
  {
    path: '/profile/update',
    method: 'POST',
    handler: 'profiles.update',
    authenticated: true,
    allowedPermissions: {
      'plugins.users.profiles': {
        actions: ['update', 'admin'],
      },
    },
  },
  /**
   * Permissions
   * */
  {
    path: '/permission/list',
    method: 'GET',
    handler: 'permissions.list',
    authenticated: true,
  },
  {
    path: '/permission/get-if-have',
    method: 'POST',
    handler: 'permissions.getPermissionsWithActionsIfIHave',
    authenticated: true,
  },
  /**
   * Actions
   * */
  {
    path: '/action/list',
    method: 'GET',
    handler: 'actions.list',
    authenticated: true,
  },
  /**
   * Roles
   * */
  {
    path: '/role',
    method: 'POST',
    handler: 'roles.create',
  },
  {
    path: '/role/:id',
    method: 'PUT',
    handler: 'roles.create',
  },
  /**
   * Centers
   * */
  {
    path: '/centers',
    method: 'POST',
    handler: 'centers.list',
    authenticated: true,
    allowedPermissions: {
      'plugins.users.centers': {
        actions: ['view', 'update', 'create', 'delete', 'admin'],
      },
    },
  },

  /**
   * Platform
   * */
  {
    path: '/platform/default-locale',
    method: 'GET',
    handler: 'platform.getDefaultLocale',
  },
  {
    path: '/platform/locales',
    method: 'GET',
    handler: 'platform.getLocales',
  },
];
