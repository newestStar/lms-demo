import React from 'react';
import {
  ActionButton,
  Box,
  Button,
  CheckBoxGroup,
  Drawer,
  Popover,
  Switch,
  TextInput,
  Title,
  useDebouncedCallback,
} from '@bubbles-ui/components';
import {
  FilterIcon,
  PluginKimIcon,
  PluginSettingsIcon,
  RemoveIcon,
  SearchIcon,
} from '@bubbles-ui/icons/outline';
import PropTypes from 'prop-types';
import { useStore } from '@common';
import useTranslateLoader from '@multilanguage/useTranslateLoader';
import prefixPN from '@comunica/helpers/prefixPN';
import ChatListDrawerItem from '@comunica/components/ChatListDrawerItem/ChatListDrawerItem';
import SocketIoService from '@socket-io/service';
import _ from 'lodash';
import getRoomsByParent from '@comunica/helpers/getRoomsByParent';
import getRoomChildrens from '@comunica/helpers/getRoomChildrens';
import ChatListDrawerIntermediate from '@comunica/components/ChatListDrawerIntermediate/ChatListDrawerIntermediate';
import getTotalUnreadMessages from '@comunica/helpers/getTotalUnreadMessages';
import ChatInfoDrawer from '@comunica/components/ChatInfoDrawer/ChatInfoDrawer';
import { ChatListDrawerStyles } from './ChatListDrawer.styles';
import { RoomService } from '../../RoomService';
import ChatDrawer from '../ChatDrawer/ChatDrawer';

function ChatListDrawer({ opened, onRoomOpened = () => {}, onClose = () => {} }) {
  const debouncedFunction = useDebouncedCallback(100);
  const debouncedFunction2 = useDebouncedCallback(100);
  const { classes } = ChatListDrawerStyles({}, { name: 'ChatListDrawer' });
  const [t] = useTranslateLoader(prefixPN('chatListDrawer'));
  const [store, render] = useStore({ rooms: [], intermediateRooms: [] });

  function onKim() {}

  async function onMutedChanged(muted) {
    await RoomService.saveConfig({ muted });
    store.config.muted = muted;
    render();
  }

  function recalcule() {
    store.rooms = _.orderBy(getRoomsByParent(store.originalRooms), ['attached'], ['asc']);
    store.roomTypes = _.uniq(_.map(store.rooms, 'type'));
    if (store.intermediateRooms?.length) {
      const interm = [];
      _.forEach(store.intermediateRooms, (room) => {
        const r = _.find(store.rooms, { id: room.id });
        interm.push({
          ...r,
          childrens: getRoomChildrens(store.originalRooms, room),
          unreadMessages: getTotalUnreadMessages(room.childrens, store.originalRooms),
        });
      });
      store.intermediateRooms = interm;
    }
    if (store.typeFilters?.length) {
      store.rooms = _.filter(store.rooms, (room) => store.typeFilters.includes(room.type));
    }
    if (store.nameFilter?.length) {
      store.rooms = _.filter(store.rooms, (room) => {
        if (room.name) {
          if (
            t(room.name, room.nameReplaces, false, room.name)
              .toLowerCase()
              .includes(store.nameFilter.toLowerCase())
          ) {
            return true;
          }
        }
        if (room.subName) {
          if (
            t(room.subName, {}, false, room.subName)
              .toLowerCase()
              .includes(store.nameFilter.toLowerCase())
          ) {
            return true;
          }
        }
        return false;
      });
    }
  }

  async function load() {
    store.originalRooms = await RoomService.getRoomsList();
    store.config = await RoomService.getConfig();
    recalcule();
    render();
  }

  function onClickRoom(room) {
    const childrens = getRoomChildrens(store.originalRooms, room);
    if (childrens.length) {
      store.canOpenIntermediateDrawer = false;
      store.intermediateRooms.push({
        ...room,
        childrens,
        unreadMessages: getTotalUnreadMessages(childrens, store.originalRooms),
      });
      render();
      // Esperamos para que se renderize y despues se ponga el opened a true y asi se anime
      setTimeout(() => {
        store.canOpenIntermediateDrawer = true;
        render();
      }, 10);
    } else {
      store.selectedRoom = room;
      onRoomOpened(room);
      render();
    }
  }

  function goBackIntermediateRoom() {
    store.canOpenIntermediateSecondDrawer = false;
    if (store.intermediateRooms.length > 1) {
      store.canOpenIntermediateSecondDrawer = true;
    }
    store.canOpenIntermediateDrawer = false;
    render();
    // Esperamos a borrarlo para que se anime el que se cierra
    setTimeout(() => {
      store.canOpenIntermediateSecondDrawer = false;
      store.intermediateRooms.pop();
    }, 500);
  }

  function closeAll() {
    store.createType = null;
    store.selectedRoom = null;
    store.canOpenIntermediateDrawer = false;
    onRoomOpened(null);
    onClose();
    render();
    // Esperamos a borrarlo para que se anime el que se cierra
    setTimeout(() => {
      store.intermediateRooms = [];
      render();
    }, 300);
  }

  function closeSelectedRoom() {
    store.selectedRoom = null;
    onRoomOpened(null);
    render();
  }

  function onCloseRoom() {
    closeAll();
  }

  function onCloseIntermediate() {
    closeAll();
  }

  function onChangeNameFilter(e) {
    store.nameFilter = e;
    recalcule();
    render();
  }

  function onChangeTypeFilters(e) {
    store.typeFilters = e;
    recalcule();
    render();
  }

  function cleanTypesFilter() {
    store.typeFilters = [];
    recalcule();
    render();
  }

  function hideCreate() {
    store.createType = null;
    render();
  }

  function closeCreate() {
    closeAll();
  }

  function newChat() {
    store.createType = 'chat';
    render();
  }

  function newGroup() {
    store.createType = 'group';
    render();
  }

  React.useEffect(() => {
    load();
  }, []);

  SocketIoService.useOnAny((event, data) => {
    if (event === 'COMUNICA:ROOM:ADDED') {
      debouncedFunction(load);
      return;
    }
    if (event === 'COMUNICA:ROOM:USER_ADDED') {
      const index = _.findIndex(store.originalRooms, { key: data.key });
      if (index >= 0) {
        const i = _.findIndex(
          store.originalRooms[index].userAgents,
          (item) => item.userAgent.id === data.userAgent.userAgent.id
        );
        if (i >= 1) {
          store.originalRooms[index].userAgents[i] = data.userAgent;
        } else {
          store.originalRooms[index].userAgents.push(data.userAgent);
        }
        debouncedFunction2(() => {
          recalcule();
          render();
        });
      }
      return;
    }
    if (event === 'COMUNICA:CONFIG:ROOM') {
      const index = _.findIndex(store.originalRooms, { key: data.room });
      if (index >= 0) {
        store.originalRooms[index].muted = !!data.muted;
        store.originalRooms[index].attached = data.attached;
        recalcule();
        render();
      }
      return;
    }
    if (event === 'COMUNICA:ROOM:REMOVE') {
      const index = _.findIndex(store.originalRooms, { key: data.key });
      if (index >= 0) {
        store.originalRooms.splice(index, 1);
        recalcule();
        render();
      }
      return;
    }
    if (event === 'COMUNICA:ROOM:USERS_REMOVED') {
      const index = _.findIndex(store.originalRooms, { key: data.room });
      if (index >= 0) {
        store.originalRooms[index].userAgents = _.map(
          store.originalRooms[index].userAgents,
          (item) => {
            let { deleted } = item;
            if (data.userAgents.includes(item.userAgent.id)) deleted = true;
            return {
              ...item,
              deleted,
            };
          }
        );
        recalcule();
        render();
      }
      return;
    }
    if (event === 'COMUNICA:ROOM:UPDATE:NAME') {
      const index = _.findIndex(store.originalRooms, { key: data.key });
      if (index >= 0) {
        store.originalRooms[index].name = data.name;
        recalcule();
        render();
      }
      return;
    }
    if (event === 'COMUNICA:ROOM:UPDATE:IMAGE') {
      const index = _.findIndex(store.originalRooms, { key: data.key });
      if (index >= 0) {
        store.originalRooms[index].image = data.image;
        if (!store.originalRooms[index].imageSeed) store.originalRooms[index].imageSeed = 0;
        store.originalRooms[index].imageSeed++;
        recalcule();
        render();
      }
      return;
    }
    _.forEach(store.originalRooms, (room, index) => {
      if (`COMUNICA:ROOM:${room.key}` === event) {
        store.originalRooms[index].unreadMessages += 1;
        recalcule();
        render();
        return false;
      }
      if (`COMUNICA:ROOM:READED:${room.key}` === event) {
        store.originalRooms[index].unreadMessages = 0;
        recalcule();
        render();
        return false;
      }
    });
  });

  return (
    <>
      <Drawer
        opened={
          opened &&
          !store.selectedRoom &&
          (!store.intermediateRooms.length ||
            (!store.canOpenIntermediateSecondDrawer &&
              !store.canOpenIntermediateDrawer &&
              store.intermediateRooms.length))
        }
        size={430}
        close={false}
        empty
      >
        <Box className={classes.wrapper}>
          <Box className={classes.header}>
            <ActionButton onClick={onKim} icon={<PluginKimIcon width={16} height={16} />} />
            <Box className={classes.headerRight}>
              <Switch label={t('focus')} checked={store.config?.muted} onChange={onMutedChanged} />
              <Popover
                target={
                  <ActionButton
                    onClick={onClose}
                    icon={<PluginSettingsIcon width={16} height={16} />}
                  />
                }
              >
                <Box className={classes.config}>
                  <Button onClick={newChat} fullWidth variant="light" color="secondary">
                    {t('newChat')}
                  </Button>
                  <Button onClick={newGroup} fullWidth variant="light" color="secondary">
                    {t('newGroup')}
                  </Button>
                </Box>
              </Popover>
              <ActionButton onClick={onClose} icon={<RemoveIcon width={16} height={16} />} />
            </Box>
          </Box>
          <Box className={classes.title}>
            <Title order={3}>{t('myConversations')}</Title>
          </Box>
          <Box className={classes.input}>
            <TextInput
              value={store.nameFilter}
              onChange={onChangeNameFilter}
              placeholder={t('search')}
              icon={<SearchIcon width={16} height={16} />}
              rightSection={
                store.roomTypes ? (
                  <Popover target={<ActionButton icon={<FilterIcon width={16} height={16} />} />}>
                    <Box className={classes.filterContainer}>
                      <CheckBoxGroup
                        orientation="vertical"
                        direction="column"
                        onChange={onChangeTypeFilters}
                        data={store.roomTypes.map((type) => ({
                          label: t(type.replace(/\./g, '_')),
                          value: type,
                          checked: store.typeFilters?.includes(type),
                        }))}
                      />
                    </Box>
                    <Box className={classes.filterClean}>
                      <Button onClick={cleanTypesFilter} fullWidth size="sm">
                        {t('clean')}
                      </Button>
                    </Box>
                  </Popover>
                ) : null
              }
            />
          </Box>
          <Box className={classes.listItems}>
            {store.rooms.map((room) => (
              <ChatListDrawerItem
                key={room.id}
                t={t}
                room={room}
                onClick={() => onClickRoom(room)}
              />
            ))}
          </Box>
        </Box>
      </Drawer>

      {store.intermediateRooms.map((room, index) => {
        let open = store.intermediateRooms.length - 1 === index;
        if (!store.canOpenIntermediateDrawer) {
          open = false;
        }
        if (store.canOpenIntermediateSecondDrawer) {
          open = store.intermediateRooms.length - 2 === index;
        }
        return (
          <ChatListDrawerIntermediate
            key={room.id}
            room={room}
            t={t}
            opened={open && !store.selectedRoom}
            onClickRoom={onClickRoom}
            onReturn={goBackIntermediateRoom}
            onClose={onCloseIntermediate}
          />
        );
      })}
      <ChatDrawer
        onClose={onCloseRoom}
        onReturn={closeSelectedRoom}
        room={store.selectedRoom?.key}
        opened={!!store.selectedRoom}
      />
      <ChatInfoDrawer
        opened={store.createType === 'group'}
        onReturn={hideCreate}
        onClose={closeCreate}
      />
    </>
  );
}

ChatListDrawer.propTypes = {
  opened: PropTypes.bool,
  onClose: PropTypes.func,
  onRoomOpened: PropTypes.func,
};

export { ChatListDrawer };
export default ChatListDrawer;
