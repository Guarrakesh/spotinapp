import i18n from '../i18n/i18n';

const contactUs = {
  email: {
    email: {
      message:`${i18n.t('common.errors.emailNotValid')}`
    },
  },

  maxDistance: {
    presence: {
      minimum: 1,
      message: `^${i18n.t('browse.noBroadcasts.formErrors.maxDistanceRequired')}`
    },

  },
  businessTypes: {
    length: {
      minimum: 1,
      message: `^${i18n.t('browse.noBroadcasts.formErrors.businessTypeRequired')}`
    },

  },


};

export default contactUs;