import React from 'react';
import { TextInput as BaseTextInput, View} from "react-native";
import styles from './textInputStyle';
import PropTypes from 'prop-types';
import themes from "../../../styleTheme";


const TextInput = React.forwardRef((props, ref) => {
  const { append, prepend, icon, hasError, containerStyle, style, errorMessage, ...rest} = props;
  return (
      <View style={[
        styles.inputOuterContainer,
        hasError ? { borderColor: themes.base.colors.danger.light, borderWidth: 1 } : {},
        containerStyle,
      ]}>
        {prepend}
        {icon && React.cloneElement(icon, {
          style: styles.inputIcon,
        })}
        <BaseTextInput
            style={[style, styles.input]}
            ref={ref}
            allowFontScaling
            placeholderTextColor={themes.base.inputPlaceholderColor}
            {...rest}
        />
        {hasError ?  errorMessage : null}
        {append}
      </View>
  )

});

TextInput.defaultProps = {
  append: null,
  prepend: null,
  errorMessage: null,
};

TextInput.propTypes = {
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  icon: PropTypes.element,
  append: PropTypes.element,
  prepend: PropTypes.element,
};
export default TextInput;
