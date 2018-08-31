import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

class BusinessMapScreen extends React.Component {
    render() {
        return (
            <View style={{flex:1}}>
                <MapView style={styles.map}
                    region={{
                        latitude: 14.0823297,
                        longitude: 40.8627346,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1
                    }}
                >
                    <MapView.Marker
                        coords={{
                            latitude: 14.0823297,
                            longitude: 40.8627346}}
                        title={"PizzaHot"}
                        description={"Dario e' gay"}
                    />
                </MapView>
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

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

    }
});

export default connect(mapStateToProps)(BusinessMapScreen);



