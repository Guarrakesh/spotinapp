import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native-elements';
import { StyleSheet } from 'react-native';


import themes from '../../styleTheme';
//TODO: Da completare
const colors = themes.base.colors;
const fonts = themes.base.fonts;
const Typography = ({
    children,
    align,
    gutterBottom,
    variant,
    ...props
}) => {
  const fontFamily = (props.h1 || props.h2 || props.h3 || props.h4) ? fonts.LatoBlack : fonts.LatoMedium;
  const styles = StyleSheet.flatten([
    {textAlign: align},
    variant === "default" ? { color: colors.text.default } : {color: colors[variant] ? colors[variant].default : colors.text.default },
    gutterBottom && { marginBottom: 12 },
  ]);
  return (
      <Text
          fontFamily={fontFamily}
          style={styles}
          {...props}>
        {children}
      </Text>
  )
};
Typography.defaultProps = {
  align: 'left',
  variant: "default"
};
Typography.propTypes = {
  children: PropTypes.element,
  h1: PropTypes.bool,
  h2: PropTypes.bool,
  h3: PropTypes.bool,
  h4: PropTypes.bool,
  align: PropTypes.oneOf(['center','left','right']),
  variant: PropTypes.oneOf(["default", "primary", "warning", "danger", "info"])
};
export default Typography;
