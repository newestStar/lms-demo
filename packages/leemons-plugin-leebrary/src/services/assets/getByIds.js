/* eslint-disable no-param-reassign */
const {
  isEmpty,
  flatten,
  map,
  find,
  compact,
  uniq,
  isNil,
  intersection,
  isArray,
  uniqBy,
  filter,
  keyBy,
  forEach,
  groupBy,
} = require('lodash');
const {
  getUserAgentsInfo,
} = require('leemons-plugin-users/src/services/user-agents/getUserAgentsInfo');
const { tables } = require('../tables');
const { CATEGORIES } = require('../../../config/constants');
const { getByAssets: getPermissions } = require('../permissions/getByAssets');
const { find: findBookmarks } = require('../bookmarks/find');
const canAssignRole = require('../permissions/helpers/canAssignRole');
const { getByIds: getCategories } = require('../categories/getByIds');
const { getByAssets: getPins } = require('../pins/getByAssets');
const getAssetPermissionName = require('../permissions/helpers/getAssetPermissionName');
const { getClassesPermissions } = require('../permissions/getClassesPermissions');

async function getByIds(
  assetsIds,
  {
    withFiles,
    withSubjects = true,
    withTags = true,
    withCategory = true,
    checkPins = true,
    checkPermissions,
    indexable,
    userSession,
    showPublic,
    transacting,
  } = {}
) {
  const ids = flatten([assetsIds]);

  const query = {
    id_$in: ids,
  };

  if (!isNil(indexable)) {
    query.indexable = indexable;
  }

  let assets = await tables.assets.find(query, { transacting });

  // ·········································································
  // PERMISSIONS & PERSONS
  if (checkPermissions && userSession) {
    const classesPermissionsPerAsset = await getClassesPermissions(map(assets, 'id'), {
      withInfo: true,
      transacting,
      userSession,
    });

    let permissions = [];

    if (userSession || showPublic) {
      permissions = await getPermissions(assetsIds, { showPublic, userSession, transacting });
    }

    const privateAssets = permissions.map((item) => item.asset);
    assets = assets.filter((asset) => privateAssets.includes(asset.id));

    const getUsersAssetIds = [];
    for (let i = 0, l = assets.length; i < l; i++) {
      const asset = assets[i];
      const classesWithPermissions = classesPermissionsPerAsset[i];

      asset.classesCanAccess = classesWithPermissions;
      const permission = permissions.find((item) => item.asset === asset.id);
      if (!isEmpty(permission?.permissions)) {
        const { permissions: userPermissions } = permission;
        if (userPermissions.edit) {
          getUsersAssetIds.push(asset.id);
        }
      }
    }

    if (getUsersAssetIds.length) {
      const { services } = leemons.getPlugin('users');
      const rawUserAgents = await services.permissions.findUsersWithPermissions(
        {
          permissionName_$in: map(getUsersAssetIds, getAssetPermissionName),
        },
        { returnRaw: true, transacting }
      );
      const userAgentIds = uniq(map(rawUserAgents, 'userAgent'));
      const userAgents = await getUserAgentsInfo(userAgentIds, { transacting });
      const userAgentsById = keyBy(userAgents, 'id');

      for (let i = 0, l = assets.length; i < l; i++) {
        const asset = assets[i];
        if (getUsersAssetIds.includes(asset.id)) {
          const permission = permissions.find((item) => item.asset === asset.id);
          const assetPermissionName = getAssetPermissionName(asset.id);
          const { role: userRole } = permission;
          const rawPerm = filter(
            rawUserAgents,
            ({ permissionName }) => permissionName === assetPermissionName
          );
          const assetUserAgents = uniqBy(rawPerm, 'userAgent');

          let assetPermissions = [];
          forEach(assetUserAgents, (raw) => {
            const userAgent = userAgentsById[raw.userAgent];
            const perm = find(assetPermissions, { id: userAgent.user.id });
            if (perm) {
              perm.userAgentIds.push(userAgent.id);
              perm.permissions.push(raw.actionName);
            } else {
              assetPermissions.push({
                ...userAgent.user,
                userAgentIds: [userAgent.id],
                permissions: [raw.actionName],
              });
            }
          });
          assetPermissions = assetPermissions.map((user) => {
            const item = { ...user };
            item.editable = canAssignRole(userRole, item.permissions[0], item.permissions[0]);
            return item;
          });
          assets[i].canAccess = assetPermissions;
        }
      }
    }
  }

  // ·········································································
  // SUBJECT
  if (!isEmpty(assets) && withSubjects) {
    const assetsSubjects = await tables.assetsSubjects.find({ asset_$in: ids }, { transacting });

    const subjectsByAsset = groupBy(assetsSubjects, 'asset');

    assets = assets.map((asset) => {
      asset.subjects = subjectsByAsset[asset.id];
      return asset;
    });
  }

  // ·········································································
  // FILES
  if (!isEmpty(assets) && withFiles) {
    const assetsFiles = await tables.assetsFiles.find({ asset_$in: ids }, { transacting });
    const fileIds = compact(
      uniq(map(assetsFiles, 'file').concat(assets.map((asset) => asset.cover)))
    );

    // ES: En caso de que algún asset sea un Bookmark, entonces recuperamos el icono
    // EN: In case one asset is a Bookmark, then we recover the icon
    const bookmarks = await findBookmarks({ asset_$in: ids }, { transacting });
    const iconFiles = compact(uniq(map(bookmarks, 'icon')));
    fileIds.push(...iconFiles);

    const files = await tables.files.find({ id_$in: fileIds }, { transacting });

    assets = assets.map((asset) => {
      const items = assetsFiles
        .filter((assetFile) => assetFile.asset === asset.id)
        .map((assetFile) => find(files, { id: assetFile.file }));

      if (asset.cover) {
        asset.cover = find(files, { id: asset.cover });
      }

      const bookmark = find(bookmarks, { asset: asset.id });

      if (bookmark) {
        asset.url = bookmark.url;
        asset.icon = find(files, { id: bookmark.icon });
        asset.fileType = 'bookmark';
        asset.metadata = [];
      }

      if (!isEmpty(items)) {
        if (asset.cover) {
          asset.file =
            items.length > 1 ? items.filter((item) => item.id !== asset.cover) : items[0];
        } else {
          [asset.file] = items;
        }
      }

      return asset;
    });
  }

  // ·········································································
  // TAGS
  let tags = [];
  if (withTags) {
    const tagsService = leemons.getPlugin('common').services.tags;
    tags = await Promise.all(
      assets.map((item) =>
        tagsService.getValuesTags(item.id, { type: leemons.plugin.prefixPN(''), transacting })
      )
    );
  }

  // ·········································································
  // CATEGORY DATA
  let categories = [];
  let assetCategoryData = [];
  if (withCategory) {
    categories = await getCategories(uniq(assets.map((item) => item.category)), {
      transacting,
    });

    // CATEGORY ROVIDER DATA
    const providersResults = await Promise.all(
      categories.map((category) => {
        if (category.provider === 'leebrary') {
          return null;
        }

        const categoryProvider = category.provider;
        const assetProviderService = leemons.getProvider(categoryProvider).services.assets;
        return assetProviderService.getByIds(
          assets
            .filter((item) => item.category === category.id)
            .map((item) => ({ ...item, category })),
          { userSession, transacting }
        );
      })
    );

    assetCategoryData = providersResults.flat();
  }

  // ·········································································
  // PINS DATA
  let pins = [];

  if (checkPins) {
    pins = await getPins(assetsIds, { userSession, transacting });
  }

  // ·········································································
  // FINALLY

  const deleteRoles = ['owner'];
  const shareRoles = ['owner', 'editor'];
  const editRoles = ['owner', 'editor'];
  const assignRoles = ['owner', 'editor'];
  const userAgents = userSession?.userAgents.map(({ id }) => id) || [];

  const result = assets.map((asset, index) => {
    const item = { ...asset };

    if (withCategory) {
      const { key, duplicable, assignable } = find(categories, { id: asset.category });
      item.duplicable = duplicable;
      item.assignable = assignable;
      item.downloadable = key === CATEGORIES.MEDIA_FILES;
      item.providerData = find(assetCategoryData, { asset: asset.id });
    }

    if (withTags) {
      [item.tags] = tags[index];
    }

    if (checkPins) {
      const pin = find(pins, { asset: asset.id });
      item.pinned = !isNil(pin?.id);
    }

    if (isArray(item.canAccess)) {
      item.editable = item.canAccess.some(
        (permission) =>
          intersection(permission.permissions, editRoles).length > 0 &&
          intersection(permission.userAgentIds, userAgents).length > 0
      );

      item.deleteable = item.canAccess.some(
        (permission) =>
          intersection(permission.permissions, deleteRoles).length > 0 &&
          intersection(permission.userAgentIds, userAgents).length > 0
      );

      item.shareable = item.canAccess.some(
        (permission) =>
          intersection(permission.permissions, shareRoles).length > 0 &&
          intersection(permission.userAgentIds, userAgents).length > 0
      );

      item.assignable = item.canAccess.some(
        (permission) =>
          intersection(permission.permissions, assignRoles).length > 0 &&
          intersection(permission.userAgentIds, userAgents).length > 0
      );
    }

    return item;
  });

  return result;
}

module.exports = { getByIds };
