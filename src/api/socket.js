import io from 'socket.io-client';
import auth from './auth';
import vars from '../vars';

const socketUrl = vars.socketUrl;
let utils;
export const connect = async () => {
  const token = await auth.getAuthToken();
  utils = io(socketUrl, {
    query: { token: token.accessToken }
  });
  return new Promise((resolve) => {
    utils.on('connect', () => {
      resolve(utils);
    });
  });
};

export const disconnect = () => {
  utils = io(socketUrl);
  return new Promise((resolve) => {
    utils.on('disconnect', () => {
      resolve(utils);
    });
  });
};

export const reconnect = () => {
  utils = io(socketUrl);
  return new Promise((resolve) => {
    utils.on('reconnect', () => {
      resolve(utils);
    });
  });
};
