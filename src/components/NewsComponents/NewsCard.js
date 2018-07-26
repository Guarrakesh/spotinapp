import React from 'react';
import { View, Dimensions, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
// import HeaderNewsCard from './HeaderNewsCard';
import EventNewsCard from './EventNewsCard';
import NewsDescription from './NewsDescription';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

const NewsCard = () => {
  return (
    <TouchableOpacity>
      <View style={styles.containerStyle}>
        <NewsDescription />
        <EventNewsCard style={{paddingTop: 10}}/>
          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button
              icon={
                <Icon
                  name='heart'
                  size={22}
                  color='#B47CFF'
                />
              }
              buttonStyle={{
               backgroundColor: '#FAFAFA',
               width: 42,
               height: 42,
               borderColor: "#FAFAFA",
               borderWidth: 0,
               borderRadius: 21,
               marginTop: 20
              }}
            />
            <Button
              title="Prenota offerta"
              buttonStyle={{
              backgroundColor: '#B47CFF',
              width: 180,
              height: 38,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 20,
              marginTop: 20
              }}
            />
          </View>
      </View>
    </TouchableOpacity>
  )
};

const styles = {
  containerStyle:{
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    alignItems: 'center',
    paddingTop: 0,
    position: 'relative',
    flexDirection: 'column',
    width: deviceWidth-16,
    marginLeft: 8,
    marginRight: 8,
    marginTop: 10,
    flex: 1,
    height: null
   }
 };

export default NewsCard;
