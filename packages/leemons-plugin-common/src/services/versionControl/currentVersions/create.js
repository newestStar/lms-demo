const { currentVersions } = require('../../tables');
const { stringifyType } = require('../helpers/type');
const { createVersion } = require('../versions');

module.exports = async function create(type, { published = false, transacting: t } = {}) {
  const stringifiedType = stringifyType(this.calledFrom, type);

  return global.utils.withTransaction(
    async (transacting) => {
      const obj = {
        published: published ? '1.0.0' : null,
        type: stringifiedType,
      };

      const versionedEntity = await currentVersions.create(obj, { transacting });

      await createVersion.bind(this)(versionedEntity.id, {
        version: '1.0.0',
        published,
        transacting,
      });

      return { uuid: versionedEntity.id, currentPublished: versionedEntity.published };
    },
    currentVersions,
    t
  );
};
