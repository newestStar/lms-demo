module.exports = [
  {
    path: '/config',
    method: 'GET',
    handler: 'config.get',
    authenticated: true,
  },
  {
    path: '/config',
    method: 'POST',
    handler: 'config.save',
    authenticated: true,
  },
  {
    path: '/room/list',
    method: 'GET',
    handler: 'room.getRoomList',
    authenticated: true,
  },
  {
    path: '/room/:key/messages',
    method: 'GET',
    handler: 'room.getMessages',
    authenticated: true,
  },
  {
    path: '/room/:key/messages',
    method: 'POST',
    handler: 'room.sendMessage',
    authenticated: true,
  },
  {
    path: '/room/:key/messages/read',
    method: 'POST',
    handler: 'room.markMessagesAsRead',
    authenticated: true,
  },
  {
    path: '/room/:key',
    method: 'GET',
    handler: 'room.getRoom',
    authenticated: true,
  },
  {
    path: '/room/messages/unread',
    method: 'POST',
    handler: 'room.getUnreadMessages',
    authenticated: true,
  },
  {
    path: '/room/messages/count',
    method: 'POST',
    handler: 'room.getRoomsMessageCount',
    authenticated: true,
  },
];
