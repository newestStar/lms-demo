const { getByAsset } = require('./getByAsset');

async function has(assetId, permission, { userSession, transacting } = {}) {
  try {
    const current = Object.entries(await getByAsset(assetId, { userSession, transacting }))
      .filter(([, value]) => value)
      .map(([key]) => key);

    return permission.every((p) => current.includes(p));
  } catch (e) {
    throw new global.utils.HttpError(500, `Failed to get permissions: ${e.message}`);
  }
}

module.exports = { has };
