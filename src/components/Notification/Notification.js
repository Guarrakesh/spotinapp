import React from 'react';

import { Animated, View, Text, PanResponder, InteractionManager } from 'react-native';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { isEqual } from 'lodash';
import { hideNotification } from '../../actions/notificationActions';

import { getNotification } from '../../reducers/notifications';


import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import themes from '../../styleTheme';
const colors = themes.base.colors;

class Notification extends React.Component {
  state = {
    open: false,
    animated: new Animated.Value(0),

  };

  componentWillReceiveProps(nextProps) {

    if (!isEqual(nextProps.notification, this.props.notification)) {
      InteractionManager.runAfterInteractions(() => {
        this.toggleNotification(nextProps);
      });
    }

  }
  componentDidMount() {
    this.toggleNotification(this.props);

  }



  toggleNotification(props) {

    if (!props || !props.notification) return;


    const { notification } = props;
    const open = !this.state.open;
    this.setState({open});

    Animated.timing(this.state.animated, {
      toValue: open ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start(open ? this.timeOutHandler(props) : this.props.hideNotification );
  }
  timeOutHandler(props) {
    const autoHideDuration = props.notification.autoHideDuration || 6000;

    this.timeOut = setTimeout(() => this.toggleNotification(props), autoHideDuration)
  }
  _panResponder = PanResponder.create({
    // Ask to be the responder:

    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

    onPanResponderGrant: (evt, gestureState) => {
      // The gesture has started. Show visual feedback so the user knows
      // what is happening!
      clearTimeout(this.timeOut);
      this.toggleNotification(this.props);
      // gestureState.d{x,y} will be set to zero now
    },

  });


  render() {


    const { notification } = this.props;
    if (!notification) return null;
    const message = notification.message;

    let iconName;
    switch (notification.type) {
      case 'info':
        iconName = "information-outline"; break;
      case 'success':
        iconName = "check"; break;
      case 'warning':
        iconName = 'triangle-outline'; break;
      case 'error':
        iconName = 'ghost'; break;
    }
    return(
        <Animated.View
            {...this._panResponder.panHandlers}
            style={{
              position: 'absolute',
              top: 0,
              right: 0, left: 0,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',


              backgroundColor: styles.backgroundColor(notification.type),
              padding: 16,
              alignSelf: 'stretch',

              height: 80,

              zIndex: 1000,
              elevation: 2,
              ...themes.base.elevations.depth2,
              transform: [
                {
                  translateY: this.state.animated.interpolate({
                    inputRange: [0,1],
                    outputRange: [-100,1]
                  })
                }
              ]
            }}>
          <View style={{justifyContent: 'center', alignSelf: 'flex-start', marginLeft: 16}}>
            <Icon name={iconName} size={32} color={colors.white.default} />
          </View>
          <View style={{marginLeft: 8, flexDirection: 'column', justifyContent: 'center', flexGrow: 1}}>
            {notification.title && <Text style={styles.title}>{notification.title}</Text>}
            <Text numberOfLines={2} style={styles.message}>{message}</Text>
          </View>
        </Animated.View>)
  }
}

const styles = {

  backgroundColor: (type) => {
    switch (type) {
      case 'info':
        return '#12CBC4';
      case 'success':
        return '#009432';
      case 'warning':
        return '#F79F1F';
      case 'error':
        return '#EA2027';
      default:
        return '#5758BB';
    }
  },

  title: {

    fontFamily: themes.base.fonts.LatoBlack,
    fontWeight: '800',
    color: colors.white.default,
    fontSize: 18,

  },
  message: {

    fontFamily: themes.base.fonts.LatoMedium,
    fontWeight: '500',
    paddingRight: 8,
    color: colors.white.default,
    fontSize: 14,
  }



};

Notification.defaultProps = {
  type: 'info',
  autoHideDuration: 4000,
};

const mapStateToProps = state => ({
  notification: getNotification(state),
});

export default compose(
//    translate,

    connect(
        mapStateToProps,
        {
          //  complete,
          hideNotification,

        }
    )
)(Notification);

