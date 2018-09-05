import React from 'react';
import Swiper from 'react-native-swiper';
import themes from "../../styleTheme";
import {Image, StyleSheet, Text} from "react-native";

const ImagesScrollView = (props) => {

    let { business } = props;

    return(
        <Swiper
            showsButtons={true}
            height={230}
            dotColor={'rgba(255, 255, 255, 0.5)'}
            activeDotColor={themes.base.colors.white.light}
            nextButton={<Text style={styles.buttonText}>›</Text>}
            prevButton={<Text style={styles.buttonText}>‹</Text>}
        >
            <Image source={{uri: business.image_url[0].url}} style={{flex: 1}} />
            <Image source={{uri: business.image_url[0].url}} style={{flex: 1}} />
            <Image source={{uri: business.image_url[0].url}} style={{flex: 1}} />
            <Image source={{uri: business.image_url[0].url}} style={{flex: 1}} />
            <Image source={{uri: business.image_url[0].url}} style={{flex: 1}} />
            <Image source={{uri: business.image_url[0].url}} style={{flex: 1}} />
        </Swiper>
    );

};

const styles = StyleSheet.create({

    cardContainer: {
        marginLeft: 8,
        marginRight: 8,
        marginTop: -20 //TODO: da valutare (si sovrappone alle foto)
    },
    buttonText: {
        fontSize: 50,
        color: 'rgba(255, 255, 255, 0.7)',
        fontFamily: 'Arial'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
})

export default ImagesScrollView;