
import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet } from 'react-native';
import { Button as BaseButton } from 'react-native-elements'

import themes, { accentColor, dangerColor, infoColor, primaryColor, textColor, whiteColor, warningColor } from '../../styleTheme';
const fonts = themes.base.fonts;

export default class Button extends React.Component {


  render() {

    const { clear, variant, round, buttonStyle, titleStyle, uppercase, children
        , loadingProps, loadingStyle, block, containerStyle, elevation, titleProps,...props} = this.props;

    //TODO tutta la roba dell'ombra e dei ripple

    const _style = StyleSheet.flatten([
      clear ? { backgroundColor: 'transparent', elevation: 0} : {backgroundColor: 'transparent', elevation: 0},
      styles.base,
      styles.round,
      buttonStyle,

    ]);
    const _containerStyle = StyleSheet.flatten([
      clear ? { } : styles[variant],

      round || clear ? styles.round : {},
      block ? { width: '100%' } : { width: 150 },
      !clear && { elevation, ...themes.base.elevations[`depth${elevation}`] },

      styles.container,
      containerStyle
    ]);
    const _titleBaseStyle = [
      styles.titleBase,
      clear ? styles[`${variant}Simple`] : { color: styles[variant].color },
      uppercase && {fontFamily: fonts.LatoBold},
      titleStyle,

    ];
    const _loadingProps = [{
      size: uppercase ? "large" : "small",
      color: clear ? themes.base.colors[variant] : "#fff",
    }, loadingProps];
    return (
        <BaseButton
            containerStyle={_containerStyle}
            activeOpacity={0.2}
            buttonStyle={_style}
            titleProps={{
              numberOfLines: 1,
              ...titleProps
            }}
            titleStyle={_titleBaseStyle}
            title={typeof children === "string"  && uppercase ? children.toUpperCase() : children}
            loadingStyle={[{fontSize: styles.titleBase.fontSize, padding: 8}, loadingStyle]}
            loadingProps={_loadingProps}
            {...props}
        />
    )

  }

}

Button.defaultProps = {
  variant: 'default',
  elevation: 1,
};
Button.propTypes = {
  uppercase: PropTypes.bool,
  variant: PropTypes.string,
  clear: PropTypes.bool,
};

const styles = StyleSheet.create({

  container: {
    marginBottom: 8,
  },
  base: {
    width: '100%',
    fontFamily: 'Lato-Medium',
    color: '#555',

  },
  titleBase: {
    fontSize: 14,
    fontFamily: 'Lato-Medium',
    color: '#fff'
  },
  default: {
    backgroundColor: whiteColor.default,
    color: textColor.default
  },
  defaultSimple: {
    backgroundColor: 'transparent',
    color: textColor.default
  },
  primary: {
    backgroundColor: accentColor.default,
    color: whiteColor.default,
  },
  primarySimple: {
    backgroundColor: 'transparent',
    color: accentColor.default,
  },
  danger: {
    backgroundColor: dangerColor.light
  },
  dangerSimple: {
    backgroundColor: 'transparent',
    color: dangerColor.light,

  },
  round: {
    borderRadius: 50
  }

});