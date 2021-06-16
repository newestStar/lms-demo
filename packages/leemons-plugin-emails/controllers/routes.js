module.exports = [
  {
    path: '/init',
    method: 'POST',
    handler: 'email.init',
  },
  {
    path: '/providers',
    method: 'GET',
    handler: 'email.providers',
  },
  {
    path: '/send-test',
    method: 'POST',
    handler: 'email.sendTest',
  },
  {
    path: '/add-provider',
    method: 'POST',
    handler: 'email.addProvider',
  },
];
