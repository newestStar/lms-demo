/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  ColorInput,
  ContextContainer,
  createStyles,
  Paragraph,
  PasswordInput,
  Stack,
  TextInput,
  Title,
} from '@bubbles-ui/components';
import useTranslateLoader from '@multilanguage/useTranslateLoader';
import prefixPN from '@admin/helpers/prefixPN';
import { useStore } from '@common';
import useRequestErrorMessage from '@common/useRequestErrorMessage';
import { useLayout } from '@layout/context';
import { Controller, useForm } from 'react-hook-form';
import { addErrorAlert } from '@layout/alert';
import { getOrganizationRequest, updateOrganizationRequest } from '@admin/request/organization';
import hooks from 'leemons-hooks';

const Styles = createStyles((theme) => ({}));

const Note = ({ t, descriptionKey }) => (
  <Box mt={2}>
    <Title order={6}>{t('note')}</Title>
    <Paragraph>{t(descriptionKey)}</Paragraph>
  </Box>
);

Note.propTypes = {
  t: PropTypes.func.isRequired,
  descriptionKey: PropTypes.string.isRequired,
};

const Organization = ({ onNextLabel, onNext = () => {} }) => {
  const [t, , , tLoading] = useTranslateLoader(prefixPN('setup.organization'));
  const [, , , getErrorMessage] = useRequestErrorMessage();

  const { openDeleteConfirmationModal } = useLayout();
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [store, render] = useStore({
    loading: true,
    selectedCenter: null,
  });

  async function load() {
    try {
      store.loading = true;
      render();
      const { organization } = await getOrganizationRequest();
      reset(organization);
    } catch (err) {
      addErrorAlert(getErrorMessage(err));
    }
    store.loading = false;
    render();
  }

  React.useEffect(() => {
    load();
  }, []);

  const { classes: styles, cx } = Styles();

  async function onSubmit(data) {
    try {
      store.saving = true;
      render();
      await updateOrganizationRequest(data);
      hooks.fireEvent('platform:theme:change');
      onNext();
    } catch (err) {
      addErrorAlert(getErrorMessage(err));
    }
    store.saving = false;
    render();
  }

  function r(n) {
    return { required: t(n) };
  }

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <ContextContainer title={t('title')} description={t('description')} divided>
          <ContextContainer>
            <Controller
              name="name"
              control={control}
              rules={r('organizationNameRequired')}
              render={({ field }) => (
                <TextInput label={t('organizationName')} error={errors.name} required {...field} />
              )}
            />

            <ContextContainer
              subtitle={t('domainUrlForInstallation')}
              description={<Note t={t} descriptionKey="domainUrlDescription" />}
            >
              <Controller
                name="hostname"
                control={control}
                rules={r('hostnameRequired')}
                render={({ field }) => (
                  <TextInput label={t('hostname')} error={errors.hostname} required {...field} />
                )}
              />
            </ContextContainer>
            <ContextContainer
              subtitle={t('lookAndFeel')}
              description={<Note t={t} descriptionKey="lookAndFeelDescription" />}
            >
              <Stack fullWidth spacing={6}>
                <Box>
                  <Controller
                    name="logoUrl"
                    control={control}
                    render={({ field }) => (
                      <TextInput error={errors.logoUrl} label={t('logoUrl')} {...field} />
                    )}
                  />
                </Box>
                <Box>
                  <Controller
                    name="mainColor"
                    control={control}
                    render={({ field }) => (
                      <ColorInput
                        useHsl
                        compact={false}
                        manual={false}
                        error={errors.mainColor}
                        label={t('mainColor')}
                        {...field}
                      />
                    )}
                  />
                </Box>
              </Stack>
            </ContextContainer>
            <ContextContainer
              subtitle={t('superAdminCredentials')}
              description={<Note t={t} descriptionKey="superAdminCredentialsDescription" />}
            >
              <Stack fullWidth spacing={6}>
                <Box>
                  <Controller
                    name="email"
                    rules={r('emailRequired')}
                    control={control}
                    render={({ field }) => (
                      <TextInput error={errors.email} label={t('email')} required {...field} />
                    )}
                  />
                </Box>
                <Box>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <PasswordInput error={errors.password} label={t('password')} {...field} />
                    )}
                  />
                </Box>
              </Stack>
            </ContextContainer>
            <ContextContainer
              subtitle={t('administrativeContactInfo')}
              description={t('administrativeContactInfoDescription')}
            >
              <Stack fullWidth spacing={6}>
                <Box>
                  <Controller
                    name="contactPhone"
                    control={control}
                    render={({ field }) => (
                      <TextInput error={errors.contactPhone} label={t('phone')} {...field} />
                    )}
                  />
                </Box>
                <Box>
                  <Controller
                    name="contactEmail"
                    control={control}
                    render={({ field }) => (
                      <PasswordInput error={errors.contactEmail} label={t('email')} {...field} />
                    )}
                  />
                </Box>
              </Stack>
              <Stack fullWidth spacing={6}>
                <Box>
                  <Controller
                    name="contactName"
                    control={control}
                    render={({ field }) => (
                      <TextInput error={errors.contactName} label={t('contactName')} {...field} />
                    )}
                  />
                </Box>
                <Box />
              </Stack>
            </ContextContainer>
          </ContextContainer>
          <Stack justifyContent="end">
            <Button type="submit" loading={store.saving}>
              {onNextLabel}
            </Button>
          </Stack>
        </ContextContainer>
      </form>
    </Box>
  );
};

Organization.defaultProps = {
  onNextLabel: 'Save and continue',
};
Organization.propTypes = {
  onNext: PropTypes.func,
  onNextLabel: PropTypes.string,
};

export { Organization };
export default Organization;
