import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Input as BaseInput } from 'react-native-elements';

import themes from '../../styleTheme';

const colors = themes.base.colors;

// TODO: TextInput comune per tutte le schermate (eccetto ad esempio quelle di Login che hanno i suoi stili)
class Input extends React.Component {
  focus() {
    this.input.focus();
  }
  blur() {
    this.input.blur();
  }
  clear() {
    this.input.clear();
  }
  isFocused() {
    return this.input.isFocused();
  }
  render() {

    const {
        containerStyle,
        inputOuterContainer,
        textInputStyle,
        errorStyle,
        block,
        ...props
    } = this.props;

    const _inputContainerStyle = StyleSheet.flatten([
      styles.inputOuterContainer,
      inputOuterContainer,
    ]);
    const _containerStyle = StyleSheet.flatten([
      containerStyle,
      block && { width: '100%'}
    ]);
    return (
        <BaseInput
            ref={ref => this.input = ref}
            containerStyle={_containerStyle}
            inputContainerStyle={_inputContainerStyle}
            inputStyle={[styles.textInputStyle, textInputStyle]}
            errorStyle={[styles.error,errorStyle]}

            {...props} />
    );
  };

}

Input.propTypes = {
  containerStyle: PropTypes.object,
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
    borderRadius: 4,
    paddingLeft: 16,
    paddingRight: 16,
    margin: 12,
    fontSize: 16,
  },
};

export default Input;