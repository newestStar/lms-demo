/* eslint-disable no-await-in-loop */
const { keys } = require('lodash');
const importLibrary = require('./bulk/library');
const config = require('../config/awsS3Config');

async function addAWSS3AsProvider() {
  await leemons
    .getPlugin('leebrary')
    .services.settings.setProviderConfig('leebrary-aws-s3', config);
}

async function initLibrary({ users, profiles }) {
  const { services } = leemons.getPlugin('leebrary');

  try {
    const assets = await importLibrary({ users });
    const assetsKeys = keys(assets);

    for (let i = 0, len = assetsKeys.length; i < len; i++) {
      const key = assetsKeys[i];
      const { creator, ...asset } = assets[key];
      const assetData = await services.assets.add(asset, { userSession: creator });
      assets[key] = { ...assetData };
    }

    // console.log('------ ASSETS ------');
    // console.dir(assets, { depth: null });

    return assets;
  } catch (err) {
    console.error(err);
  }

  return null;
}

module.exports = { initLibrary, addAWSS3AsProvider };
