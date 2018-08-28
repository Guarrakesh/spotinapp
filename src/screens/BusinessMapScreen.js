import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';





class BusinessMapScreen extends React.Component {
    render() {
        return (
            <View style={{flex:1}}>
                <Text>
                    {this.props.latitude}
                </Text>
                <Text>
                    {this.props.longitude}
                </Text>
            </View>
        )
    }
}


//equivale a function mapStateToProps(state) {}
const mapStateToProps = (state) => {
    return {
        latitude: state.location.latitude,
        longitude: state.location.longitude,
    };
};

export default connect(mapStateToProps)(BusinessMapScreen);



