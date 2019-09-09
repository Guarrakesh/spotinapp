import React, {useState, useEffect} from 'react';
import {withNamespaces} from "react-i18next";
import {Animated, Text, StyleSheet, View} from "react-native";
import PropTypes from 'prop-types';
import {
  PanGestureHandler, PanGestureHandlerGestureEvent,
  PanGestureHandlerStateChangeEvent,
  State,
} from "react-native-gesture-handler";
import {scale} from "react-native-size-matters";
import usePrevious from "../../../helpers/hooks/usePrevious";
import themes from "../../../styleTheme";

const deviceHeight = themes.base.deviceDimensions.height;
const deviceWidth = themes.base.deviceDimensions.width;

const FormErrorBox = ({ t, errors, show, onSwipeAway }) => {

  // 0 close, 1 show, 2 reset
  const [status, setStatus] = useState(0);
  const previousShow = usePrevious(show);
  const baseHeight = errors.length * 30 + 50;
  const [cancelled, setCancelled] = useState(false);
  const [dragY] = React.useState(new Animated.Value(0));
  useEffect(() => {
    if (cancelled)
      setCancelled(false);

  }, [cancelled]);
  useEffect(() => {
    console.log(status, previousShow, show);
    if (status === 0) {
      if (!previousShow && show)  {
        open();
      }
    } else if (status === 1) {
      if (previousShow && !show) {
        close();
      }
    } else if (status === 2) {
      if (onSwipeAway && previousShow) {
        onSwipeAway()
      }
      console.log("swiped");
      if (!previousShow && show) {
        open();
      }

    }
  },[status, show]);
  const open = () => {
    dragY.flattenOffset();

    Animated.spring(dragY, {
      toValue: -baseHeight,
      useNativeDriver: true,
    }).start(() => {
      dragY.setOffset(-baseHeight);
      dragY.setValue(0);
      setStatus(1);
    });
  };
  const close = (reset) => {
    dragY.flattenOffset();
    Animated.spring(dragY, {
      toValue: baseHeight,
      useNativeDriver: true
    }).start(() => {
      dragY.setOffset(baseHeight);
      dragY.setValue(0);
      setStatus(reset ? 2 : 0);
    });
  };
  const _onGestureEvent = (event: PanGestureHandlerGestureEvent) => {
    const { translationY } = event.nativeEvent;
    let newY = translationY;

    if (newY < 0) {
      newY = newY / (1-newY*0.02);
    }
    if (newY < -40) {
      // Cancel
      setCancelled(true);
    } else {
      dragY.setValue(newY);
    }

  };
  const _onHandlerSateChange = (event: PanGestureHandlerStateChangeEvent) => {
    const { state, velocityY, oldState } = event.nativeEvent;

    if (state === State.CANCELLED) {
      dragY.flattenOffset();
      open();
    }
    if (state !== State.CANCELLED && event.nativeEvent.oldState === State.ACTIVE) {
      if (event.nativeEvent.translationY > baseHeight * 0.75 || velocityY > 0.5) {
        // Close
        close(true)
      } else {
        open();
      }

    }
  };
  return (
      <PanGestureHandler
          enabled={!cancelled}
          onGestureEvent={_onGestureEvent}
          onHandlerStateChange={_onHandlerSateChange}
      >
        <Animated.View
            style={[
              styles.sheet,
              { transform: [{ translateY: dragY }]}
            ]}
        >
          <View style={styles.line}></View>
          <Text style={styles.title}>{t("common.errors.wait")}</Text>
          {errors.map(error => (
                  <Text style={styles.text}>{error}</Text>

              )
          )}

        </Animated.View>
      </PanGestureHandler>
  )
};

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: themes.base.colors.danger.light,
    bottom: -deviceHeight,
    height: deviceHeight,
    paddingVertical: 16,
    paddingHorizontal: 16,
    width: '100%',
    position: 'absolute',
    zIndex: 999,
  },
  title: {
    fontFamily: themes.base.fonts.LatoBlack,
    color: themes.base.colors.text.light,
    fontSize: scale(18),
  },
  text: {
    fontFamily: themes.base.fonts.LatoMedium,
    color: themes.base.colors.text.light,
  },
  line: {
    position: 'absolute',
    left: deviceWidth / 2 - 20,
    right: 0,
    top: 8,
    width: 40,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#fff',
  }
});
FormErrorBox.defaultProps = {
  show: false,
};
FormErrorBox.propTypes = {
  onSwipeAway: PropTypes.func.required,
  show: PropTypes.boolean,
  errors: PropTypes.arrayOf(PropTypes.string).required,
  autoHideDuration: PropTypes.number,
};

export default withNamespaces()(FormErrorBox);
