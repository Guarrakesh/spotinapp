
import React from 'react';
import PropTypes from 'prop-types';
import { Platform, StyleSheet } from 'react-native';
import { Button as BaseButton } from 'react-native-elements'

import themes from '../../styleTheme';
const fonts = themes.base.fonts;

const buttonBaseStyle = themes.base.button;
export default class Button extends React.Component {
  static propTypes = {
    elevation: PropTypes.number
  };

  static defaultProps = {
    elevation: 0
  }

  render() {

    const { clear, variant, round, buttonStyle, titleStyle, capitalize, children } = this.props;

    //TODO tutta la roba dell'ombra e dei ripple

    const style = StyleSheet.flatten([
      clear ? {} : buttonBaseStyle[variant],
      round ? buttonBaseStyle.round : {},
      buttonBaseStyle.base,
      buttonStyle,


    ]);
    const titleBaseStyle = [
      buttonBaseStyle.titleBase,
      clear ? buttonBaseStyle[`${variant}Simple`] : {},
      titleStyle,
      capitalize && {fontFamily: fonts.LatoBold}
    ];
    const loadingProps = {
      size: capitalize ? "large" : "small",
      color: clear ? themes.base.colors[variant] : "#fff",
    };
    return (
        <BaseButton
            rounded
            activeOpacity={0.2}
            buttonStyle={style}
            titleStyle={titleBaseStyle}
            title={typeof children === "string"  && capitalize ? children.toUpperCase() : children}

            loadingProps={loadingProps}
            {...this.props}
        />
    )

  }

}

Button.defaultProps = {
  variant: 'primary'
};
Button.propTypes = {
  capitalize: PropTypes.bool,
  variant: PropTypes.string,
  clear: PropTypes.bool,
};

const styles = {


};