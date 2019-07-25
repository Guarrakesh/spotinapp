import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet } from 'react-native';
import { Button as BaseButton } from 'react-native-elements'

import themes, { accentColor, dangerColor, infoColor, primaryColor, textColor, whiteColor, warningColor } from '../../styleTheme';
const fonts = themes.base.fonts;

export default class Button extends React.Component {


  render() {

    const { clear, variant, round, buttonStyle, titleStyle, uppercase, children
        , loadingProps, loadingStyle, block, containerStyle, elevation, titleProps,
        icon, size,

        ...props} = this.props;

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
      size === "big"
          ? { paddingTop: 10, paddingBottom: 10  }
          : { paddingTop: 4, paddingBottom: 4},
      styles.container,
      containerStyle
    ]);
    const _titleBaseStyle = [
      styles.titleBase,
      clear ? styles[`${variant}Simple`] : { color: styles[variant].color },
        size === "big"
            ? { fontSize: 17, paddingTop: 10, paddingBottom: 10  }
            : { paddingTop: 8, paddingBottom: 8},
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
            icon={icon}
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
  children: null,

};
Button.propTypes = {
  titleStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  block: PropTypes.bool,
  elevation: PropTypes.number,
  round: PropTypes.bool,
  uppercase: PropTypes.bool,
  variant: PropTypes.string,
  clear: PropTypes.bool,
  icon: PropTypes.element,
  size: PropTypes.string,
};

const styles = StyleSheet.create({


  base: {
    width: '100%',
    fontFamily: fonts.LatoMedium,
    color: '#555',
    overflow: "hidden",


  },
  titleBase: {
    fontSize: 14,
    fontFamily: fonts.LatoMedium,
    color: '#fff',

  },
  default: {
    backgroundColor: whiteColor.default,
    color: accentColor.default
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
  grey: {
    backgroundColor: "#D8D8D8"
  },
  round: {
    borderRadius: 50
  }

});