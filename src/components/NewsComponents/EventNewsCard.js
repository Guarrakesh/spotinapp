import React from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import themes from '../../styleTheme';

const color = themes.base.colors
//const screenwidth = Dimensions.get('window').width;
//const screeheight = Dimensions.get('window').height;

const styles = {
  containerStyle: {
    marginTop: 10,
    marginLeft: 8,
    marginRight: 8,
    borderRadius: 8,
    borderColor: '#33CC33',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
    height: 116,
    width: '100%',
    backgroundColor: 'white',
    //shadowOpacity: 1
  },
  favouriteContainerStyle: {
    height: 116,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailContainerStyle: {
    borderColor: '#33CC33',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'column',
    height: 116,
    width: 60,
  },
  EventDetailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: 116,
    width: 219
  },
  ArrowContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: 116,
    width: 39,
  }
};

const EventNewsCard = () => {

  return (
    <View style={styles.containerStyle}>
      <View style={styles.favouriteContainerStyle}>
        <View>
          <Image
            source={require('./eventicons/favouriteicon.png')}
            style={{height: 35, width: 35, alignSelf: 'center'}}
          />
        </View>
      </View>
        <View style={styles.thumbnailContainerStyle}>
          <View>
            <Image
              source={require('./eventicons/napoliicon.png')}
              style={{height: 45, width: 45}}
            />
          </View>
          <View>
            <Image
             source={require('./eventicons/juveicon.png')}
             style={{height: 45, width: 45}}
            />
          </View>
        </View>
        <View style={styles.EventDetailContainerStyle}>
          <Text style={{fontSize: 21, marginTop: 5}}>Napoli - Juventus</Text>
          <Text style={{fontSize: 14, color: color.primary.default}}>3 locali vicino a te</Text>
          <Text style={{fontSize: 16}}>13 Gen - 15:30</Text>
        </View>
        <View style={styles.ArrowContainerStyle}>
          <Image
            source={require('./eventicons/arrowicon.png')}
            style={{height: 20, width: 20, marginRight: 13}}
          />
        </View>
    </View>
  );
}



export default EventNewsCard;
