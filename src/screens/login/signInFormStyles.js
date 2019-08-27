import {StyleSheet, Platform} from "react-native";
import themes from "../../styleTheme";
const colors = themes.base.colors;

const androidBorder = Platform.OS === "android"
  ? {
      borderBottomWidth: 2,
      borderRadius: 0,
      borderColor: '#ddd',
    } : {};
const styles = StyleSheet.create({
  container: {
    width: '100%',

    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 32,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    ...themes.base.elevations.depth2
  },
  title: {
    marginBottom: 24,
    fontWeight: '800',
    fontSize: 18,
    color: colors.text.default,
  },
  errorBox: {
    position: 'absolute',
    width: '100%',
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: themes.base.colors.danger.light,
    minHeight: 40,
    top: 330,
    zIndex: 999,
    borderRadius: 6,

  },
  inputOuterContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
    shadowColor: '#000000',
    shadowOpacity: 0.08,
    shadowRadius: 30,
    shadowOffset: { width: 3, height: 10 },
    height: 44,
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    marginBottom: 16,
    ...androidBorder,
  },
  input: {
    flexBasis: 200,
    flexGrow: 2,
    marginLeft: 12,
    textAlign: 'left',
    borderRadius: 4,
    fontSize: 18,
    color: colors.text.dark,
    fontWeight: '500',
    justifyContent: 'center',
    minHeight: 44,

  },
  inputIcon : {
    flexBasis: 22,
    flexGrow: 0,
  },
  passwordEyeIcon: {
    flexBasis: 30,
    flexGrow: 0,
  },
  focused: {
    shadowColor: themes.base.colors.accent.dark,
    shadowOffset: { width: 1, height: 5 },
    shadowRadius: 15,
  },
  policy: {
    fontSize: 12,
    fontFamily: themes.base.fonts.LatoBold,
    color: colors.text.default,
    marginBottom: 8
  },
  policyAccent: {
    color: colors.accent.default
  },

  modalView: {
    borderTopRightRadius: themes.base.borderRadius,
    borderTopLeftRadius: themes.base.borderRadius,
    overflow: "hidden"
  },
  privacyButton: {
    backgroundColor: themes.base.colors.accent.default,
    padding: 16,
    alignItems: "center",
    borderBottomRightRadius: themes.base.borderRadius,
    borderBottomLeftRadius: themes.base.borderRadius
  },
  privacyButtonText: {
    fontSize: 16,
    fontFamily: themes.base.fonts.LatoBold,
    color: themes.base.colors.white.default
  }
});

export default styles;