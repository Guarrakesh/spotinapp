import React from 'react';
import { View, Image, Text } from 'react-native';

const HeaderNewsDet = () => {
  return (
   <Image source={{uri: './NewsIcon/DetNewsLocalImage.png'}} style={styles.imageStyle} />
  );
}

const styles = {
  imageStyle: {
    borderRadius: 5,
    height: 210,
    width: 375,
    justifycontent: 'center',
    alignItems: 'center',
    backgroundColor: '#000066'
  }
};

export default HeaderNewsDet;
