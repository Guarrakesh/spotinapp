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
    name: {
        presence: {
            message: "^Inserisci il tuo nome"
        },
        length: {
            minimum: 2,
            max: 128,
            tooShort: '^Il nome deve essere di almeno 2 caratteri',
            tooLong: '^Il nome non può superare i 128 caratteri'
        }
    },
    passwordConfirm: {
        equality: {
            attribute: 'password',
            message: '^Le password non coincidono'
        },

    }

};

export default signup;