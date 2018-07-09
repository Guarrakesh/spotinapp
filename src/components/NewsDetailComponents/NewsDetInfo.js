import React from 'react';
import { View, Image, Text } from 'react-native';

const NewsDetInfo = () => {
  return (
  <View style={styles.ContainerStyle}>
     <View style={styles.LeftStyle}>
       <View style={{height: 33, width: 179, flexDirection: 'row', alignItems: 'center'}}>
        <Image source={{uri: './NewsIcon/ChairIcon.png'}} style={{height: 25, width: 18, marginRight: 3, marginLeft: 5, marginTop: 5, backgroundColor: 'grey'}}/>
        <Text>36 posti a sedere</Text>
       </View>
       <View style={{height: 33, width: 179, flexDirection: 'row', marginBottom: 8, borderWidth: 1, borderColor: '#2FBCA4', borderRadius: 8, alignItems: 'center', justifycontent: 'center'}}>
       <Image source={{uri: './NewsIcon/TelephoneIcon.png'}} style={{height: 21, width: 21, marginRight: 3, marginLeft: 5, backgroundColor: 'grey'}}/>
       <Text style={{color: '#2FBCA4'}}>+39 081 839 11 31</Text>
       </View>
       <View style={{height: 33, width: 179, flexDirection: 'row', marginBottom: 8, borderWidth: 1, borderColor: '#2FBCA4', borderRadius: 8, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: '#2FBCA4', justifyContent: 'center', alignItems: 'center'}}>Aperto ora</Text>
       </View>
     </View>
     <View style={styles.RightStyle}>
       <View style={{height: 33, width: 179, flexDirection: 'row', marginBottom: 8, marginRight: 5, alignItems: 'center', justifyContent: 'flex-end'}}>
         <Text style={{color: '#555555'}}>N° tv 5</Text>
       </View>
       <View style={{height: 33, width: 179, flexDirection: 'row', marginBottom: 8, alignItems: 'center', justifyContent: 'flex-end'}}>
          <Image source={{uri: './NewsIcon/SkySportIcon.png'}} style={{height: 14, width: 67, marginRight: 5, marginLeft: 5, backgroundColor: 'grey'}}/>
       </View>
       <View style={{height: 33, width: 179, flexDirection: 'row', marginBottom: 8, alignItems: 'center', justifyContent: 'flex-end'}}>
         <Image source={{uri: './NewsIcon/PremiumIcon.png'}} style={{height: 26, width: 61, marginRight: 5, marginLeft: 5, backgroundColor: 'grey'}}/>
       </View>
     </View>
  </View>
  );
}

const styles = {
  LeftStyle: {
    height: 123,
    width: 179,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  ContainerStyle: {
    height: 123,
    width: 359,
    flexDirection: 'row'
  },
  RightStyle: {
    flexDirection: 'column',
    height: 123,
    width: 179,
    justifyContent: 'space-between'
  }
};

export default NewsDetInfo;
