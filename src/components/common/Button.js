
import React from 'react';
import PropTypes from 'prop-types';
import {  Platform } from 'react-native';
import { Button as BaseButton } from 'react-native-elements'

import themes from '../../styleTheme';
const buttonBaseStyle = themes.base.button;
export default class Button extends React.Component {
  static propTypes = {
    elevation: PropTypes.number
  };

  static defaultProps = {
    elevation: 0
  }

  render() {

    const { clear, variant, round, buttonStyle, titleStyle} = this.props;

    //TODO tutta la roba dell'ombra e dei ripple

    const style = [
      clear ? {} : buttonBaseStyle[variant],
      round ? buttonBaseStyle.round : {},
      buttonBaseStyle.base,
      buttonStyle,
    ];
    const titleBaseStyle = [
        buttonBaseStyle.titleBase,
      clear ? buttonBaseStyle[`${variant}Simple`] : {},
      titleStyle
    ];
    return (
        <BaseButton
            rounded
            activeOpacity={0.2}
            buttonStyle={style}
            titleStyle={titleBaseStyle}
            title={this.props.children}
            {...this.props}
        />
    )

  }

}

Button.defaultProps = {
  variant: 'primary'
};
Button.propTypes = {
  variant: PropTypes.string,
  clear: PropTypes.bool,
};

const styles = {


};