import React from 'react';
import PropTypes from 'prop-types';
import { Button, ContextContainer, Stack, TextInput } from '@bubbles-ui/components';
import { useStore } from '@common';

function CurriculumTextInput({ onChange, value, onSave, schema, t }) {
  const [store, render] = useStore();

  function onChangeValue(e) {
    onChange({ ...value, value: e });
  }

  async function save() {
    store.loading = true;
    render();
    await onSave();
    store.loading = false;
    render();
  }

  return (
    <ContextContainer>
      <TextInput label={schema.title} value={value?.value} onChange={onChangeValue} />
      <Stack justifyContent="end">
        <Button variant="outline" loading={store.loading} onClick={save}>
          {t('save')}
        </Button>
      </Stack>
    </ContextContainer>
  );
}

CurriculumTextInput.defaultProps = {
  onSave: () => {},
};

CurriculumTextInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.any,
  schema: PropTypes.any,
  onSave: PropTypes.func,
  t: PropTypes.func,
};

export default CurriculumTextInput;
