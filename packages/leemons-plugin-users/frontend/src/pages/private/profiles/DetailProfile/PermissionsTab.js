import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { forEach, map, forIn, filter, find, uniqBy, orderBy, findIndex, isFunction } from 'lodash';
import { getLocalizationsByArrayOfItems } from '@multilanguage/useTranslate';
import { getTranslationKey as getTranslationKeyActions } from '@users/actions/getTranslationKey';
import { getTranslationKey as getTranslationKeyPermissions } from '@users/permissions/getTranslationKey';
import { listActionsRequest, listPermissionsRequest } from '@users/request';
import { Table, Box, Select, Stack, createStyles } from '@bubbles-ui/components';
import { CheckCircleIcon } from '@bubbles-ui/icons/outline';
import { useAsync } from '@common/useAsync';
import PropTypes from 'prop-types';

const PermissionsTabStyles = createStyles((theme) => ({
  icon: {
    color: theme.colors.interactive01h,
    margin: '0 auto',
  },
}));

// eslint-disable-next-line import/prefer-default-export
export const PermissionsTab = ({ t, profile, onPermissionsChange = () => {}, isEditMode }) => {
  const dataTable = useRef([]);
  const initialArrayPermissions = useRef([]);
  const [selectedPermission, setSelectedPermission] = useState('all');
  const [selectPermissions, setSelectPermissions] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [actions, setActions] = useState(null);
  const [actionT, setActionT] = useState(null);
  const [permissions, setPermissions] = useState(null);
  const [permissionT, setPermissionT] = useState(null);

  const { classes } = PermissionsTabStyles();

  const sendPermissionChange = () => {
    onPermissionsChange(
      map(dataTable.current, ({ name, permissionName, ...rest }) => {
        const actionNames = [];
        forIn(rest, ({ checked }, key) => {
          if (checked) actionNames.push(key);
        });
        return {
          permissionName,
          actionNames,
        };
      })
    );
  };

  useEffect(() => {
    if (selectedPermission !== 'all') {
      setPermissions(filter(initialArrayPermissions.current, { pluginName: selectedPermission }));
    } else {
      setPermissions(initialArrayPermissions.current);
    }
  }, [selectedPermission]);

  const getPermissionsForTable = (editMode) =>
    permissions.map((permission) => {
      const response = {
        name: permissionT[getTranslationKeyPermissions(permission.permissionName, 'name')],
        permissionName: permission.permissionName,
      };
      actions.map(({ actionName }) => {
        if (permission.actions.indexOf(actionName) >= 0) {
          let cPermission = null;
          if (dataTable.current) {
            cPermission = find(dataTable.current, {
              permissionName: permission.permissionName,
            });
          }
          if (editMode) {
            response[actionName] = {
              type: 'checkbox',
              // eslint-disable-next-line no-nested-ternary
              checked: cPermission
                ? cPermission[actionName].checked
                : profile && profile.permissions[permission.permissionName]
                ? profile.permissions[permission.permissionName].indexOf(actionName) >= 0
                : false,
            };
          } else {
            response[actionName] = () => {
              // eslint-disable-next-line no-nested-ternary
              const checked = cPermission
                ? cPermission[actionName].checked
                : profile && profile.permissions[permission.permissionName]
                ? profile.permissions[permission.permissionName].indexOf(actionName) >= 0
                : false;
              if (checked)
                return (
                  <Box>
                    <CheckCircleIcon className={classes.icon} />
                  </Box>
                );
              return null;
            };
          }
        }
        return null;
      });
      return response;
    });

  useEffect(() => {
    if (permissions && actions && permissionT) {
      setTableData(getPermissionsForTable(isEditMode));
      const data = getPermissionsForTable(true);
      if ((!dataTable.current || !dataTable.current.length) && data.length)
        dataTable.current = data;
    }
  }, [profile, permissions, actions, permissionT, isEditMode]);

  async function updateTableData(e) {
    forEach(e, (d) => {
      const index = findIndex(dataTable.current, { permissionName: d.permissionName });
      if (index >= 0) {
        dataTable.current[index] = d;
      }
    });
    setTableData(e);
    sendPermissionChange();
  }

  async function updateSelectPermissions() {
    const perms = uniqBy(initialArrayPermissions.current, 'pluginName');
    setSelectPermissions(
      map(perms, ({ pluginName }) => ({
        pluginName,
        name: pluginName.split('.')[1],
      }))
    );
  }

  // ·····················································································
  // INIT DATA LOAD

  const initDataLoad = useCallback(async () => {
    const permissionsResponse = await listPermissionsRequest();
    const permissionsTranslate = await getLocalizationsByArrayOfItems(
      permissionsResponse.permissions,
      (permission) => getTranslationKeyPermissions(permission.permissionName, 'name')
    );

    const actionsResponse = await listActionsRequest();
    const actionsTranslate = await getLocalizationsByArrayOfItems(
      actionsResponse.actions,
      (action) => getTranslationKeyActions(action.actionName, 'name')
    );

    return {
      permissions: { ...permissionsResponse, translate: permissionsTranslate },
      actions: { ...actionsResponse, translate: actionsTranslate },
    };
  }, []);

  const onDataLoadSuccess = useCallback(({ permissions: _permissions, actions: _actions }) => {
    initialArrayPermissions.current = orderBy(_permissions.permissions, ['permissionName']);
    setPermissionT(_permissions.translate.items);
    setPermissions(initialArrayPermissions.current);
    updateSelectPermissions();

    setActionT(_actions.translate.items);
    setActions(_actions.actions);
  }, []);
  const onDataLoadError = useCallback(() => {}, []);

  useAsync(initDataLoad, onDataLoadSuccess, onDataLoadError);

  // ··························································································
  // TABLE SETUP

  const tableHeaders = useMemo(() => {
    const result = [
      {
        Header: t('leemon'),
        accessor: 'name',
        // className: 'text-left',
      },
    ];
    if (actions && actionT) {
      forIn(actions, (action) => {
        result.push({
          Header: actionT[getTranslationKeyActions(action.actionName, 'name')],
          accessor: action.actionName,
          // className: 'text-center',
          style: { textAlign: 'center', width: `${Math.round(60 / actions.length)}%` },
        });
      });
    }
    return result;
  }, [actionT, actions, t]);

  const permissionOptions = useMemo(
    () => [
      { label: t('permissions_all'), value: 'all' },
      ...selectPermissions.map(({ pluginName, name }) => ({
        label: name,
        value: pluginName,
      })),
    ],
    [selectPermissions, t]
  );

  return (
    <Stack direction="column" fullWidth>
      <Box style={{ width: '70%', padding: 12 }}>
        <Select
          label={t('permissions')}
          description={t('select_permissions')}
          orientation="horizontal"
          data={permissionOptions}
          value={selectedPermission}
          onChange={(val) => {
            setSelectedPermission(val);
          }}
        />
      </Box>

      <Box>
        <Table
          columns={tableHeaders}
          data={tableData}
          onChangeData={(val) => (isEditMode ? updateTableData(val.newData) : null)}
        />
      </Box>
    </Stack>
  );
};

PermissionsTab.propTypes = {
  t: PropTypes.func,
  profile: PropTypes.any,
  onPermissionsChange: PropTypes.func,
  isEditMode: PropTypes.bool,
};
