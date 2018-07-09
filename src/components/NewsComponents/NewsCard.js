import React from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import HeaderNewsCard from './HeaderNewsCard';
import EventNewsCard from './EventNewsCard';
import NewsDescription from './NewsDescription';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

const NewsCard = () => {
  return (
    <TouchableOpacity>
     <View style={styles.containerStyle}>
      <HeaderNewsCard />
      <EventNewsCard style={{paddingTop: 10}}/>
      <NewsDescription />
     </View>
    </TouchableOpacity>
  )
};

const styles = {
  containerStyle: {
    borderColor: '#000000',
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    paddingTop: 0,
    flexDirection: 'column',
    width: deviceWidth-16,
    flex: 1,
    height: null
   }
 };

export default NewsCard;
