import React from 'react';
import Swiper from 'react-native-swiper';
import themes from "../../styleTheme";
import {Image, StyleSheet, Text} from "react-native";

const ImagesScrollView = (props) => {

  let { business } = props;
  // let business = {
  //   "image_url": [
  //     {
  //       "url": "https://file.videopolis.com/D/9dc9f4ba-0b2d-4cbb-979f-fee7be8a4198/8485.11521.brussels.the-hotel-brussels.amenity.restaurant-AD3WAP2L-13000-853x480.jpeg",
  //       "width": 100,
  //       "height": 100
  //     },
  //     {
  //       "url": "https://u.tfstatic.com/restaurant_photos/269/55269/169/612/sabatini-vista-ristorante-aa87f.jpg",
  //       "width": 100,
  //       "height": 100
  //     },
  //     {
  //       "url": "https://u.tfstatic.com/restaurant_photos/269/55269/169/612/sabatini-vista-ristorante-aa87f.jpg",
  //       "width": 100,
  //       "height": 100
  //     },
  //     {
  //       "url": "https://media-cdn.tripadvisor.com/media/photo-s/03/17/d1/d1/ristorante-svevia.jpg",
  //       "width": 100,
  //       "height": 100
  //     },
  //     {
  //       "url": "https://file.videopolis.com/D/9dc9f4ba-0b2d-4cbb-979f-fee7be8a4198/8485.11521.brussels.the-hotel-brussels.amenity.restaurant-AD3WAP2L-13000-853x480.jpeg",
  //       "width": 100,
  //       "height": 100
  //     },
  //     {
  //       "url": "https://www.geoproject.roma.it/immage/aprire-ristorante-bar-tavola-calda-pizzeria-scia-roma-suap.jpg",
  //       "width": 100,
  //       "height": 100
  //     },
  //   ]
  // }

  return(
    <Swiper
      showsButtons={true}
      height={230}
      dotColor={'rgba(255, 255, 255, 0.5)'}
      activeDotColor={themes.base.colors.white.light}
      nextButton={<Text style={styles.buttonText}></Text>}
      prevButton={<Text style={styles.buttonText}></Text>}
    >
      {
        business.cover_versions.map(image =>
          <Image source={{uri: image.url}} style={{flex: 1}} resizeMode={'cover'}/>
        )
      }

    </Swiper>
  );

};

const styles = StyleSheet.create({


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