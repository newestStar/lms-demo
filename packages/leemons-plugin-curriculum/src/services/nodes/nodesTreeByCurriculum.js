const _ = require('lodash');
const { table } = require('../tables');

async function nodesTreeByCurriculum(id, { transacting } = {}) {
  const ids = _.isArray(id) ? id : [id];
  const nodes = await table.nodes.find({ curriculum_$in: ids }, { transacting });
  const nodesByParent = _.groupBy(nodes, 'parentNode');
  _.forEach(nodes, (node) => {
    // eslint-disable-next-line no-param-reassign
    node.childrens = nodesByParent[node.id] || [];
  });

  return _.groupBy(nodesByParent.null, 'curriculum');
}

module.exports = { nodesTreeByCurriculum };
