import React, { useEffect, useMemo, useState } from 'react';
import {
  AdminPageHeader,
  Paper,
  Box,
  Stack,
  Anchor,
  ActionButton,
  Tabs,
  TabPanel,
  Table,
} from '@bubbles-ui/components';
import { ExpandDiagonalIcon } from '@bubbles-ui/icons/outline';
import useTranslateLoader from '@multilanguage/useTranslateLoader';
import useCommonTranslate from '@multilanguage/helpers/useCommonTranslate';
import useRequestErrorMessage from '@common/useRequestErrorMessage';
import { listProfilesRequest } from '@users/request';
import { goDetailProfilePage } from '@users/navigate';
import prefixPN from '@users/helpers/prefixPN';
import { Link, useHistory } from 'react-router-dom';
import _ from 'lodash';

function ListProfiles() {
  const [t] = useTranslateLoader(prefixPN('list_profiles'));
  const { t: tCommon } = useCommonTranslate('page_header');
  const [loadingError, setLoadingError, LoadingErrorAlert] = useRequestErrorMessage();
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);

  const history = useHistory();

  const tableHeaders = useMemo(
    () => [
      {
        Header: t('name'),
        accessor: 'name',
        className: 'text-left',
      },
      {
        Header: t('overview'),
        accessor: 'description',
        className: 'text-left',
      },
      {
        Header: t('actions'),
        accessor: 'actions',
        className: 'text-right',
      },
    ],
    [t]
  );

  const tableItems = useMemo(
    () =>
      pagination
        ? _.map(pagination.items, (item) => ({
            ...item,
            actions: (
              <Box style={{ textAlign: 'right', width: '100%' }}>
                <ActionButton
                  as={Link}
                  to={`/private/users/profiles/detail/${item.uri}`}
                  tooltip={t('view')}
                  icon={<ExpandDiagonalIcon />}
                />
              </Box>
            ),
          }))
        : [],
    [t, pagination]
  );

  async function listProfiles() {
    const { data } = await listProfilesRequest({
      page: 0,
      size: 10,
    });

    setPagination(data);
  }

  const load = async () => {
    try {
      await listProfiles();
      setLoading(false);
    } catch (err) {
      setLoadingError(err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const headerValues = useMemo(
    () => ({
      title: t('page_title'),
      description: t('page_description'),
    }),
    [t]
  );

  return (
    <Stack direction="column" fullWidth fullHeight>
      <AdminPageHeader
        values={headerValues}
        buttons={{ new: tCommon('new') }}
        onNew={() => goDetailProfilePage(history)}
      />

      <Box style={{ flex: 1 }}>
        <Tabs usePageLayout={true} panelColor="solid" fullHeight>
          <TabPanel label={t('page_title')}>
            <Paper padding={5} mt={20} mb={20}>
              <LoadingErrorAlert />
              {!loading && !loadingError ? (
                <Table columns={tableHeaders} data={tableItems} />
              ) : null}
            </Paper>
          </TabPanel>
          <TabPanel label="Permisos" disabled>
            <Box></Box>
          </TabPanel>
        </Tabs>
      </Box>
    </Stack>
  );
}

export default ListProfiles;
