const { isEmpty } = require('lodash');
const { tables } = require('../tables');
const { getByIds: getAssets } = require('./getByIds');

async function getByCategory(categoryId, { details = false, assets: assetIds, transacting } = {}) {
  try {
    const query = {
      category: categoryId,
    };

    if (!isEmpty(assetIds)) {
      query.asset_$in = assetIds;
    }
    let assets = await tables.assetCategories.find(query, { transacting });
    assets = assets.map(({ asset }) => asset);

    if (details) {
      return getAssets(assets, { transacting });
    }
    return assets;
  } catch (e) {
    throw new Error(`Failed to get category assets: ${e.message}`);
  }
}

module.exports = { getByCategory };
