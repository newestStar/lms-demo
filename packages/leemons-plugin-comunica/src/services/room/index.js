const { add } = require('./add');
const { get } = require('./get');
const { exist } = require('./exist');
const { getMessages } = require('./getMessages');
const { sendMessage } = require('./sendMessage');
const { addUserAgents } = require('./addUserAgents');
const { existUserAgent } = require('./existUserAgent');
const { removeUserAgents } = require('./removeUserAgents');

module.exports = {
  add,
  get,
  exist,
  getMessages,
  sendMessage,
  addUserAgents,
  existUserAgent,
  removeUserAgents,
};
