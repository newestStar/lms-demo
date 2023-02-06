import { io } from 'socket.io-client';
import { useEffect, useRef } from 'react';
import hooks from 'leemons-hooks';

let socket = null;

export const SocketIoService = {
  connect: (endpoint, config) => {
    socket = io(endpoint, config);
    console.log('Socket.io connected');
    return socket;
  },
  emit: (event, data, callback) => socket.emit(event, data, callback),
  on: (event, callback) => socket.on(event, callback),
  useOn: (_event, callback) => {
    const ref = useRef();
    ref.current = callback;
    const onEvent = ({ args: [{ event, data }] }) => {
      if (_event === event) return ref.current(event, data);
      return null;
    };
    useEffect(() => {
      hooks.addAction('socket.io:onAny', onEvent);
      return () => {
        hooks.removeAction('socket.io:onAny', onEvent);
      };
    }, []);
  },
  onAny: (callback) => socket.onAny(callback),
  useOnAny: (callback) => {
    const ref = useRef();
    ref.current = callback;
    const onEvent = ({ args: [{ event, data }] }) => ref.current(event, data);
    useEffect(() => {
      hooks.addAction('socket.io:onAny', onEvent);
      return () => {
        hooks.removeAction('socket.io:onAny', onEvent);
      };
    }, []);
  },
  disconnect: () => {
    if (socket) {
      socket.disconnect();
      socket = null;
      console.log('Socket.io disconnected');
    }
  },
};

export default SocketIoService;
