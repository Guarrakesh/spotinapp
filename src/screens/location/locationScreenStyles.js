import {Platform, StyleSheet} from "react-native";
import themes from "../../styleTheme";
const colors = themes.base.colors;
import signInStyles from '../login/signInFormStyles'; // bruttissimo, ma è per importarmi velocemente gli stili di input

const deviceHeight = themes.base.deviceDimensions.height;
const deviceWidth = themes.base.deviceDimensions.width;
const androidBorder = Platform.OS === "android"
    ? {
      borderWidth: 0,
      borderBottomWidth: 2,
      borderRadius: 0,
      borderColor: '#ddd',
    } : {};


const styles = StyleSheet.create({

  outer: {
    backgroundColor: colors.white.default,
    height: "100%"

  },
  container: {
    //flex: 1,
    flexGrow: 1,
    position: 'relative',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: colors.accent.default,
  },
  header: {
    marginTop: deviceHeight / 10, // 10%
    marginBottom: deviceHeight / 10,
  },
  button: {
    marginTop: 16,
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: '100%',
    padding: 32,
    paddingLeft: 32,
    paddingRight: 32,
    flexGrow: 2,
    alignItems: 'center',
  },
  logo: {
    marginTop: themes.base.deviceDimensions.height/30,
    height: 50,

  },
  mascotte: {
    marginTop: themes.base.deviceDimensions.height/20,
    height: 100,
  },
  title: {
    fontSize: 18,
    fontFamily: themes.base.fonts.LatoBlack,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: themes.base.colors.black.default,
  },
  subtitle: {

    marginTop: 8,
    fontSize: 14,
    fontFamily: themes.base.fonts.LatoMedium,
    color: colors.text.default,
    textAlign: 'center'
  },
  subtitle2: {
    marginTop: 40,
  },
  errorMessage: {
    position: 'absolute',
    bottom: -8,
    fontFamily: themes.base.fonts.LatoBlack,
    color: colors.danger.default,
    flex: 1,
    backgroundColor: 'transparent',
    marginLeft: 8,
    zIndex: 100,
    marginBottom: 8,
  },

  modalView: {
    borderTopRightRadius: themes.base.borderRadius,
    borderTopLeftRadius: themes.base.borderRadius,
    overflow: "hidden"
  },


  triangleCornerLayer: {

    height: 39,
    borderRightWidth: 30,
    borderTopWidth: 39,
    borderTopColor: themes.base.colors.white.light,
    borderRightColor: themes.base.colors.accent.default

  },
  geocodeButton: {
    backgroundColor: themes.base.colors.accent.default,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    paddingLeft: 16,
    paddingRight: 16

  },
  submitButton: {
    marginBottom: 8,
    marginTop: 32,
    width: 150
  },
  inputOuterContainer: {
    width: deviceWidth * 8/10,
    ...signInStyles.inputOuterContainer,
    paddingLeft: 0,
    marginTop: 16,
    shadowOpacity: 0.2,
    borderBottomWidth: 0,
    borderTopWidth: 0,

  },
  input: {
    ...signInStyles.input,
    marginTop: 0,
  },
  listView: {

    borderRadius: themes.base.borderRadius,
    backgroundColor: themes.base.colors.white.light,
    shadowOpacity: 0.2,
    flex: 1,
  },
  listViewItem: {
    borderBottomColor: 'red',
    paddingLeft: 12,
    paddingRight: 12,
  },
  separator: {
    backgroundColor: themes.base.colors.white.divisor,
  },
  confirmBtn: {
    position: 'absolute',
    bottom: '-100%',
    zIndex: 999,
    backgroundColor: themes.base.colors.accent.default,
    height: 48,
    width:48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
  },
  placeAutocompleteContainer: {
    position: 'relative',
    height: 58,
    alignItems: 'center',
    ...androidBorder,
  },
  close: {
    position: 'absolute',
    bottom: 24,
    textDecorationLine: 'underline',

  }
});
export default styles;