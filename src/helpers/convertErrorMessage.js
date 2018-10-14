export const ERROR_TYPE_FATAL = 'ERROR_TYPE_FATAL';
export const ERROR_TYPE_NO_INTERNET = 'ERROR_TYPE_NO_INTERNET';
export const ERROR_TYPE_UNKNOWN = 'ERROR_TYPE_UNKNOWN';




export default (e) => {
  let error = {};
  if (e.status) {
    switch (e.status) {

      default: {
        error = {
          type: 'error',
          errorType: ERROR_TYPE_UNKNOWN,
          title: "Ops...",
          message: "Non abbiamo idea di cosa sia successo, ma proveremo a risolverlo. Riprova più tardi"}
      }
    }

  } else {
    error = {
      type: 'error',
      errorType: ERROR_TYPE_UNKNOWN,
      title: "Ops...",
      message: "Non abbiamo idea di cosa sia successo, ma proveremo a risolverlo. Riprova più tardi"
    };
  }

  return error;
};

