import i18n from '../i18n/i18n';

const signup = {
    email: {
        presence: {
            message: i18n.t('auth.register.formError.emailRequired')
        },
        email: {
            message:i18n.t('auth.register.formError.emailNotValid')
        },
    },

    password: {
        presence: {
            message: i18n.t('auth.register.formError.passwordRequired')
        },
        length: {
            minimum: 6,
            maximum: 128,
            tooShort: i18n.t('auth.register.formError.passwordLengthMin'),
            tooLong: i18n.t('auth.register.formError.passwordLengthMax')
        }
    },
    name: {
        presence: {
            message:i18n.t('auth.register.formError.nameRequired')
        },
        length: {
            minimum: 2,
            max: 128,
            tooShort: i18n.t('auth.register.formError.nameLengthMin'),
            tooLong: i18n.t('auth.register.formError.nameLengthMax')
        }
    },


};

export default signup;