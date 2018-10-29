import React from 'react';
import PropTypes from 'prop-types';
import { Input as BaseInput } from 'react-native-elements';

import themes from '../../styleTheme';

const colors = themes.base.colors;

// TODO: TextInput comune per tutte le schermate (eccetto ad esempio quelle di Login che hanno i suoi stili)
const Input = ({
    inputOuterContainer,
    textInputStyle,
    errorStyle,
    ...props
}) => {
  return (
      <BaseInput
          inputContainerStyle={[styles.inputOuterContainer, inputOuterContainer]}
          inputStyle={[styles.textInputStyle, textInputStyle]}
          errorStyle={[styles.error,errorStyle]}

          {...props} />
  );
};

Input.propTypes = {
  inputOuterContainer: PropTypes.object,
  textInputStyle: PropTypes.object,
  errorStyle: PropTypes.object
};
const styles = {

  inputOuterContainer: {
    maxHeight: 60,

    paddingBottom: 24,
    paddingTop: 8,
    marginBottom: 8,
    ...themes.base.elevations.depth1,
    position: 'relative',
    borderBottomWidth: 0,
  },
  error: {
    position: 'absolute',
    bottom: -8,
    width: '100%',
    left: 8,

    color: colors.danger.default,
    fontWeight: '500'
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
};

export default Input;