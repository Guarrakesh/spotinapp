import firebase from 'react-native-firebase';
// Uso queste nel saga per il problema che yield call() non funzione con funzioni await/async
// Con queste restitusico una Promise, che viene accettata da yield call()
export const getToken =  () => {
  return new Promise(async (resolve, reject) => {
    try {
      const token = await firebase.messaging().getToken();
      resolve(token);
    } catch (error) { reject(error); }
  });
};

export const requestPermissions = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await firebase.messaging().requestPermission();
      resolve();
    } catch (error) { reject(error); }
  })
};

export const hasPermission = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const allowed = await firebase.messaging().hasPermission();
      resolve(allowed);
    } catch (error) { reject(error); }
  })
};

export const getInitialNotification = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const notificationOpen = await firebase.notifications().getInitialNotification();
      resolve(notificationOpen);
    } catch (error) { reject(error); }
  });
};