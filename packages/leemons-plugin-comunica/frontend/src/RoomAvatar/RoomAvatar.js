import React from 'react';
import { Box, ImageLoader } from '@bubbles-ui/components';
import PropTypes from 'prop-types';
import { getAssetUrl } from '@leebrary/helpers/prepareAsset';
import { RoomAvatarStyles } from './RoomAvatar.styles';

function RoomAvatar({ room }) {
  const { classes } = RoomAvatarStyles({}, { name: 'RoomAvatar' });
  const avatar = React.useMemo(() => {
    const result = {};
    if (room.image) {
      result.image = (
        <ImageLoader
          className={classes.image}
          src={getAssetUrl(room.image)}
          width={56}
          height={56}
        />
      );
    }
    if (room.icon) {
      result.icon = (
        <ImageLoader
          src={getAssetUrl(room.icon)}
          width={result.image ? 12 : 26}
          height={result.image ? 12 : 26}
        />
      );
    }
    if (room.bgColor) {
      result.color = room.bgColor;
    }
    return result;
  }, [room.icon, room.image, room.bgColor]);

  return (
    <Box className={classes.itemImage}>
      {/* eslint-disable-next-line no-nested-ternary */}
      {avatar.image ? (
        <>
          {avatar.image}
          {avatar.icon ? (
            <Box className={classes.imageIcon} style={{ backgroundColor: avatar.color }}>
              {avatar.icon}
            </Box>
          ) : null}
        </>
      ) : avatar.icon ? (
        <Box style={{ backgroundColor: avatar.color }} className={classes.itemIconContainer}>
          {avatar.icon}
        </Box>
      ) : null}
    </Box>
  );
}

RoomAvatar.propTypes = {
  room: PropTypes.any,
};

export { RoomAvatar };
export default RoomAvatar;
