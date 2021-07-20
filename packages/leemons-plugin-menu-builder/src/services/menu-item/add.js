const _ = require('lodash');
const { table } = require('../../tables');
const { translations } = require('../../translations');
const addItemPermissions = require('../../helpers/addItemPermissions');
const { validateNotExistMenuItem } = require('../../validations/exists');
const { validateKeyPrefix } = require('../../validations/exists');
const { validateExistMenuItem } = require('../../validations/exists');
const { validateAddMenuItem } = require('../../validations/menu-item');
const { validateNotExistMenu } = require('../../validations/exists');

const { withTransaction } = global.utils;

/**
 * Create a Menu Item
 * @private
 * @static
 * @param {MenuItemAdd} data - The Menu Item to create
 * @param {MenuPermissionsAdd=} permissions Permissions for Menu Item
 * @param {any=} transacting DB transaction
 * @return {Promise<MenuItem>} Created / Updated menuItem
 * */
async function add(
  {
    menuKey,
    key,
    parentKey,
    order,
    fixed,
    url,
    window,
    iconName,
    activeIconName,
    iconSvg,
    activeIconSvg,
    iconAlt,
    label,
    description,
    disabled,
  },
  permissions,
  { transacting: _transacting } = {}
) {
  const _order = order;
  const _fixed = fixed;
  const _disabled = disabled;

  // eslint-disable-next-line no-param-reassign
  order = undefined;
  // eslint-disable-next-line no-param-reassign
  fixed = undefined;
  // eslint-disable-next-line no-param-reassign
  disabled = undefined;

  validateKeyPrefix(key, this.calledFrom);
  validateAddMenuItem({
    menuKey,
    key,
    parentKey,
    pluginName: this.calledFrom,
    order,
    fixed,
    url,
    window,
    iconName,
    activeIconName,
    iconSvg,
    activeIconSvg,
    iconAlt,
    label,
    description,
    disabled,
  });
  const locales = translations();

  return withTransaction(
    async (transacting) => {
      // Check for required params
      await validateNotExistMenu(menuKey, { transacting });

      // Check if the MENU ITEM exists
      await validateExistMenuItem(menuKey, key, { transacting });

      // Check if the MENU ITEM PARENT exists
      if (parentKey) {
        await validateNotExistMenuItem(menuKey, parentKey, { transacting });
        if (parentKey.startsWith(this.calledFrom)) {
          // eslint-disable-next-line no-param-reassign
          order = _order;
          // eslint-disable-next-line no-param-reassign
          fixed = _fixed;
          // eslint-disable-next-line no-param-reassign
          disabled = _disabled;
        }
      }

      // Create the MENU ITEM
      const promises = [
        table.menuItem.create(
          {
            menuKey,
            key,
            parentKey,
            pluginName: this.calledFrom,
            order,
            fixed,
            url,
            window,
            iconName,
            activeIconName,
            iconSvg,
            activeIconSvg,
            iconAlt,
            disabled,
          },
          { transacting }
        ),
      ];

      // Create LABEL & DESCRIPTIONS in locales
      if (locales) {
        promises.push(
          locales.contents.addManyByKey(leemons.plugin.prefixPN(`${menuKey}.${key}.label`), label, {
            transacting,
          })
        );

        if (description) {
          promises.push(
            locales.contents.addManyByKey(
              leemons.plugin.prefixPN(`${menuKey}.${key}.description`),
              description,
              {
                transacting,
              }
            )
          );
        }
      }

      // Add the necessary permissions to view the item
      if (_.isArray(permissions) && permissions.length) {
        promises.push(
          addItemPermissions(key, `${menuKey}.menu-item`, permissions, { transacting })
        );
      } else if (leemons.plugins.users) {
        promises.push(
          addItemPermissions(
            key,
            `${menuKey}.menu-item`,
            [
              {
                permissionName:
                  leemons.plugins.users.config.constants.basicPermission.permissionName,
                actionNames: [leemons.plugins.users.config.constants.basicPermission.actionName],
              },
            ],
            { isCustomPermission: true, transacting }
          )
        );
      }

      const [menuItem] = await Promise.all(promises);

      leemons.log.info(`Added menu item "${key}" to menu "${menuKey}"`);

      return menuItem;
    },
    table.menuItem,
    _transacting
  );
}

module.exports = add;
