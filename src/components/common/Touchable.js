import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native';

export default class Touchable extends React.Component {

  render() {

    const { onPress, style, children, rippleColor, borderlessRipple } = this.props;

    if (Platform.OS === 'ios') {
      return (
        <TouchableOpacity onPress={onPress}>
          <View style={style}>
            {children}
          </View>
        </TouchableOpacity>
      )
    }

    return (
      <TouchableNativeFeedback
        onPress={onPress}
        background={
          Platform.Version >= 21 ?
            TouchableNativeFeedback.Ripple('rgba(0,0,0,.2)', true) :
            TouchableNativeFeedback.SelectableBackground()
        }>
        <View>
          {children}
        </View>
      </TouchableNativeFeedback>
    )
  }
};

Touchable.propTypes = {
  onPress: PropTypes.func,
  style: PropTypes.object,
  rippleColor: PropTypes.string,
  borderlessRipple: PropTypes.bool
}

Touchable.defaultProps = {
  onPress: () => {},
  style: {},
  rippleColor: '#fff',
  borderlessRipple: false
}