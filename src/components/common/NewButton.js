import PropTypes from 'prop-types';
import React from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from 'react-native';
import themes, {accentColor, dangerColor, textColor, whiteColor} from '../../styleTheme';
import Touchable from '../common/Touchable';

const fonts = themes.base.fonts;

export default class Button extends React.Component {

  _renderInnerText() {
    const { uppercase, clear, loadingProps, variant} = this.props;
    const _loadingProps = [{
      size: uppercase ? "large" : "small",
      color: clear ? themes.base.colors[variant] : "#fff",
    }, loadingProps];

    if (this.props.loading) {
      const { size, color } = _loadingProps;
      return (
        <ActivityIndicator
          animating={true}
          style={[{alignSelf: 'center'}, _loadingProps.style]}
          size={size}
          color={color}
        />
      )
    } else {
      return this._renderChildren()
    }
  }

  _renderChildren() {
    const { icon, clear, size, uppercase, titleStyle, variant, children  } = this.props;
    const _titleBaseStyle = [
      styles.titleBase,
      clear ? styles[`${variant}Simple`] : { color: styles[variant].color },

      uppercase && {fontFamily: fonts.LatoBold},
      titleStyle,
      icon ? { marginLeft: 8 } : {},

    ];
    return (
      <React.Fragment>
        {icon}
        <Text
          style={_titleBaseStyle}
          allowFontScaling
        >
          {typeof children === "string"  && uppercase ? children.toUpperCase() : children}
        </Text>
      </React.Fragment>
    )
  }
  render() {

    const { clear, variant, round, uppercase, children, block, containerStyle, elevation, titleProps,
      size, background,

      ...props} = this.props;

    //TODO tutta la roba dell'ombra e dei ripple

    // const _style = StyleSheet.flatten([
    //   clear ? { backgroundColor: 'transparent', elevation: 0} : {backgroundColor: 'transparent', elevation: 0},
    //   styles.base,
    //   styles.round,
    //   buttonStyle,
    //
    // ]);
    const _containerStyle = StyleSheet.flatten([
      styles.base,
      clear ? { } : styles[variant],
      round || clear ? styles.round : {},
      block ? { alignSelf: 'stretch' } : { width: 150 },

      !clear && { elevation, ...themes.base.elevations[`depth${elevation}`] },
      size === "big"
        ? { paddingTop: 10, paddingBottom: 10  }
        : { paddingTop: 8, paddingBottom: 8},
      styles.container,
      containerStyle
    ]);




    if (Platform.OS === "Android") {
      return <TouchableNativeFeedback
        {...props}
        background={background || TouchableNativeFeedback.SelectableBackground()}
      >
        <View style={[_containerStyle]}>
          {this._renderInnerText()}
        </View>

      </TouchableNativeFeedback>
    } else {
      return (
        <TouchableOpacity
          {...props}
          style={_containerStyle}>
          {this._renderInnerText()}
        </TouchableOpacity>
      )
    }
    // return (
    //
    //     <Touchable
    //         containerStyle={_containerStyle}
    //         activeOpacity={0.2}
    //         titleProps={{
    //           numberOfLines: 1,
    //           ...titleProps
    //         }}
    //
    //         loadingStyle={[{fontSize: styles.titleBase.fontSize, padding: 8}, loadingStyle]}
    //         loadingProps={_loadingProps}
    //         {...props}
    //     >
    //       <View style={styles.titleView}>
    //         {icon}
    //         <Text style={_titleBaseStyle}>{typeof children === "string"  && uppercase ? children.toUpperCase() : children}</Text>
    //       </View>
    //     </Touchable>
    // )

  }

}

Button.defaultProps = {
  variant: 'default',
  elevation: 1,
  children: null,

};
Button.propTypes = {
  titleStyle: PropTypes.object,
  containerStyle: PropTypes.object,
  block: PropTypes.bool,
  elevation: PropTypes.number,
  round: PropTypes.bool,
  uppercase: PropTypes.bool,
  variant: PropTypes.string,
  clear: PropTypes.bool,
  icon: PropTypes.element,
  size: PropTypes.string,
  loading: PropTypes.bool,
  loadingProps: PropTypes.shape({
    color: PropTypes.string,
    size: PropTypes.oneOf(['small','large'])
  }),
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({

  titleView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  base: {
    fontFamily: fonts.LatoMedium,
    color: '#555',
    overflow: "hidden",
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',

    justifyContent: 'center',

  },
  titleBase: {
    fontSize: 15,
    fontFamily: fonts.LatoMedium,
    color: '#fff',
    textAlign: 'center',

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