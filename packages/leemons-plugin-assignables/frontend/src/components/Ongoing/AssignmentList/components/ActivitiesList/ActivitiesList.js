import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, ImageLoader, Loader, PaginatedList, Text } from '@bubbles-ui/components';
import _ from 'lodash';
import { unflatten } from '@common';
import useTranslateLoader from '@multilanguage/useTranslateLoader';
import { useLayout } from '@layout/context';
import { useIsTeacher } from '@academic-portfolio/hooks';
import useSearchAssignableInstances from '../../../../../hooks/assignableInstance/useSearchAssignableInstancesQuery';
import useParseAssignations from '../../hooks/useParseAssignations';
import useAssignationsByProfile from '../../../../../hooks/assignations/useAssignationsByProfile';
import prefixPN from '../../../../../helpers/prefixPN';
import EmptyState from '../../../../../assets/EmptyState.png';

function useAssignmentsColumns({ variant } = {}) {
  const isTeacher = useIsTeacher();

  const [, translations] = useTranslateLoader(
    prefixPN(`assignment_list.${isTeacher ? 'teacher' : 'student'}`)
  );

  const labels = useMemo(() => {
    if (translations && translations.items) {
      const res = unflatten(translations.items);
      const data = _.get(res, prefixPN(`assignment_list.${isTeacher ? 'teacher' : 'student'}`));

      // EN: Modify the data object here
      // ES: Modifica el objeto data aquí
      return data;
    }

    return {};
  }, [translations]);

  const commonColumns = useMemo(
    () => [
      {
        Header: labels?.task || '',
        accessor: 'activity',
      },
      {
        Header: labels?.subject || '',
        accessor: 'subject',
      },
      {
        Header: labels?.start || '',
        accessor: 'parsedDates.start',
      },
      {
        Header: labels?.deadline || '',
        accessor: 'parsedDates.deadline',
      },
    ],
    [labels]
  );

  const columns = useMemo(() => {
    if (isTeacher) {
      return [
        ...commonColumns,
        {
          Header: labels.students || '',
          accessor: 'students',
        },
        /*
        {
          Header: labels.open || '',
          accessor: 'open',
        },

         */
        {
          Header: labels.ongoing || '',
          accessor: 'ongoing',
        },
        {
          Header: labels.completed || '',
          accessor: 'completed',
        },
        {
          Header: labels.unreadMessages || '',
          accessor: 'unreadMessages',
        },
        {
          Header: '',
          accessor: 'actions',
        },
      ];
    }

    // student
    return [
      ...commonColumns,
      {
        Header: labels.status || '',
        accessor: 'status',
      },
      variant !== 'evaluated' && {
        Header: labels.submission || '',
        accessor: 'submission',
      },
      variant === 'evaluated' && {
        Header: labels.grade || '',
        accessor: 'grade',
      },
      {
        Header: labels.unreadMessages || '',
        accessor: 'unreadMessages',
      },
      {
        Header: '',
        accessor: 'actions',
      },
    ].filter(Boolean);
  }, [isTeacher, labels, variant]);

  return columns;
}

export default function ActivitiesList({ filters, subjectFullLength = true }) {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const { theme: themeLayout } = useLayout();

  const query = useMemo(() => {
    const q = {};

    if (filters?.query) {
      q.search = filters?.query;
    }

    if (filters?.subject && filters?.subject !== 'all') {
      q.subjects = JSON.stringify([filters?.subject]);
    }

    if (filters?.class && filters?.class !== 'all') {
      q.classes = JSON.stringify([filters?.class]);
    }

    if (filters?.type && filters?.type !== 'all') {
      q.role = filters?.type;
    }
    if (filters?.status && filters?.status !== 'all') {
      q.status = filters?.status;
    }

    if (filters?.tab === 'ongoing') {
      q.archived = false;
      q.evaluated = false;
    } else if (filters?.tab === 'history') {
      q.archived = true;
    } else if (filters?.tab === 'evaluated') {
      q.evaluated = true;
    }

    return q;
  }, [filters]);

  const [, translations] = useTranslateLoader([
    prefixPN('pagination'),
    prefixPN('activities_list'),
  ]);

  const labels = useMemo(() => {
    if (translations && translations.items) {
      const res = unflatten(translations.items);
      return {
        pagination: _.get(res, prefixPN('pagination')),
        activitiesList: _.get(res, prefixPN('activities_list')),
      };
    }

    return {};
  }, [translations]);

  const { data: instances, isLoading: instancesLoading } = useSearchAssignableInstances(query);

  const instancesInPage = useMemo(() => {
    if (instancesLoading || !instances?.length) {
      return [];
    }

    return instances.slice((page - 1) * size, page * size);
  }, [instances, instancesLoading, page, size]);

  const assignationsByProfile = useAssignationsByProfile(instancesInPage);

  const instancesDataLoading = useMemo(
    () => assignationsByProfile.some((q) => q.isLoading),
    [assignationsByProfile]
  );
  const instancesData = useMemo(() => {
    if (instancesDataLoading) {
      return [];
    }

    return assignationsByProfile.map(({ data }) => data);
  }, [assignationsByProfile, instancesDataLoading]);

  const { data: parsedInstances, isLoading: parsedInstancesLoading } = useParseAssignations(
    instancesData,
    {
      subjectFullLength,
    }
  );

  const columns = useAssignmentsColumns({ variant: filters?.tab });

  const isLoading = instancesLoading || instancesDataLoading || parsedInstancesLoading;

  if (isLoading) {
    return <Loader />;
  }
  if (!parsedInstances?.length) {
    return (
      <Box
        sx={(theme) => ({
          width: '100%',
          height: 328,
          borderRadius: theme.spacing[1],
          backgroundColor: theme.colors.uiBackground02,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: theme.spacing[1],
        })}
      >
        {themeLayout.usePicturesEmptyStates && (
          <ImageLoader src={EmptyState} width={142} height={149} />
        )}
        <Text color="primary">{labels.activitiesList?.emptyState}</Text>
      </Box>
    );
  }

  const headerStyles = {
    position: 'sticky',
    top: '0px',
    backgroundColor: 'white',
    zIndex: 10,
  };

  return (
    <>
      <PaginatedList
        columns={columns}
        items={parsedInstances}
        page={page}
        size={size}
        loading={isLoading}
        totalCount={instances?.length}
        totalPages={Math.ceil(instances?.length / size)}
        onSizeChange={setSize}
        onPageChange={setPage}
        selectable={false}
        labels={labels.pagination}
        headerStyles={headerStyles}
      />
    </>
  );
}

ActivitiesList.propTypes = {
  query: PropTypes.object,
};
