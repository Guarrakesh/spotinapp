import React from 'react';
import { View, Image, Text } from 'react-native';

const EventNewsCard = () => {

  return (
    <View style={styles.containerStyle}>
      <View style={{height: 85, width: 65, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{height: 35, width: 35, backgroundColor: '#000066'}}>
          <Image source={{uri:'./NewsIcon/SoccerIcon.png'}} style={{height: 35, width: 35}} />
        </View>
      </View>
        <View style={{height: 85, width: 105, flexDirection: 'column', alignItems: 'center'}}>
        <View style={{height: 45, width: 45, backgroundColor: '#000066'}}>
        <Image source={{uri: './NewsIcon/LogoFirstTeam.png'}} style={{height: 45, width: 45}}/>
        </View>
        <Text>SSC Napoli</Text>
       </View>
       <View style={{height: 85, width: 17, alignItems: 'center', justifyContent: 'center'}}>
         <Text>-</Text>
       </View>
       <View style={{height: 85, width: 105, flexDirection: 'column', alignItems: 'center'}}>
         <View style={{height: 45, width: 45, backgroundColor: '#000066'}}>
         <Image source={{uri: './NewsIcon/LogoSecondTeam.png'}} style={{height: 45, width: 45}}/>
         </View>
        <Text>Juventus</Text>
       </View>
      <View style={{height: 85, width: 65, justifyContent: 'center', alignItems: 'center'}}>
        <Text>13 Gen</Text>
        <Text>20:43</Text>
      </View>
    </View>
  );
}

const styles = {
  containerStyle: {
    marginTop: 10,
    borderColor: '#33CC33',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
    height: 85,
    width: 359,
  },
  imageStyle: {
    cornerRadius: 5,
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
    height: 80,
    width: 80
  }
};

export default EventNewsCard;
