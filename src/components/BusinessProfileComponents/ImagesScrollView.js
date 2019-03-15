import React from 'react';
import Swiper from 'react-native-swiper';
import themes from "../../styleTheme";
import {Image, StyleSheet, Text} from "react-native";
import {VersionedImageField} from "../common";

const deviceWidth = themes.base.deviceDimensions.width;

const ImagesScrollView = (props) => {

  let { business } = props;

  const images = [ { versions: business.cover_versions } ].concat(business.pictures || []) || [] ;
  return(
      <Swiper
          showsButtons={true}
          height={230}
          dotColor={'rgba(255, 255, 255, 0.5)'}
          activeDotColor={themes.base.colors.white.light}
          nextButton={<Text style={styles.buttonText}> </Text>}
          prevButton={<Text style={styles.buttonText}> </Text>}
      >
        {images.length > 0 && images.map(image =>
            (image.versions && <VersionedImageField
                    source={image.versions}
                    style={{flex: 1}}
                    minSize={{width: 1200, height: 1200}}
                    imgSize={{height: 230, width: deviceWidth}}
                    resizeMode={'cover'}
                />
            )
        )}

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
});

export default ImagesScrollView;