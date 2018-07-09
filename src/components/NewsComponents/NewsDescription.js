import React from 'react';
import { View, Image, Text } from 'react-native';

const DescriptionNewsCard = () => {

  return (
     <View style={styles.containerStyle}>
       <Text style={{fontSize: 18, fontWeight: 'bold'}}>Pizza più bibita €10</Text>
       <Text style={{marginLeft: 10, marginRight: 10, marginTop: 5}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac urna elementum, euismod ligula eget, malesuada justo. In elementum lorem ligula, at pulvinar dolor congue a.</Text>

        <Image source={{uri: './NewsIcon/NewsImageDescription.png'}} style={styles.imageStyle}/>

     </View>
  );
}

const styles = {
  containerStyle: {
    marginTop: 10,
    borderColor: '#33CC33',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    height: 80,
    width: 359,
  },
  imageStyle: {
    borderRadius: 5,
    backgroundColor: '#000066',
    height: 200,
    width: 340,
    justifycontent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginRight: 8,
    marginTop: 11
  }
};

export default DescriptionNewsCard;
