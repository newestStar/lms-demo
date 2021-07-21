const _ = require('lodash');
const { PLUGIN_STATUS } = require('./pluginsStatus');

/**
 * Disables the given plugin and also it's dependants
 */
function disablePlugin(plugins, plugin, reason = PLUGIN_STATUS.initializationFailed) {
  leemons.events.emit('pluginWillDisable', `plugins.${plugin.name}`, reason);
  _.set(plugin, 'status', { ...plugin.status, ...reason });

  const { dependants } = plugin.dependencies;

  plugins
    .filter((_plugin) => dependants.includes(_plugin.name))
    .forEach((_plugin) => disablePlugin(plugins, _plugin, PLUGIN_STATUS.disabledDeps));

  leemons.events.emit('pluginDidDisabled', `plugins.${plugin.name}`, reason);
}

module.exports = disablePlugin;
