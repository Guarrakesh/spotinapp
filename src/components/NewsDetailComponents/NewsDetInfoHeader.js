import React from 'react';
import { View, Image, Text } from 'react-native';

const NewsDetInfoHeader = () => {
  return (
  <View style={styles.ContainerStyle}>
     <View style={styles.headerStyle}>
       <Text style={{fontSize: 24, fontWeight: 'bold', color: '#33CC33'}}>Pizzeria Ristorante</Text>
       <Text style={{fontSize: 18, fontWeight: 'bold', alignItems: 'flex-end', justifycontent: 'flex-start', color: '#33CC33', marginTop: 5, marginRight: 5}}>Five stars</Text>
     </View>
     <View style={styles.AddressSectionStyle}>
       <Image source={{uri: './NewsIcon/AnnotationPinIcon.png'}} style={{height: 23, width: 21, marginRight: 3, marginLeft: 8, backgroundColor: 'grey'}} />
       <Text style={{fontSize: 14, color: '#555555', alignItems: 'center', flex: 1}}>Via Lago Patria, 71, 80014 Giugliano in Campania NA</Text>
       <Image source={{uri: './NewsIcon/ArrowIcon.png'}} style={{height: 10, width: 10, marginLeft: 8, marginTop: 5,marginRight: 5, backgroundColor: 'grey'}} />
     </View>
     <View style={{height: 18, width: 359, alignItems: 'center', marginBottom: 5}}>
      <View style={styles.DistanceStyle}>
        <Text style={{fontSize: 12, justifycontent: 'flex-end', alignItems: 'center', color: 'white'}}>1,5 km da te</Text>
      </View>
     </View>
  </View>
  );
}

const styles = {
  headerStyle: {
    height: 33,
    width: 359,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  ContainerStyle: {
    height: 83,
    width: 359,
    JustifyContent: 'column',
    borderBottomWidth: 1,
    borderBottomColor: 'grey'
  },
  AddressSectionStyle: {
    flexDirection: 'row',
    height: 26,
    width: 359,
    justifyContent: 'space-between'
  },
  DistanceStyle: {
    height: 18,
    width: 89,
    marginBottom: 5,
    alignItems: 'center',
    backgroundColor: '#555555',
    borderRadius: 8
  }
};

export default NewsDetInfoHeader;
