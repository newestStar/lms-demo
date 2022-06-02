import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Box,
  Button,
  createStyles,
  useResizeObserver,
  useViewportSize,
} from '@bubbles-ui/components';
import { LibraryCard } from '@bubbles-ui/leemons';
import { AssetListDrawer } from '@leebrary/components';
import { uniqBy, map } from 'lodash';
import prepareAsset from '@leebrary/helpers/prepareAsset';
import { DeleteBinIcon } from '@bubbles-ui/icons/solid';
import getAssetsByIds from '@leebrary/request/getAssetsByIds';
import { listCategoriesRequest } from '@leebrary/request';
import { useApi } from '@common';

const styles = createStyles((theme) => ({
  attachmentContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing[5],
  },
}));

function useListCategories() {
  const [categories] = useApi(listCategoriesRequest);

  return useMemo(() => {
    if (!categories.length) {
      return [];
    }
    const desiredCategories = ['bookmarks', 'media-files'];
    return categories.filter((category) => desiredCategories.includes(category.key));
  }, [categories]);
}

export default function Attachments({ labels }) {
  const categories = useListCategories();
  /*
    --- Drawer state ---
  */
  const [assetType, setAssetType] = useState('');
  const [showAssetDrawer, setShowAssetDrawer] = useState(false);
  const onDrawerClose = useCallback(() => setShowAssetDrawer(false), [setShowAssetDrawer]);
  const toggleDrawer = useCallback(
    () => setShowAssetDrawer((showDrawer) => !showDrawer),
    [setShowAssetDrawer]
  );
  /*
    --- Sizings ---
  */
  const { width: viewportWidth } = useViewportSize();
  const [boxRef, rect] = useResizeObserver();
  const drawerSize = useMemo(
    () => Math.max(viewportWidth - rect.width - 370, 500),
    [viewportWidth, rect]
  );

  /*
    --- Form ---
  */
  const { control, setValue, getValues } = useFormContext();

  /*
    --- Resources state ---
  */
  const [resources, setResources] = useState([]);
  useEffect(async () => {
    const formResources = getValues('resources');
    if (formResources?.length) {
      const assets = await getAssetsByIds(formResources, { public: true });
      const preparedAssets = assets?.assets?.map(prepareAsset);
      if (preparedAssets?.length) {
        setResources(preparedAssets);
      }
    }
  }, []);

  /*
    --- Styles ---
  */
  const { classes } = styles();

  const onAssetSelect = useCallback(
    (asset) => {
      let newResources;
      setResources((currentResources) => {
        newResources = uniqBy([...currentResources, prepareAsset(asset)], 'id');

        return newResources;
      });
      onDrawerClose();
      setValue('resources', map(newResources, 'id'), {
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [setResources]
  );

  const onAssetRemove = useCallback(
    (asset) => {
      let newResources;
      setResources((currentResources) => {
        newResources = currentResources.filter((resource) => resource.id !== asset.id);
        return newResources;
      });
      setValue('resources', map(newResources, 'id'), { shouldDirty: true, shouldTouch: true });
    },

    [setResources]
  );

  /*
    --- Render ---
  */

  return (
    <>
      <Box className={classes?.attachmentContainer}>
        {resources.map((asset) => (
          <LibraryCard
            asset={asset}
            key={asset.id}
            menuItems={[
              {
                icon: <DeleteBinIcon />,
                children: 'Delete',
                onClick: () => onAssetRemove(asset),
              },
            ]}
          />
        ))}
      </Box>
      <Box ref={boxRef}>
        <form
          onSubmit={(e) => {
            // EN: Added to prevent the event from bubbling up to the parent form
            // ES: Añadido para evitar que el evento se propague hacia arriba del formulario
            if (typeof e.preventDefault === 'function') {
              e.preventDefault();
            }

            if (typeof e.stopPropagation === 'function') {
              e.stopPropagation();
            }
          }}
        >
          <Button onClick={toggleDrawer}>{labels?.searchFromLibrary}</Button>
          <AssetListDrawer
            opened={showAssetDrawer}
            creatable
            size={drawerSize}
            shadow={drawerSize <= 500}
            assetType={assetType}
            canChangeType
            onTypeChange={setAssetType}
            onSelect={onAssetSelect}
            onClose={onDrawerClose}
            categories={categories}
          />
        </form>
      </Box>
    </>
  );
}
