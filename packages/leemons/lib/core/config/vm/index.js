const { NodeVM } = require('vm2');
const path = require('path');
const _ = require('lodash');
const utils = require('leemons-utils');

const protect = require('./protect');

function filterLeemons(filter) {
  let filtered = {
    leemons: _.fromPairs(
      _.entries(_.pick(leemons, ['log', 'config', 'query' /* , 'plugins', 'plugin' */])).map(
        ([name, property]) => {
          if (_.isFunction(property)) {
            return [name, property.bind(leemons)];
          }
          return [name, property];
        }
      )
    ),
    utils,
  };

  if (filter) {
    filtered = filter(filtered);
  }
  return filtered;
}

module.exports = (allowedPath, filter = null) => {
  // Set the allowed routes for imports
  const root = [
    allowedPath,
    path.resolve(leemons.dir ? leemons.dir.app : process.cwd(), 'node_modules'),
  ];

  // Set-up a NodeVM with the limititations
  const vm = new NodeVM({
    sandbox: filterLeemons(filter),
    require: {
      external: true,
      // Run every imported file inside the VM
      context: 'sandbox',
      root,
      // Allow the following node-builtin modules
      builtin: [
        'path',
        'url',
        'assert',
        'buffer',
        'crypto',
        'events',
        'querystring',
        'readline',
        'stream',
        'string_decoder',
        'zlib',
        'constants',
        'fs',
        'util',
      ],
      // Ensure a protected use of FS (only access inside the given directory)
      mock: {
        fs: protect(allowedPath)(),
      },
    },
  });

  return vm;
};
