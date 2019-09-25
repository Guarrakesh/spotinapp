import vars from '../vars';

const coupon = {

  async useCoupon(code, token) {
    return new Promise((resolve, reject) => {
      try {
        const config = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'X-Client-Type': 'mobileapp' },
          body: JSON.stringify({ code })
        };
        if (token){
          config.headers.Authorization = `Bearer ${token.accessToken}`;
        }
        else {
          return reject("Non hai effettuato il login"); //TODO: GESTIRE CHIAMATE NON AUTENTICATE
        }
        fetch(`${vars.apiUrl}/coupon/use`, config)
          .then(response => {

            response.json().then(data => {

              if (response.status < 200 || response.status >= 300) {
                return reject({status: response.status, message: data.message});
              }
              else {
                return resolve(data);
              }
            })
          }).catch(e => reject(e));
      } catch (err) {
        reject(err);
      }
    })
  }
};

export default coupon;