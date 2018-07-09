import React from 'react';
import { View, Image, Text } from 'react-native';

const HeaderNewsCard = () => {

  return (
     <View style={styles.containerStyle}>
        <View style={styles.thumbnailContainerStyle}>
          <Image source={{uri: './NewsIcon/LocalLogo.png'}} style={styles.imageStyle} />
        </View>
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#33CC33'}}>Pizza hot</Text>
          <Text style={{color: '#9E9E9E'}}>Pizzeria</Text>
          <Text style={{color: '#9E9E9E'}}>Giugliano in Campania</Text>
        </View>
        <View style={{justifyContent: 'center'}}>
         <Text style={{color: '#9E9E9E'}}>1,5 km da te</Text>
         <Text style={{color: '#9E9E9E'}}>five stars</Text>
        </View>
     </View>
  );
}

const styles = {
  containerStyle: {
    borderColor: '#33CC33',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
    height: 80,
    width: 359,
  },
  imageStyle: {
    borderRadius: 5,
    height: 68,
    width: 68,
    justifycontent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
    marginTop: 11
  },
  thumbnailContainerStyle: {
    borderColor: '#33CC33',
    backgroundColor: '#000066',
    justifycontent: 'center',
    alignItems: 'center',
    height: 68,
    width: 68,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 11
  }
};

export default HeaderNewsCard;
