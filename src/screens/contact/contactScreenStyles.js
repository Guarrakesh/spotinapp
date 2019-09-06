import { scale, verticalScale } from "react-native-size-matters";
import {Platform, StyleSheet} from "react-native";
import {Fonts} from "../../components/common/Fonts";
import {platformShadow} from "../../helpers/styleUtils";
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
  input: {
    ...signInStyles.input,
    fontSize: scale(14)
  },

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
    fontSize: scale(21),
    paddingLeft: scale(16),
    paddingRight: scale(16),
    color: themes.base.colors.white.light,
    textTransform: 'uppercase',
    marginTop: 8,
    marginBottom: scale(8),
    textAlign: 'center'
  },

  eventDate: {
    fontFamily: Fonts.LatoBold,
    fontSize: 14,
    color: themes.base.colors.text.light,
    textAlign: 'center',
  },

  label: {
    marginTop: deviceHeight > 680 ? verticalScale(24) : verticalScale(7),
    fontSize: scale(14),
    fontFamily: Fonts.LatoBlack,
    color: colors.text.default,
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  errorMessage: {
    position: 'absolute',
    bottom: -12,
    marginLeft: 32
  },
  inputOuterContainer: {
    ...signInStyles.inputOuterContainer,
    height: 52,
    marginTop: 16,
  },
  textInputStyle: {
    fontFamily: themes.base.fonts.LatoMedium,
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 100,
    paddingLeft: 16,
    paddingRight: 16,
    margin: scale(12),
    fontSize: scale(16),
  },
  distancesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
  distanceButton: {
    paddingLeft: scale(4),
    paddingRight: scale(4),
    marginHorizontal: scale(8),

  },
  selectableButton: {
    padding: verticalScale(10),
    paddingLeft: scale(8),
    paddingRight: scale(8),

    borderRadius: 4,
    backgroundColor: '#fff',
    ...platformShadow(7),
  },
  selectableButtonSelected: {
    backgroundColor: colors.accent.default,
  },
  selectableButtonTitle: {
    fontFamily: themes.base.fonts.LatoBlack,
    textAlign: 'center',
    fontSize: scale(14),
    textTransform: 'uppercase',
    color: colors.black.default,
  },
  selectableButtonSelectedTitle: {
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
    position: 'relative',
    flex: 1,
    height: '100%',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: colors.accent.default,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 16,
  },
  content: {
    marginTop: verticalScale(24),
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    width: '100%',
    paddingLeft: scale(32),
    paddingRight: scale(32),
    flex: 6,
    paddingTop: verticalScale(16),
    paddingBottom: verticalScale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },

  title: {
    fontSize: deviceHeight > 680 ? scale(17) : scale(14),
    fontFamily: themes.base.fonts.LatoMedium,
    textAlign: 'center',
    color: themes.base.colors.text.default,
    marginBottom: verticalScale(8),
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
  businessTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  businessTypeButton: {
    marginHorizontal: scale(8),
    marginBottom: verticalScale(8),
  },
  // errorMessage: {
  //   position: 'absolute',
  //   bottom: -8,
  //   fontFamily: themes.base.fonts.LatoBlack,
  //   color: colors.danger.default,
  //   flex: 1,
  //   backgroundColor: 'transparent',
  //   marginLeft: 8,
  //   zIndex: 100,
  //   marginBottom: 8,
  // },

  // modalView: {
  //   borderTopRightRadius: themes.base.borderRadius,
  //   borderTopLeftRadius: themes.base.borderRadius,
  //   overflow: "hidden"
  // },
  iosCloseBtn: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: scale(24),


  },
  continueButton: {
    alignSelf: 'center',
    marginTop: verticalScale(8),
  },
  sendButton: {
    alignSelf: 'center',
    marginTop: verticalScale(40)
  },
  close: {
    position: 'absolute',
    bottom: 24,
    textDecorationLine: 'underline',

  },

  doneContainer: {
    alignItems: 'center',
    paddingHorizontal: scale(32),
    flex: 6,
    top: deviceHeight / 3 - scale(32),
    left: 0,
    right: 0,
    position: 'absolute',
  },
  doneTitle: {

    fontFamily: Fonts.LatoBlack,
    fontSize: scale(21),
    paddingLeft: scale(16),
    paddingRight: scale(16),
    color: themes.base.colors.white.light,
    textTransform: 'uppercase',
    marginTop: 8,
    marginBottom: scale(8),
    textAlign: 'center'


  },
  doneText: {
    color: themes.base.colors.white.default,
  }
});
export default styles;