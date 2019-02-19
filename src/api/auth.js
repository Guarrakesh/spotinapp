import vars from '../vars';
import { AsyncStorage } from 'react-native';

import FBSDK, {LoginManager, AccessToken} from 'react-native-fbsdk';

/*
 * Sample response from login
 * On Success: {
 "token": {
 "tokenType": "Bearer",
 "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzE1MTYxMTksImlhdCI6MTUzMDkxNjE3OSwic3ViIjoiNWIzY2Q0NDM3ZGY2MTAzOWJhZjdlZGFhIn0.HCN2ZoZDnjhZEI0MlxjTArzboCZ9mFEA83TaeXH7ROs",
 "refreshToken": "5b3cd4437df61039baf7edaa.6d8fffd413b08b7f7959ed87c3f85109817a3737391415a331c4869f908417cb8ca55783b62b331b",
 "expiresIn": "2018-07-13T21:08:39.749Z"
 },
 "user": {
 "id": "5b3cd4437df61039baf7edaa",cons
 "name": "Dario",
 "email": "dario.guarracino2@gmail.com",
 "role": "admin"
 }
 }
 * On Failure: {
 "code": 401,
 "message": "Incorrect email or password"
 }
 **/

const refreshUri = `${vars.apiUrl}/auth/refresh-token`;
const auth = {
  /**
   * Login request, returns promise with "true" when finished
   */
  login(username, password) {
    return new Promise((resolve, reject) => {
      try {
        const config = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Client-Type': 'mobileapp' },
          body: JSON.stringify({ email: username, password: password })

        };
        fetch(`${vars.apiUrl}/auth/login`, config)
            .then(response => {
              response.json().then(data => {
                if (response.status < 200 || response.status >= 300) {
                  return reject({status: response.status, message: data.message});
                }
                Promise.all([
                  auth.setAuthToken(data.token),
                  auth.setUserInfo(data.user)
                ]).then(() =>  resolve(data)).catch((e) => reject(e));

              })
            }).catch(e =>reject(e));
      } catch (err) {
        reject(err);
      }


    });
  },




  check(payload) {
    return new Promise((resolve, reject) => {
    //AsyncStorage.removeItem("ALREADY_SET_FAVORITE");
      Promise.all([auth.getAuthToken(), auth.getUserInfo()]).then(values => {
        const token = values[0];
        const user = values[1];
        if (!token) return reject({status: 401, message: "No auth token"});

        const dateNow = Date.now();
        const tokenExpire = Date.parse(token.expiresIn);

        if (tokenExpire < dateNow) {

          const {email} = user;
          const refreshToken = token.refreshToken;

          if (!email || !refreshToken) return reject("Failed to refresh: no email or token stored");

          auth.refresh(email, refreshToken).then(response => {
            resolve(response);
          }).catch(e => reject(e));

        } else {
          return resolve();
        }
      })
    });

  },

  oAuthLogin(service) {
    return new Promise((resolve, reject) => {
      switch (service) {
        case "facebook": {


          LoginManager.logInWithReadPermissions(['public_profile','email'])
              .then(result => {
                if (result.isCancelled) {
                  return reject({message: "Login annullato dall'utente", hidden: true});
                }
                AccessToken.getCurrentAccessToken().then(accessTokenResponse => {
                  const config = {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({access_token: accessTokenResponse.accessToken})
                  };
                  //Effettuo login con AccessToken
                  const response = fetch(`${vars.apiUrl}/auth/facebook`, config)
                      .then(response => response.json().then(data => {
                        if (response.status < 200 || response.status >= 300) {
                          return reject({status: response.status, message: data.message});
                        };

                        Promise.all([auth.setAuthToken(data.token), auth.setUserInfo(data.user)]).then(() => {
                          resolve(data);
                        })


                      }));
                });
              });



        }
      }

    });


  },
  async error(error) {
    if (401 === error.status || 403 === error.status) {

      return await Promise.reject();
    }
    return await Promise.resolve();



  },

  register(userData) {
    return new Promise((resolve, reject) => {
      const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      };


      fetch(`${vars.apiUrl}/auth/register`, config)
          .then(response => response.json()
              .then(data => {
                if (response.status < 200 || response.status >= 300) {
                  return reject({status: response.status, message: data.message});
                }
                Promise.all([
                  auth.setAuthToken(data.token),
                  auth.setUserInfo(data.user)
                ]).then(() =>  resolve(data)).catch((e) => reject(e));

              })
          ).catch(e => reject(e));
    });
  },
  refresh(username, token) {
    return new Promise((resolve, reject) => {
      const config = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, refreshToken: token })
      };
      try {

        fetch(`${vars.apiUrl}/auth/refresh-token`, config)
            .then(response => response.json().then(data => {

                  if (response.status < 200 || response.status >= 300) {
                    return reject({status: response.status, message: data.message});
                  }
                  auth.setAuthToken(data).then(() => resolve(data));

                })
            );
      } catch (err) {
        reject(err);
      }
    });


  },
  async loggedIn() {
    let token = await AsyncStorage.getItem('token');

    if (!token) return false;

    //Now check if expired
    let dateNow = new Date();
    let dateExpire = Date.parse(token.expiresIn);
    if (dateExpire < dateNow) {
      //Token expired
      return false;
    }
    return true;
  },
  logout() {
    return new Promise((resolve, reject) => {
      Promise.all([auth.removeAuthToken(),auth.removeUserInfo()]).then(() => resolve())
          .catch((e) => reject(e))
    })

  },

  async forgotPassword(email) {
    return new Promise((resolve, reject) => {
      try {
        const config = {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'X-Client-Type': 'mobileapp'},
          body: JSON.stringify({email})
        };
        fetch(`${vars.apiUrl}/auth/forgot-password`, config)
            .then(response => {
              if (response && response.status === 200) resolve(response);
              else reject(response);
            })
            .catch(error => {
              reject(error);
            })
      } catch (error) {
        reject(error);
      }
    });
  },
  async getAuthToken() {
    return JSON.parse(await AsyncStorage.getItem('token'));
  },
  async setAuthToken(token) {
    await AsyncStorage.setItem('token', JSON.stringify(token));
  },
  async setUserInfo(user) {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  },
  async getUserInfo(user) {
    return JSON.parse(await AsyncStorage.getItem('user'));
  },
  async removeAuthToken() {
    await AsyncStorage.removeItem('token');
  },
  async removeUserInfo() {
    await AsyncStorage.removeItem('user');
  }

};

export default auth;
