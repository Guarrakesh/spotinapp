import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

class BusinessMapScreen extends React.Component {
    render() {
      const {broadcasts } = this.props.navigation.state.params;
      if (!broadcasts) return null;



        return (
            <View style={{flex:1}}>
                <MapView style={styles.map}
                    initialRegion={{
                        latitude: broadcasts[0].business.address.location.coordinates[1],
                        longitude: broadcasts[0].business.address.location.coordinates[0],
                        latitudeDelta: 0.5,
                        longitudeDelta: 0.5
                    }}
                >

                  {

                    broadcasts.map(broad =>

                    <MapView.Marker
                      coordinate={{
                        latitude: broad.business.address.location.coordinates[1],
                        longitude: broad.business.address.location.coordinates[0]}}
                      title={broad.business.name}
                      description={broad.offer.title}
                    />
                    )
                  }

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



