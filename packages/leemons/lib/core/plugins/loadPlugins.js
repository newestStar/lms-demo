const path = require('path');
const _ = require('lodash');

const { loadConfiguration } = require('../config/loadConfig');
const { loadFiles, loadFile } = require('../config/loadFiles');
const { formatModels } = require('../model/loadModel');
const { getLocalPlugins, getExternalPlugins } = require('./getPlugins');
const checkPluginDuplicates = require('./checkPluginDuplicates');
const loadServices = require('./loadServices');

let pluginsEnv = [];

// Load plugins part 1 (load config and models)
async function loadPluginsConfig(leemons) {
  const plugins = [...(await getLocalPlugins(leemons)), ...(await getExternalPlugins(leemons))];

  // Load all the plugins configuration
  const loadedPlugins = await Promise.all(
    plugins.map(async (plugin) => {
      const { env, configProvider: config } = await loadConfiguration(plugin, {
        dir: plugin.path,
        defaultDirs: {
          config: 'config',
          models: 'models',
          controllers: 'controllers',
          services: 'services',
          next: 'next',
          env: '.env',
        },
      });

      // Save the plugin env
      pluginsEnv.push([config.get('config.name', plugin.name), env]);

      return {
        source: plugin.source,
        name: config.get('config.name', plugin.name),
        dir: plugin.dir,
        config,
      };
    })
  );

  // Convert the plugins env to a json ([[name, value]] => {name: value})
  pluginsEnv = _.fromPairs(pluginsEnv);

  // Throw an error when two plugins have the same id (name)
  checkPluginDuplicates(loadedPlugins);

  return loadedPlugins;
}

async function loadPluginsModels(pluginObjs, leemons) {
  let loadedPlugins = pluginObjs;

  // Process every plugin models
  loadedPlugins = await Promise.all(
    loadedPlugins.map(async (plugin) => {
      const pluginObj = plugin;

      // Generate database models
      const pluginModels = await loadFiles(path.resolve(pluginObj.dir.app, pluginObj.dir.models), {
        env: pluginsEnv[pluginObj.name],
      });
      pluginObj.models = formatModels(pluginModels, `plugins.${pluginObj.name}`);

      return [pluginObj.name, pluginObj];
    })
  );

  // Save the plugins in leemons (for the connector to detect them)
  _.set(leemons, 'plugins', _.fromPairs(loadedPlugins));
}

// Load plugins part 2 (controllers, services and front)
async function initializePlugins(leemons) {
  let loadedPlugins = _.values(leemons.plugins);

  // Process every plugin
  loadedPlugins = await Promise.all(
    loadedPlugins.map(async (plugin) => {
      const pluginObj = plugin;

      // VM filter
      // TODO: Refactor (Maybe some code can be run only once?) [Check after implementing plugin Deps]
      const allowedPlugins = loadedPlugins
        .filter((loadedPlugin) => loadedPlugin.config.get('config.private', false) === false)
        .map((publicPlugin) => publicPlugin.name);
      if (!allowedPlugins.includes(plugin.name)) {
        allowedPlugins.push(plugin.name);
      }

      const vmFilter = (filtered) => {
        Object.defineProperty(filtered.leemons, 'plugin', {
          // TODO: Check binding missing
          // The binding is needed for triggering the outside VM leemons
          // eslint-disable-next-line no-extra-bind
          get: () => leemons.plugins[plugin.name],
        });
        Object.defineProperty(filtered.leemons, 'plugins', {
          get: () => _.pick(leemons.plugins, allowedPlugins),
        });
        const { query } = filtered.leemons;
        _.set(filtered, 'leemons.query', (modelName) => query(modelName, plugin.name));
        return filtered;
      };

      // Load routes
      const routesFile = path.resolve(pluginObj.dir.app, pluginObj.dir.controllers, 'routes');

      // resolve routes in the following order (until find one)
      // 1.- controllers/routes.js
      // 2.- controllers/routes.json
      // set to []
      const routes =
        (await loadFile(`${routesFile}.js`)) || (await loadFile(`${routesFile}.json`)) || [];

      // Load controllers
      const controllers = await loadFiles(
        path.resolve(pluginObj.dir.app, pluginObj.dir.controllers),
        {
          accept: ['.js'],
          exclude: [path.basename(routesFile)],
          filter: vmFilter,
          env: pluginsEnv[pluginObj.name],
          allowedPath: pluginObj.dir.app,
        }
      );

      // Load services
      const services = await loadServices(
        // path.resolve(pluginObj.dir.app, pluginObj.dir.services),
        pluginObj,
        vmFilter,
        pluginsEnv[pluginObj.name]
      );

      // Return as the result of Object.entries
      return [pluginObj.name, { ...pluginObj, routes, controllers, services }];
    })
  );
  _.set(leemons, 'plugins', _.fromPairs(loadedPlugins));
}

module.exports = { loadPluginsConfig, loadPluginsModels, initializePlugins };
