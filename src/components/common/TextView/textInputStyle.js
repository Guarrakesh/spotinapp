import {scale} from "react-native-size-matters";
import {platformShadow, androidBorder} from "../../../helpers/styleUtils";
import themes from "../../../styleTheme";

import {StyleSheet} from 'react-native';

const colors = themes.base.colors;
const styles = StyleSheet.create({
  inputOuterContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
    ...platformShadow(7),
    elevation: 0, //disattivo su android
    height: 44,
    backgroundColor: '#fff',
    paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
    marginBottom: 16,
    ...androidBorder,
  },
  input: {
    flexBasis: 200,
    flexGrow: 2,
    marginLeft: 12,
    textAlign: 'left',
    borderRadius: 4,
    fontSize: scale(16),
    fontFamily: themes.base.fonts.LatoBlack,
    color: colors.text.default,
    fontWeight: '500',
    justifyContent: 'center',
    minHeight: 44,

  },
  inputIcon : {
    flexBasis: 22,
    flexGrow: 0,
  },
});

export default styles;
