const _ = require('lodash');
const { table } = require('../tables');
const { uploadFile } = require('./uploadFile');

async function uploadFiles(files, { transacting: _transacting } = {}) {
  return global.utils.withTransaction(
    async (transacting) => {
      if (_.isArray(files)) {
        return Promise.all(_.map(files, (file) => uploadFile(file, { transacting })));
      }
      return uploadFile(files, { transacting });
    },
    table.files,
    _transacting
  );
}

module.exports = { uploadFiles };
