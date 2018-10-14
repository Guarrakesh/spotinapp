const signup = {
  email: {
    presence: {
      message: "^L'email è obbligatoria"
    },
    email: {
      message: "^Inserisci una email valida"
    },
  },

  password: {
    presence: {
      message: '^Inserisci una password'
    },
    length: {
      minimum: 6,
      maximum: 128,
      tooShort: '^La password deve essere di almeno 6 caratteri',
      tooLong: '^La password non può superare i 128 caratteri'
    }
  },

};

export default signup;