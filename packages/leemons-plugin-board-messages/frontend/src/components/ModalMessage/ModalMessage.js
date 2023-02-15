import React from 'react';
import PropTypes from 'prop-types';
import { Box, ImageLoader, Button } from '@bubbles-ui/components';
import prepareAsset from '@leebrary/helpers/prepareAsset';
import useCommonTranslate from '@multilanguage/helpers/useCommonTranslate';
import { ModalMessageStyles } from './ModalMessage.styles';

const ModalMessage = ({ message, onClose }) => {
  const preparedAsset = prepareAsset(message.asset || {});
  const { t: tCommon } = useCommonTranslate('page_header');

  const openLink = () => {
    window.open(message.url, '_blank');
  };

  const stringToHTML = (str) => ({ __html: str });

  const { classes } = ModalMessageStyles({}, { name: 'ModalMessage' });
  return (
    <Box className={classes.root}>
      {message.asset && (
        <Box>
          <ImageLoader src={preparedAsset?.cover} width={'100%'} height={200} />
        </Box>
      )}
      <Box className={classes.title}>{message.internalName}</Box>
      <Box className={classes.message} dangerouslySetInnerHTML={stringToHTML(message.message)} />
      {message.url && (
        <Box className={classes.link}>
          <Button variant="link" onClick={openLink}>
            {message.textUrl}
          </Button>
        </Box>
      )}
      <Box className={classes.buttonRow}>
        <Button onClick={onClose}>{tCommon('close')}</Button>
      </Box>
    </Box>
  );
};

ModalMessage.propTypes = {
  message: PropTypes.object,
  onClose: PropTypes.func,
};

// eslint-disable-next-line import/prefer-default-export
export { ModalMessage };
