/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { forIn } from 'lodash';
import {
  Box,
  Button,
  ContextContainer,
  Select,
  Stack,
  Title,
  Switch,
} from '@bubbles-ui/components';
import { TextEditorInput } from '@bubbles-ui/editors';
import { Controller, useForm } from 'react-hook-form';
import { ChevLeftIcon } from '@bubbles-ui/icons/outline';
import { SelectResponse } from '@feedback/pages/private/feedback/Detail/components/SelectResponse';
import { LikertScale } from './LikertScale';
import { NetPromoterScore } from './NetPromoterScore';
import { OpenResponse } from './OpenResponse';

const questionComponents = {
  singleResponse: <SelectResponse />,
  multiResponse: <SelectResponse multi />,
  likertScale: <LikertScale />,
  netPromoterScore: <NetPromoterScore />,
  openResponse: <OpenResponse />,
};

export default function QuestionForm({ t, onSave, defaultValues, onCancel }) {
  const questionTypes = [];
  forIn(questionComponents, (value, key) => {
    questionTypes.push({ value: key, label: t(key) });
  });

  const form = useForm({ defaultValues });
  const type = form.watch('type');

  const filterProperties = (object, properties) => {
    Object.entries(object).forEach(([key]) => {
      if (!properties.includes(key)) delete object[key];
    });
  };

  const filterData = (data) => {
    if (type === 'singleResponse') {
      filterProperties(data.properties, ['responses', 'withImages']);
    }
    if (type === 'multiResponse') {
      filterProperties(data.properties, [
        'responses',
        'withImages',
        'minResponses',
        'maxResponses',
      ]);
    }
    if (type === 'likertScale') {
      filterProperties(data.properties, ['maxLabels', 'likertLabels']);
    }
    if (type === 'netPromoterScore') {
      filterProperties(data.properties, ['veryLikely', 'notLikely']);
    }
    return data;
  };

  function save() {
    form.handleSubmit((data) => {
      filterData(data);
      console.log(data);
      onSave(data);
    })();
  }

  React.useEffect(() => {
    if (type === 'netPromoterScore') {
      form.setValue('question', t('npsStatement'));
    } else {
      form.setValue('question', '');
    }
  }, [type]);

  return (
    <Box sx={(theme) => ({ marginBottom: theme.spacing[8] })}>
      <ContextContainer>
        <Box>
          <Button variant="light" leftIcon={<ChevLeftIcon />} onClick={onCancel}>
            {t('returnToList')}
          </Button>
        </Box>

        <Title order={4}>{t('questionDetail')}</Title>

        <Box>
          <ContextContainer fullWidth direction="row">
            <Stack alignItems="end" spacing={6}>
              <Controller
                control={form.control}
                name="type"
                rules={{ required: t('typeRequired') }}
                render={({ field }) => (
                  <Box style={{ width: '230px' }}>
                    <Select
                      required
                      data={questionTypes}
                      error={form.formState.errors.type}
                      label={t('typeLabel')}
                      {...field}
                    />
                  </Box>
                )}
              />
              <Controller
                control={form.control}
                name="isRequired"
                render={({ field }) => (
                  <Switch orientation="horizontal" label={t('requiredQuestionLabel')} {...field} />
                )}
              />
            </Stack>
          </ContextContainer>
        </Box>
        {type ? (
          <>
            <ContextContainer divided>
              <ContextContainer>
                <Controller
                  control={form.control}
                  name="question"
                  rules={{ required: t('questionRequired') }}
                  render={({ field }) => (
                    <TextEditorInput
                      required
                      placeholder={type === 'likertScale' ? t('likertScalePlaceholder') : ''}
                      error={form.formState.errors.question}
                      label={t('questionLabel')}
                      {...field}
                    />
                  )}
                />

                {type
                  ? React.cloneElement(questionComponents[type], {
                      form,
                      t,
                    })
                  : null}
              </ContextContainer>

              <Stack alignItems="center" justifyContent="space-between">
                <Button variant="light" leftIcon={<ChevLeftIcon />} onClick={onCancel}>
                  {t('returnToList')}
                </Button>
                <Button onClick={save}>{t('saveQuestion')}</Button>
              </Stack>
            </ContextContainer>
          </>
        ) : null}
      </ContextContainer>
    </Box>
  );
}

QuestionForm.propTypes = {
  onSave: PropTypes.func,
  defaultValues: PropTypes.object,
  t: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  categories: PropTypes.array,
};
