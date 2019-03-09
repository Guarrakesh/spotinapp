import vars from "../vars";
import auth from "./auth";
import ImageResizer from 'react-native-image-resizer';

const uploadPhoto = (userId, photo) => {

  return ImageResizer.createResizedImage(photo.uri, 1200, 1200, 'JPEG', 80)
    .then((response) => {
      console.log("RISPOSTA COMPRESSIONE: ", response);
      return new Promise((resolve, reject) => {

        return auth.getAuthToken().then(token => {
          const config = {
            method: "POST",
            headers: { 'Content-Type': 'multipart/form-data', 'X-Client-Type': 'mobileapp' },
            body: createFormData(response, {
              userId: userId,
              latitude: photo.latitude,
              longitude: photo.longitude,
              height: 1200,
              width: 1200,
              isVertical: photo.isVertical,
              timestamp: photo.timestamp,
              fileSize: response.size
            })
          };

          console.log("TOKEN: ", token);

          if (token) config.headers.Authorization = `Bearer ${token.accessToken}`;

          return fetch(`${vars.apiUrl}/users/${userId}/photo_upload`, config)
            .then(response => {
              response.json().then(data => {

                if(response.status < 200 || response.status >= 300){

                  return reject({status: response.status, message: data.message});
                }
                else {
                  return resolve(response);
                }
              }).catch(e => {
                console.log("ERRORE JSON: ", e);
                return reject(e)
              })
            }).catch(error => {
              console.log("ERRORE FETCH: ", error);
              return reject(error)
            });
        });
      })
    }).catch((err) => {
    console.log("ERRORE COMPRESSIONE", err);
  });

};


const createFormData = (photo, body) => {
  const data = new FormData();

  data.append("photo", {
    name: photo.name,
    type: 'image/jpeg',
    uri: photo.uri

  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};


export default uploadPhoto;
