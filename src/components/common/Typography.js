import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, normalize } from 'react-native-elements';
import { StyleSheet } from 'react-native';


import themes, {blackColor} from '../../styleTheme';
//TODO: Da completare
const colors = themes.base.colors;
const fonts = themes.base.fonts;


const Typography = ({
    children,
    align,
    gutterBottom,
    variant,
    color,
    uppercase,
    style,
    block,
    ...props
}) => {
  const fontFamily = ["display3","display2","display1","title"].includes(variant) ? fonts.LatoBlack : fonts.LatoMedium;
  const styles = StyleSheet.flatten([
    {textAlign: align},
    color === "default" ? { color: colors.text.default } : {color: colors[color] ? colors[color].default : colors.text.default },
    gutterBottom && { marginBottom: 12 },
    variant === "display3" && { fontSize: normalize(40) },
    variant === "display2" && { fontSize: normalize(34) },
    variant === "display1" && { fontSize: normalize(28) },
    variant === "title" && { fontSize: normalize(22) },
    variant === "heading" && { fontSize: normalize(18), fontWeight: '900', color: blackColor.default},
    variant === "subheading" && { fontSize: normalize(18)},
    variant === "body" && { fontSize: normalize(14)},
    variant === "caption" && { fontSize: normalize(12)},
      block && { width: '100%', paddingLeft: 16},
    style,
    defaultStyles,
  ]);
  children = typeof children === "string" && uppercase ? children.toUpperCase() : children;
  return (
      <Text
          fontFamily={fontFamily}
          style={styles}
          {...props}>
        {children}
      </Text>
  )
};

const defaultStyles = StyleSheet.create({

});
Typography.defaultProps = {
  align: 'left',
  variant: "default"
};
Typography.propTypes = {
  uppercase: PropTypes.bool,
  children: PropTypes.element,

  variant: PropTypes.oneOf(['heading','subtitle','title','display1','display2','display3', 'body', 'caption']),
  align: PropTypes.oneOf(['center','left','right']),
  color: PropTypes.oneOf(["default", "primary", "warning", "danger", "info"])
};
export default Typography;
