import React from 'react';
import { View, Image, Text, Dimensions, ImageBackground } from 'react-native';

const screenwidth = Dimensions.get('window').width;
const screeheight = Dimensions.get('window').height;

const styles = {
  containerStyle: {
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    width: screenwidth - 16,
    height: 276,
    marginLeft: 8,
    marginRight: 8,
  },
  imageStyle: {
    borderRadius: 5,
    height: 189,
    width: screenwidth - 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8
  },
  backgroundImage: {
      flex: 1,
      width: null,
      height: null,
      resizeMode: 'cover',
  }
};



const NewsDescription = () => {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.imageStyle}>
          <ImageBackground
             source={require('./newsimages/NewsImageOffer.png')}
             style={{width: '100%', height: '100%'}}
          >
            <View style={{flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Image
                  source={require('./newsimages/soccerIcon.png')}
                  style={{marginTop: 12, marginLeft: 20}}
                />
                <Text style={{ color: 'white', textAlign: 'right', fontSize: 23, marginRight: 10, marginTop: 20}}>13 Gen 20:45</Text>
              </View>
              <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{color: 'white', fontSize: 23, marginLeft: 20, marginBottom: 10}}>Pizza e Bibita</Text>
                <Text style={{color: 'white', fontSize: 23,  marginRight: 20, marginBottom: 10}}>10 €</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <Text style={{marginLeft: 10, marginRight: 10, marginTop: 5}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac urna elementum, euismod ligula eget, malesuada justo. In elementum lorem ligula, at pulvinar dolor congue a.</Text>
      </View>
    )
}



export default NewsDescription;
