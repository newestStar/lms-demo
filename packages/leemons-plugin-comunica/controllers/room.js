const roomService = require('../src/services/room');

async function getMessages(ctx) {
  const messages = await roomService.getMessages(
    ctx.request.params.key,
    ctx.state.userSession.userAgents[0].id
  );
  ctx.status = 200;
  ctx.body = { status: 200, messages };
}

async function getRoom(ctx) {
  const room = await roomService.get(
    ctx.request.params.key,
    ctx.state.userSession.userAgents[0].id
  );
  ctx.status = 200;
  ctx.body = { status: 200, room };
}

async function sendMessage(ctx) {
  await roomService.sendMessage(
    ctx.request.params.key,
    ctx.state.userSession.userAgents[0].id,
    ctx.request.body.message
  );
  ctx.status = 200;
  ctx.body = { status: 200 };
}

async function markMessagesAsRead(ctx) {
  await roomService.markAsRead(ctx.request.params.key, ctx.state.userSession.userAgents[0].id);
  ctx.status = 200;
  ctx.body = { status: 200 };
}

async function getUnreadMessages(ctx) {
  const count = await roomService.getUnreadMessages(
    ctx.request.body.keys,
    ctx.state.userSession.userAgents[0].id
  );
  ctx.status = 200;
  ctx.body = { status: 200, count };
}

async function getRoomsMessageCount(ctx) {
  const count = await roomService.getRoomsMessageCount(
    ctx.request.body.keys,
    ctx.state.userSession.userAgents[0].id
  );
  ctx.status = 200;
  ctx.body = { status: 200, count };
}

async function getRoomList(ctx) {
  const rooms = await roomService.getUserAgentRoomsList(ctx.state.userSession.userAgents[0].id, {
    userSession: ctx.state.userSession,
  });
  ctx.status = 200;
  ctx.body = { status: 200, rooms };
}

module.exports = {
  getRoomsMessageCount,
  markMessagesAsRead,
  getUnreadMessages,
  getRoomList,
  sendMessage,
  getMessages,
  getRoom,
};
