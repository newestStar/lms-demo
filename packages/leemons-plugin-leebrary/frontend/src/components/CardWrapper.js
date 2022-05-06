import React from 'react';
import { isNil, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { Box, createStyles } from '@bubbles-ui/components';
import { LibraryCard } from '@bubbles-ui/leemons';
import loadable from '@loadable/component';
import { prepareAsset } from '../helpers/prepareAsset';

function dynamicImport(pluginName, component) {
  return loadable(() =>
    import(`@leemons/plugins/${pluginName.split('.')[1]}/src/widgets/leebrary/${component}.js`)
  );
}

const CardWrapperStyles = createStyles((theme, { selected }) => ({
  root: {
    cursor: 'pointer',
    borderColor: selected && theme.colors.interactive01d,
    borderWidth: selected && '1px',
    boxShadow: selected && theme.shadows.shadow03,
  },
}));

const CardWrapper = ({
  key,
  item,
  headers,
  selected,
  className,
  variant = 'media',
  category,
  isEmbedded,
  ...props
}) => {
  const asset = !isEmpty(item?.original) ? prepareAsset(item.original) : {};
  const menuItems = [];
  const { classes } = CardWrapperStyles({ selected });

  let Component = LibraryCard;

  if (category?.listCardComponent && category?.pluginOwner) {
    try {
      Component = dynamicImport(
        item?.providerData?.componentOwner ||
          item?.original?.providerData?.componentOwner ||
          category?.pluginOwner,
        category?.listCardComponent
      );
    } catch (e) {
      //
    }
  }

  return !isNil(category) && !isEmpty(asset) ? (
    <Box key={key} {...props}>
      <Component
        asset={asset}
        menuItems={menuItems}
        variant={variant}
        className={classes.root}
        embedded={isEmbedded}
      />
    </Box>
  ) : null;
};

CardWrapper.propTypes = {
  key: PropTypes.string,
  item: PropTypes.any,
  headers: PropTypes.any,
  selected: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  category: PropTypes.any,
  isEmbedded: PropTypes.bool,
};

export { CardWrapper };
export default CardWrapper;
