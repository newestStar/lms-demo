const get = require('../src/services/permissions/get');
const has = require('../src/services/permissions/has');
const remove = require('../src/services/permissions/remove');
const set = require('../src/services/permissions/set');

module.exports = {
  set: async (ctx) => {
    const { asset } = ctx.params;
    const { role } = ctx.request.body;
    const { userSession } = ctx.state;

    try {
      const permission = await set(asset, role, { userSession });

      ctx.status = 200;
      ctx.body = {
        status: 200,
        role: permission,
      };
    } catch (e) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        message: e.message,
      };
    }
  },
  remove: async (ctx) => {
    const { asset } = ctx.params;
    const { userSession } = ctx.state;

    try {
      const deleted = await remove(asset, { userSession });

      ctx.status = 200;
      ctx.body = {
        status: 200,
        deleted,
      };
    } catch (e) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        message: e.message,
      };
    }
  },
  get: async (ctx) => {
    const { asset } = ctx.params;
    const { userSession } = ctx.state;

    try {
      const permissions = await get(asset, { userSession });

      ctx.status = 200;
      ctx.body = {
        status: 200,
        permissions,
      };
    } catch (e) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        message: e.message,
      };
    }
  },
  has: async (ctx) => {
    const { asset } = ctx.params;
    const { permissions } = ctx.request.query;
    const { userSession } = ctx.state;

    try {
      const hasPermissions = await has(asset, JSON.parse(permissions), { userSession });

      ctx.status = 200;
      ctx.body = {
        status: 200,
        has: hasPermissions,
      };
    } catch (e) {
      ctx.status = 400;
      ctx.body = {
        status: 400,
        message: e.message,
      };
    }
  },
};
