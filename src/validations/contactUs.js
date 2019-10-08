import i18n from '../i18n/i18n';

const contactUs = {
  email: {
    email: {
      message:`${i18n.t('common.errors.emailNotValid')}`
    },
  },
  emailOrPhone: (value) => {
    if (!(/^[0-9]{5,10}$/).test(value) && !(/^\S+@\S+\.\S+$/).test(value)) {
      // not email nor phone number, give error
      return false;
    }
    return true;
  },

  businessTypes: {
    length: {
      minimum: 1,
      message: `^${i18n.t('browse.noBroadcasts.formErrors.businessTypeRequired')}`
    },

  },


};

export default contactUs;