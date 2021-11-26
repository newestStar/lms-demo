const add = require('./add');

async function addWelcome() {
  return add(
    {
      key: 'welcome',
      parentKey: 'users',
      url: '/private/users/welcome',
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

module.exports = addWelcome;
