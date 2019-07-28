import i18n from '../i18n/i18n';

const signup = {
  email: {
    presence: {
      message: i18n.t('auth.login.formError.emailRequired'),
    },
    // email: {
    //   message: "^Inserisci una email valida"
    // },
  },

  password: {
    presence: {
      message: i18n.t('auth.login.formError.passwordRequired'),
    },
    // length: {
    //   minimum: 6,
    //   maximum: 128,
    //   tooShort: '^La password deve essere di almeno 6 caratteri',
    //   tooLong: '^La password non può superare i 128 caratteri'
    // }
  },

};

export default signup;