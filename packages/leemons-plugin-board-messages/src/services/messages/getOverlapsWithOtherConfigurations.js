const _ = require('lodash');
const { table } = require('../tables');

async function getOverlapsWithOtherConfigurations(item, { transacting } = {}) {
  const query = {
    zone: item.zone,
    status_$in: ['published', 'programmed'],
    $not: { $or: [{ endDate_$lt: item.startDate }, { startDate_$gt: item.endDate }] },
  };
  if (item.id) {
    query.id_$ne = item.id;
  }
  let ids = null;
  if (item.centers && item.centers.length) {
    const q = { center_$in: [...item.centers, '*'] };
    if (ids !== null) {
      q.messageConfig_$in = ids;
    }
    const items = await table.messageConfigCenters.find(q, {
      columns: ['messageConfig'],
      transacting,
    });
    ids = _.map(items, 'messageConfig');
  }
  if (item.programs && item.programs.length) {
    const q = { program_$in: [...item.programs, '*'] };
    if (ids !== null) {
      q.messageConfig_$in = ids;
    }
    const items = await table.messageConfigPrograms.find(q, {
      columns: ['messageConfig'],
      transacting,
    });
    ids = _.map(items, 'messageConfig');
  }
  if (item.profiles && item.profiles.length) {
    const q = { profile_$in: [...item.profiles, '*'] };
    if (ids !== null) {
      q.messageConfig_$in = ids;
    }
    const items = await table.messageConfigProfiles.find(q, {
      columns: ['messageConfig'],
      transacting,
    });
    ids = _.map(items, 'messageConfig');
  }
  if (item.classes && item.classes.length) {
    const q = { class_$in: [...item.classes, '*'] };
    if (ids !== null) {
      q.messageConfig_$in = ids;
    }
    const items = await table.messageConfigClasses.find(q, {
      columns: ['messageConfig'],
      transacting,
    });
    ids = _.map(items, 'messageConfig');
  }
  if (ids !== null) {
    query.id_$in = _.uniq(ids);
  }
  const items = await table.messageConfig.find(query, { transacting });
  return items;
}

module.exports = { getOverlapsWithOtherConfigurations };
