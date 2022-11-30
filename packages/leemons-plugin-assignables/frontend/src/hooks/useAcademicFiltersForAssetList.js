import React from 'react';
import { Box, Select, ImageLoader, Text } from '@bubbles-ui/components';
import useTranslateLoader from '@multilanguage/useTranslateLoader';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useCenterPrograms, useSessionClasses } from '@academic-portfolio/hooks';
import { useUserCenters } from '@users/hooks';
import { getClassIcon } from '@academic-portfolio/helpers/getClassIcon';
import { getMultiClassData } from '@assignables/helpers/getClassData';
import _ from 'lodash';
import { unflatten } from '@common';
import { getSessionConfig } from '@users/session';

function useAssignablesAssetListLocalizations() {
  const [, translations] = useTranslateLoader('plugins.assignables.assetListFilters');

  return React.useMemo(() => {
    if (translations && translations.items) {
      const res = unflatten(translations.items);
      const data = _.get(res, 'plugins.assignables.assetListFilters');

      // EN: Modify the data object here
      // ES: Modifica el objeto data aquí
      return data;
    }

    return {};
  }, [translations]);
}

function usePrograms({ labels }) {
  const { data: centers } = useUserCenters();
  const centersIds = React.useMemo(() => centers?.map((center) => center.id) || [], [centers]);
  const programsQueries = useCenterPrograms(centersIds, { enabled: !!centersIds?.length });

  const programsAreLoading = React.useMemo(
    () => programsQueries.every((queryInfo) => queryInfo.isLoading),
    [programsQueries]
  );

  return React.useMemo(
    () =>
      programsAreLoading
        ? []
        : [
            {
              value: 'all',
              label: labels?.allPrograms,
            },
            ...programsQueries?.flatMap((queryInfo) => {
              const centerPrograms = queryInfo.data;
              return centerPrograms.map((program) => ({
                value: program.id,
                label: program.name,
              }));
            }),
          ],
    [programsQueries, labels?.allPrograms]
  );
}

function useSubjects({ labels, control }) {
  const selectedProgram = useWatch({ control, name: 'program' });
  const { data: classesData } = useSessionClasses({ showType: true });
  const multiClassData = getMultiClassData();

  return React.useMemo(() => {
    if (selectedProgram === 'all' || !classesData?.length) {
      return [];
    }

    const subjects = {};

    classesData.forEach((klass) => {
      if (!subjects[klass.subject.id]) {
        subjects[klass.subject.id] = {
          label: klass.subject.name,
          value: klass.subject.id,
          color: klass.color,
          icon: klass.subject.icon,
          type: klass.type,
        };
      } else if (
        subjects[klass.subject.id].type !== 'main-teacher' &&
        klass.type === 'main-teacher'
      ) {
        subjects[klass.subject.id].type = 'main-teacher';
      }
    });

    return [
      {
        label: labels?.allSubjects,
        value: 'all',
        group: labels?.allSubjects,
        icon: multiClassData.icon,
        color: multiClassData.color,
      },
      ...Object.values(subjects).map((subject) => ({
        ...subject,
        group:
          subject.type === 'main-teacher'
            ? labels?.subectGroups?.mySubjects
            : labels?.subectGroups?.collaborations,
      })),
    ];
  }, [classesData, selectedProgram, labels?.allSubjects, labels?.subjectGroups, multiClassData]);
}

function SubjectItem({ subject, ...props }) {
  if (!subject) {
    return null;
  }

  return (
    <Box {...props}>
      <Box
        sx={(theme) => ({
          display: 'flex',
          flexDirection: 'row',
          gap: theme.spacing[2],
          alignItems: 'center',
        })}
      >
        <Box
          sx={() => ({
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 26,
            minHeight: 26,
            maxWidth: 26,
            maxHeight: 26,
            borderRadius: '50%',
            backgroundColor: subject?.color,
          })}
        >
          <ImageLoader
            sx={() => ({
              borderRadius: 0,
              filter: 'brightness(0) invert(1)',
            })}
            forceImage
            width={16}
            height={16}
            src={typeof subject?.icon === 'string' ? subject.icon : getClassIcon({ subject })}
          />
        </Box>
        <Text>{subject.label}</Text>
      </Box>
    </Box>
  );
}

function useOnChange({ onChange, watch, getValues }) {
  const onSubmit = React.useCallback(
    (values) => {
      if (typeof onChange === 'function') {
        onChange({
          program: values.program === 'all' ? null : values.program,
          subjects:
            values.subject && values.subject !== 'all' && values.program !== 'all'
              ? [values.subject]
              : undefined,
        });
      }
    },
    [onChange]
  );

  React.useEffect(() => {
    const subscription = watch(onSubmit);
    onSubmit(getValues());

    return subscription.unsubscribe;
  }, [watch, onSubmit]);
}

function SelectAutoClearable({ data, value, onChange, ...props }) {
  React.useEffect(() => {
    if (value && typeof onChange === 'function' && !data.find((item) => item.value === value)) {
      onChange(null);
    }
  }, [data]);

  return (
    <Select
      {...props}
      data={data}
      value={[value]}
      onChange={(v) => onChange(v[0])}
      valueComponent={(item) => (
        <SubjectItem {...item} subject={data.find((d) => d.value === item.value)} />
      )}
      itemComponent={(item) => (
        <SubjectItem {...item} subject={data.find((d) => d.value === item.value)} />
      )}
    />
  );
}

function SubjectFilters({ onChange, loading }) {
  const sessionConfig = getSessionConfig();
  const selectedProgram = sessionConfig?.program || 'all';
  const { control, watch, getValues } = useForm({
    defaultValues: {
      program: selectedProgram,
      subject: null,
    },
  });

  useOnChange({ watch, onChange, getValues });
  const labels = useAssignablesAssetListLocalizations();

  const programs = usePrograms({ labels });
  // const classes = useClasses(control);
  const subjects = useSubjects({ labels, control });

  return (
    <>
      <Controller
        control={control}
        name={'program'}
        render={({ field }) => (
          <Select
            {...field}
            placeholder={labels?.program}
            data={programs}
            searchable
            disabled={!!loading}
          />
        )}
      />
      <Controller
        control={control}
        name={'subject'}
        render={({ field }) => (
          <SelectAutoClearable
            {...field}
            data={subjects}
            placeholder={labels?.subject}
            searchable
            disabled={!subjects.length || !!loading}
          />
        )}
      />
    </>
  );
}

export function useAcademicFiltersForAssetList() {
  const [filters, setFilters] = React.useState(undefined);
  const onChange = React.useCallback(setFilters);

  return {
    filterComponents: ({ loading }) => <SubjectFilters onChange={onChange} loading={loading} />,
    filters,
    searchInProvider: !!filters?.program || !!filters?.subjects?.length,
  };
}

export default useAcademicFiltersForAssetList;
