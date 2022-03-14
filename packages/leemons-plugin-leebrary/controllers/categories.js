const { add } = require('../src/services/categories/add');
const { exists } = require('../src/services/categories/exists');
const { list } = require('../src/services/categories/list');
const { listWithMenuItem } = require('../src/services/categories/listWithMenuItem');
const { remove } = require('../src/services/categories/remove');

async function addCategory(ctx) {
  const category = await add(ctx.request.body, { transacting: ctx.state.transacting });
  ctx.status = 200;
  ctx.body = { status: 200, category };
}
async function existsCategory(ctx) {
  const { key } = ctx.request.params;
  const result = await exists({ key }, { transacting: ctx.state.transacting });
  ctx.status = 200;
  ctx.body = { status: 200, exists: result };
}

async function listCategories(ctx) {
  const { page, size } = ctx.request.query;
  const result = await list(page, size);
  ctx.status = 200;
  ctx.body = { status: 200, ...result };
}

async function listCategoriesWithMenuItem(ctx) {
  const { page, size } = ctx.request.query;
  const categories = await listWithMenuItem(page, size, { ...ctx.state });
  ctx.status = 200;
  ctx.body = { status: 200, categories };
}

async function removeCategory(ctx) {
  const { key } = ctx.request.params;
  const deleted = await remove({ key }, { transacting: ctx.state.transacting });
  ctx.status = 200;
  ctx.body = { status: 200, deleted };
}

module.exports = {
  add: addCategory,
  exists: existsCategory,
  list: listCategories,
  remove: removeCategory,
  listWithMenuItem: listCategoriesWithMenuItem,
};
