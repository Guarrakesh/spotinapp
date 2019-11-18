
import {Dimensions, Platform} from 'react-native';
import {Fonts} from "./components/common/Fonts";

export const purpleColor = {
  light: '#7C4DFF',
  extraLight: '#B47CFF',
  default: '#6514BF',
  dark: '#3F18AF',
};
export const primaryColor = {
  default: '#3498db',
  light: '#3498db',
  dark: '#2980b9'
};
export const accentColor = {
  default: '#1abc9c',
  light: '#16a085',
  dark: '#16a085'
};
export const textColor = {
  default: '#ecf0f1',
  dark: '#ecf0f1',
  light: '#ffffff'
};
export const whiteColor = {
  default: '#FAFAFA',
  light: '#FFFFFF',
  divisor: '#EEEEEE' //colore per le linee divisorie
};
export const dangerColor = {
  default: '#B80638',
  light: '#FF356E',
};
export const warningColor = {
  default: '#F79F1F',
  light: '#F79F1F',
};
export const infoColor = {
  default: '#12CBC4',
  light: '#12CBC4'
};
export const blackColor = {
  default: "#000000"
};
export const yellowColor = {
  default: "#F4D35E"
};

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
      },
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

      primary: primaryColor,
      accent: accentColor,
      text: textColor,
      white: whiteColor,
      danger: dangerColor,
      info: infoColor,
      warning: warningColor,
      activityIndicator: accentColor,
      black: blackColor,
      purple: purpleColor,
      yellow: yellowColor
    },
    elevations: {
      depth1: {
        shadowOffset: {height: 1},
        shadowRadius: 1,
        shadowOpacity: 0.05,
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
    inputPlaceholderColor: 'rgba(66,66,66,.26)',
    backgroundColor: '#F6F6F6',
    inlineListTitleStyle: {
      fontFamily: Fonts.LatoBold,
      textAlign: 'left',
      fontSize: 21,
      paddingLeft: 8,
      paddingBottom: 0,
      marginTop: 8,
      color: '#555555'
    },
    listTitleStyle: {

      padding: 8,

    },

    noContentView: {
      flex :1,
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center'
    },

    noContentText: {
      fontFamily: 'Lato-Medium',
      fontSize: 18
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
    },


    searchBar: {
      container: {
        backgroundColor: 'white',
        borderBottomWidth: 0,
        elevation: 3,

        shadowOffset: {height: 10},
        shadowRadius: 20,
        shadowOpacity: 0.19,
      },
      inputContainer: {
        backgroundColor: 'transparent',

      },
      inputStyle: {
        fontSize: 17,
        color: '#555555',
        fontFamily:'Lato-Medium',

      }
    },



  },


  commonColors: {
    facebook: '#3F51B5'
  },

};


export default themes;
