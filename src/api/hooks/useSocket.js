import React from 'react';
import { connect, disconnect } from '../socket';

export const useSocket = () => {
  const [socket, setSocket] = React.useState(null);

  const connectSocket = async () => {
    const socket = await connect();
    setSocket(socket);
  };
  React.useEffect(() => {
    connectSocket();
    return () => disconnect();
  }, []);

  return { socket, connected: !!socket };
};
