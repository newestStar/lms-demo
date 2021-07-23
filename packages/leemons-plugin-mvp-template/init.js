const initRoles = require('./src/roles');
const initUsers = require('./src/users');
const initCenters = require('./src/centers');
const initProfiles = require('./src/profiles');

async function init() {
  try {
    const centers = await initCenters();
    console.log('centers', centers);
    const roles = await initRoles(centers);
    console.log('roles', roles);
    const users = await initUsers(roles);
    console.log('users', users);
    const profiles = await initProfiles(roles);
    console.log('profiles', profiles);
  } catch (e) {
    console.error(e);
  }
}

module.exports = init;
