import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import HomeController from '../../controllers/HomeController';
import InlineListController from '../../controllers/InlineListController';

import BusinessCarousel from '../../components/BusinessComponents/BusinessCarousel';
import BroadcastCarousel from '../../components/BroadcastComponents/BroadcastCarousel';
import EventCarousel from '../../components/EventComponents/EventCarousel';

import themes from '../../styleTheme';
const logoImg = require('../../assets/img/logo.png');

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {

    return {
      header: null
    }
  }
  render() {
    return (
      <HomeController>
        {({isLoading, position,...rest}) =>
          !position.latitude || !position.longitude ? null :
          <ScrollView style={styles.homeContainer}>
            <Image source={logoImg} style={{width: 200, height: 150,marginTop: 32, alignSelf: 'center'}} resizeMode={'contain'}/>
            <InlineListController
            resource="broadcasts"
            nearPosition={{...position, radius: 100}}>
              {controllerProps =>
                <View>
                  <Text style={styles.inlineListHeader}>
                    Offerte intorno a te
                  </Text>
                <BroadcastCarousel {...controllerProps} />
                </View>
              }
            </InlineListController>
            <InlineListController
            resource="events"
            sort={{field: '_id', order: -1}}
            >
              {controllerProps =>
                <View>
                  <Text style={styles.inlineListHeader}>
                    Prossimi eventi
                  </Text>
                <EventCarousel {...controllerProps} />
                </View>
              }
            </InlineListController>
            <InlineListController
            resource="businesses"
            nearPosition={{...position, radius: 100}}>
              {controllerProps =>
                <View>
                  <Text style={styles.inlineListHeader}>
                    Locali intorno a te
                  </Text>
                <BusinessCarousel {...controllerProps} />
                </View>
              }
            </InlineListController>

          </ScrollView>

        }

      </HomeController>
    );
  }

}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    padding: 0,
  },
  inlineListHeader: {
    fontFamily: themes.base.fonts.LatoLight,
    fontWeight: '500',
    textAlign: 'left',
    fontSize: 21,
    marginLeft: 8,
    marginBottom: 8,
    color: '#555555'
  },

});
