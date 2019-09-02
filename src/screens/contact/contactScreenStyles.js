import {normalizeUnits} from "moment";
import {Platform, StyleSheet} from "react-native";
import {Fonts} from "../../components/common/Fonts";
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

  eventContainer: {
    alignItems: 'center',
    marginTop: 32,
    marginBottom: -40,
    width: '100%',
    padding: 16,
  },
  competitionName: {
    fontFamily: Fonts.LatoLight,
    fontSize: 20,
    color: themes.base.colors.text.default
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around'
  },
  eventName: {
    fontFamily: Fonts.LatoBlack,
    fontSize: 21,
    color: themes.base.colors.white.light,
    textTransform: 'uppercase',
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'center'
  },
  eventDate: {
    fontFamily: Fonts.LatoBold,
    fontSize: 14,
    color: themes.base.colors.text.light,
    textAlign: 'center',
  },

  label: {
    marginTop: deviceHeight * 0.03,
    fontSize: 14,
    fontFamily: Fonts.LatoBlack,
    color: colors.black.default,
    textTransform: 'uppercase',
  },
  errorMessage: {
    position: 'absolute',
    bottom: -12,
    marginLeft: 32
  },
  inputOuterContainer: {
    width:'100%',

    backgroundColor: 'transparent',

    maxHeight: 60,
    justifyContent: 'center',
    marginTop: -20,
    marginBottom: 8,
    ...themes.base.elevations.depth1,
    position: 'relative',
  },
  textInputStyle: {
    fontFamily: themes.base.fonts.LatoMedium,
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 100,
    paddingLeft: 16,
    paddingRight: 16,
    margin: 12,
    fontSize: 16,
  },
  distancesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 8
  },
  distanceButton: {
    padding: deviceWidth * 0.04,
    paddingLeft: 4,
    paddingRight: 4,
    flexBasis: deviceWidth / 4 - 24,
    borderRadius: 4,
    backgroundColor: '#fff',
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 30,
    shadowOffset: { width: 3, height: 10 },
    elevation: 7,
  },
  distanceButtonSelected: {
    backgroundColor: colors.accent.default,
  },
  distanceButtonTitle: {
    fontFamily: themes.base.fonts.LatoBlack,
    textAlign: 'center',
    fontSize: 14,
    textTransform: 'uppercase',
    color: colors.black.default,
  },
  distanceButtonSelectedTitle: {
    color: '#fff'
  },
  peopleCard: {
    width: '100%',
    backgroundColor: colors.white.light,
    margin: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: themes.base.borderRadius
  },
  peopleText: {
    flexGrow: 0,
    flexBasis: 32,
    marginLeft: deviceWidth * 0.05,
    fontSize: 18,
    alignSelf: 'center',
    fontFamily: Fonts.LatoBlack,
    color: colors.black.default,
  },
  peopleIcon: {
    position: 'absolute',
    right: 16,
    color: colors.accent.default
  },
  noteCard: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    paddingTop: 8,

    backgroundColor: colors.white.light,
    borderRadius: themes.base.borderRadius,
    justifyContent: 'flex-start',
    width: '90%',
  },
  sendButton: {
    paddingLeft: 48,
    paddingRight: 48,
    borderRadius: 40,
    backgroundColor: colors.white.light,
    borderWidth: 1,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 16
  },
  sendButtonText: {
    fontFamily: Fonts.LatoBold,
    fontSize: 18,
    color: colors.accent.default
  },

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
    marginTop: deviceHeight * 0.05, // 5%

    flexGrow: 1,
  },
  button: {
    marginTop: 16,
  },
  content: {
    marginTop: deviceHeight * 0.05,
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

  title: {
    fontSize: 14,
    fontFamily: themes.base.fonts.LatoMedium,
    textAlign: 'center',
    color: themes.base.colors.black.default,
    marginBottom: deviceHeight * 0.05,
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


  close: {
    position: 'absolute',
    bottom: 24,
    textDecorationLine: 'underline',

  },
});
export default styles;