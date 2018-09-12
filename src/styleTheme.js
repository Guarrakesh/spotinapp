
import { Platform } from 'react-native';


const themes = {
    old: {
        borderRadius: 8,
        colors: {

            primary: {
                default: '#B2FF59',
                light: '#B2FF59',
                dark: '#51BD60'
            },
            accent: {
                default: '#B47CFF',
                light: '#B47CFF',
                dark: '#3F1DCB'
            },
            text: {
                default: '#555555',
                dark: '#424242',
                light: '#FAFAFA'
            },
            white: {
                default: '#FAFAFA',
                light: '#FFFFFF'
            }
        },
        //Si dovrebbero calcolare diversamente su iOS ...
        elevations: {
            depth1: {
                shadowOffset: {height: 1},
                shadowRadius: 3,
                shadowOpacity: 0.12,
            },
            depth2: {
                shadowOffset: {height: 3},
                shadowRadius: 6,
                shadowOpacity: 0.16,
            },
            depth3: {
                shadowOffset: {height: 10},
                shadowRadius: 20,
                shadowOpacity: 0.19,
            },
            depth4: {
                shadowOffset: {height: 14},
                shadowRadius: 28,
                shadowOpacity: 0.25,
            },
            depth5: {
                shadowOffset: {height: 19},
                shadowRadius: 38,
                shadowOpacity: 0.30,
            },

        }
    },
    base: {
        borderRadius: 8,
        colors: {

            primary: {
                default: '#B2FF59',
                light: '#E7FF8C',
                dark: '#7ECB20'
            },
            accent: {
                default: '#7C4DFF',
                light: '#B47CFF',
                dark: '#3F1DCB'
            },
            text: {
                default: '#555555',
                dark: '#424242'
            },
            white: {
                default: '#FAFAFA',
                light: '#FFFFFF'
            }

        },
        elevations: {
            depth1: {
                shadowOffset: {height: 1},
                shadowRadius: 3,
                shadowOpacity: 0.12,
            },
            depth2: {
                shadowOffset: {height: 3},
                shadowRadius: 6,
                shadowOpacity: 0.16,
            },
            depth3: {
                shadowOffset: {height: 10},
                shadowRadius: 20,
                shadowOpacity: 0.19,
            },
            depth4: {
                shadowOffset: {height: 14},
                shadowRadius: 28,
                shadowOpacity: 0.25,
            },
            depth5: {
                shadowOffset: {height: 19},
                shadowRadius: 38,
                shadowOpacity: 0.30,
            },

        }

    },


    commonColors: {
        facebook: '#3F51B5'
    },

}


export default themes;