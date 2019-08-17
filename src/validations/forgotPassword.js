import i18n from '../i18n/i18n';;
export default {
  email: {
    presence: {
      message: i18n.t("auth.passwordForgot.formError.emailRequired"),
    },
    email: {
      message: i18n.t("auth.passwordForgot.formError.emailNotValid")
    },
  },
};

