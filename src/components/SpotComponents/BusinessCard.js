import React from 'react';

import View from '../common/View';
import {Text, StyleSheet, TouchableOpacity, ImageBackground, Image} from 'react-native';
import PropTypes from 'prop-types';
import themes from '../../styleTheme';
import Icon from 'react-native-vector-icons/Entypo';


const BusinessCard = (props) => {

    let business = {
        _id: 1,
        name: "PizzaHot",
        address: "Via Lago Patria 71, Giugliano (NA)",
        image: "https://file.videopolis.com/D/9dc9f4ba-0b2d-4cbb-979f-fee7be8a4198/8485.11521.brussels.the-hotel-brussels.amenity.restaurant-AD3WAP2L-13000-853x480.jpeg",
        kind: "American Pub",
        distance: "3,4",
        wifi: false,
        seats: 56
    };

    let absoluteDiscount = false;
    let discount = "10";
    let wifiIcon =  require('./wifi.png');


    return (
        <TouchableOpacity onPress={props.onPress}>
            <View elevation={1} style={styles.innerContainer}>
                <View style={styles.topContainer}>
                    <ImageBackground
                        imageStyle={{ borderRadius: themes.base.borderRadius }}
                        source={{uri: props.image}}
                        style={styles.imgBackground}
                    >
                        <View style={styles.overlayView}>
                            <View style={{flexDirection: 'column', justifyContent: 'flex-end', borderTopLeftRadius: themes.base.borderRadius}}>
                                <Text style={styles.name}>{props.name} - {props.kind}</Text>
                                <Text style={styles.address}>{props.address}</Text>
                            </View>
                            <View style={{flexDirection: 'column', justifyContent: 'flex-end', flex: 1, borderTopRightRadius: themes.base.borderRadius}}>
                                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <Image
                                        source={require('./geoFence.png')}
                                        style={styles.geoFenceImg}
                                    />
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <Text style={styles.distance}>{props.distance} km</Text>
                                </View>

                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.bottomContainer}>
                    <View style={{flex: 2, height: '100%', flexDirection: 'row', alignItems: 'center'}}>
                        <Image
                            source={require('./seats.png')}
                            style={styles.seatsImg}
                        />
                        <Text style={{fontSize: 18, color: themes.base.colors.text.default, marginLeft: 5, fontWeight: 'bold'}}>
                            {props.seats}
                        </Text>
                        {props.wifi ? <Image
                            source={wifiIcon}
                            style={styles.wifiImg}
                        />
                        : null}
                    </View>
                    <View style={{flex: 1, height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 24, color: themes.base.colors.accent.default, fontWeight: 'bold'}}>{props.discount.absoluteDiscount ? '' : '-'}{discount}{props.discount.absoluteDiscount ? '€' : '%'}</Text>
                        <Text style={{fontSize: 13, color: themes.base.colors.text.default, fontWeight: 'bold'}}>alla cassa</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>

    );
};


const styles = StyleSheet.create({
    innerContainer: {
        marginBottom: 16,
        borderRadius: themes.base.borderRadius,
        backgroundColor: themes.base.colors.white.light

    },
    overlayView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(0,0,0,.4)',
        borderTopLeftRadius: themes.base.borderRadius,
        borderTopRightRadius: themes.base.borderRadius
    },
    image: {
        width: 64,
        marginLeft: 16,
        marginRight: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 16,
        color: themes.base.colors.white.default,
        fontWeight: 'bold',
        marginLeft: 8,
    },
    address: {
        fontWeight: 'bold',
        fontSize: 10,
        color: themes.base.colors.white.default,
        marginLeft: 8,
        marginBottom: 8
    },
    distance: {
        fontSize: 18,
        fontWeight: 'bold',
        color: themes.base.colors.white.default,
        marginRight: 8,
        marginBottom: 8
    },
    imgBackground: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        flex: 1,
        borderTopLeftRadius: themes.base.borderRadius,
        borderTopRightRadius: themes.base.borderRadius,

    },
    geoFenceImg: {
        width: 21,
        height: 21,
        marginRight: 30
    },
    wifiImg: {
        width: 32,
        height: 24,
        marginLeft: 20
    },
    seatsImg: {
        width: 30,
        height: 30,
        marginLeft: 20
    },
    topContainer: {
        width: '100%',
        backgroundColor: themes.base.colors.white.default,
        height: 124,
        flexDirection: 'row',
        borderTopLeftRadius: themes.base.borderRadius,
        borderTopRightRadius: themes.base.borderRadius

    },
    bottomContainer: {
        width: '100%',
        height: 80,
        flexDirection: 'row',
        borderWidth: 0,
    }
})

export default BusinessCard;