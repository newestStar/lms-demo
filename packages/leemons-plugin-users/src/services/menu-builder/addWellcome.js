const add = require('./add');

async function addWellcome() {
  return add(
    {
      key: 'welcome',
      parentKey: 'users',
      url: '/users/private/welcome',
      label: {
        en: 'Welcome',
        es: 'Bienvenida',
      },
    },
    [
      {
        permissionName: 'plugins.users.users',
        actionNames: ['view'],
      },
      {
        permissionName: 'plugins.users.profiles',
        actionNames: ['view'],
      },
    ]
  );
}

module.exports = addWellcome;
