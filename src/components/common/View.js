import React from 'react';
import PropTypes from 'prop-types';
import { View as BaseView, Platform } from 'react-native';


export default class View extends React.Component {
    static propTypes = {
        elevation: PropTypes.number
    };

    static defaultProps = {
        elevation: 0
    }

    render() {

        const { style, elevation } = this.props;
        if (Platform.OS === 'android') {
            return (
                <BaseView elevation={this.props.elevation} style={[{elevation, backgroundColor: 'transparent'}, style]} { ...this.props}>
                    {this.props.children}
                </BaseView>
            );

        }

        if (elevation === 0) {
            return (
                <BaseView style={style} { ...this.props}>
                    {this.props.children}
                </BaseView>
            );
        }

        // iOS non supporta la prop 'elevation', per cui me la calcolo e applico i css

        const iosShadowElevation = {

            shadowOpacity: 0.0015 * elevation + 0.18,
            shadowRadius: 0.54 * elevation,
            shadowOffset: {
                height: 0.6 * elevation,
            },

        };


        return (
            <BaseView {...this.props} style={[iosShadowElevation, style && style]}>
                {this.props.children}
            </BaseView>
        )

    }



}