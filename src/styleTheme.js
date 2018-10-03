
import {Dimensions, Platform} from 'react-native';
import {Fonts} from "./components/common/Fonts";


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
        light: '#FFFFFF',
        divisor: '#EEEEEE' //colore per le linee divisorie
      }
    },
    //Si dovrebbero calcolare diversamente su iOS ...
    elevations: {
      depth1: {
        shadowOffset: {height: 1  },
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
        dark: '#424242',
        light: '#FAFAFA'
      },
      white: {
        default: '#FAFAFA',
        light: '#FFFFFF',
        divisor: '#EEEEEE' //colore per le linee divisorie
      },
      danger: {
        default: '#B80638',
        light: '#FF356E',
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

    },
    backgroundColor: '#F6F6F6',
    inlineListTitleStyle: {
      fontWeight: '500',
      textAlign: 'left',
      fontSize: 21,
      padding: 8,
      paddingBottom: 0,
      marginTop: 8,
      color: '#555555'
    },
    listTitleStyle: {
      fontFamily: Fonts.LatoBold,
      textAlign: 'center',
      fontSize: 21,
      padding: 8,
      color: '#555555'
    },

    noContentView: {
      flex :1,
      justifyContent: 'center',
      alignItems: 'center'
    },

    fonts:  {
      Lato: 'Lato-Regular',
      LatoBold: 'Lato-Bold',
      LatoBoldItalic: 'Lato-BoldItalic',
      LatoBlack: 'Lato-Black',
      LatoBlackItalic: 'Lato-BlackItalic',
      LatoHairline: 'Lato-Hairline',
      LatoHairlineItalic: 'Lato-HairlineItalic',
      LatoHeavy: 'Lato-Heavy',
      LatoHeavyItalic: 'Lato-HeavyItalic',
      LatoItalic: 'Lato-Italic',
      LatoLight: 'Lato-Light',
      LatoLightItalic: 'Lato-LightItalic',
      LatoMedium: 'Lato-Medium',
      LatoMediumItalic: 'Lato-MediumItalic',
      LatoSemibold: 'Lato-Semibold',
      LatoSemiboldItalic: 'Lato-SemiboldItalic',
      LatoThin: 'Lato-Thin',
      LatoThinItalic: 'Lato-ThinItalic'
    },

    deviceDimensions: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height
    }

  },


  commonColors: {
    facebook: '#3F51B5'
  },

}


export default themes;
