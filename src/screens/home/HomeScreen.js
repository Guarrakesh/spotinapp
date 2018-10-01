import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import HomeController from '../../controllers/HomeController';
import InlineListController from '../../controllers/InlineListController';

import BusinessCarousel from '../../components/BusinessComponents/BusinessCarousel';
import BroadcastCarousel from '../../components/BroadcastComponents/BroadcastCarousel';
import EventCarousel from '../../components/EventComponents/EventCarousel';

import themes from '../../styleTheme';
const logoImg = require('../../assets/img/logo-text.png');

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {

    return {
      headerTitle: (<Image
        source={logoImg}
        style={{height: 25, alignSelf: 'center'}}
        resizeMode={'contain'}/>),
        headerStyle: {
          backgroundColor: themes.base.colors.primary.default,
        }
    }
  }

  constructor(props) {
    super(props);

    this.handleEventPress = this.handleEventPress.bind(this);
    this.handleBusinessPress = this.handleBusinessPress.bind(this);
    this.handleBroadcastPress = this.handleBroadcastPress.bind(this);

  }
  handleBroadcastPress(broadcastId, businessId, distance) {
    this.props.navigation.navigate('BusinessProfile', {broadcastId, businessId, distance});
  }
  handleBusinessPress(businessId, distance) {
    this.props.navigation.navigate('BusinessProfile', {businessId, distance});

  }
  handleEventPress(event, eventId) {
    this.props.navigation.navigate('BroadcastsList', {eventId, event});
  }

  render() {
    return (
      <HomeController>
        {({isLoading, position,...rest}) =>
          !position.latitude || !position.longitude ? null :
          <ScrollView style={styles.homeContainer}>
            <InlineListController
            resource="broadcasts"
            nearPosition={{...position, radius: 100}}>
              {controllerProps => !controllerProps.isLoading &&
                <View>
                  <Text style={styles.inlineListHeader}>
                    Offerte intorno a te
                  </Text>
                <BroadcastCarousel onItemPress={this.handleBroadcastPress} {...controllerProps} />
                </View>
              }
            </InlineListController>
            <InlineListController
            resource="events"
            sort={{field: '_id', order: -1}}
            >
              {controllerProps => !controllerProps.isLoading &&
                <View>
                  <Text style={styles.inlineListHeader}>
                    Prossimi eventi
                  </Text>

                <EventCarousel onItemPress={this.handleEventPress} {...controllerProps} />
                </View>
              }
            </InlineListController>
            <InlineListController
            resource="businesses"
            nearPosition={{...position, radius: 100}}>
              {controllerProps => !controllerProps.isLoading &&
                <View>
                  <Text style={styles.inlineListHeader}>
                    Locali intorno a te
                  </Text>
                <BusinessCarousel onItemPress={this.handleBusinessPress} {...controllerProps} />
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
    paddingTop: 16,
  },
  inlineListHeader: {
    fontFamily: themes.base.fonts.LatoLight,
    fontWeight: '500',
    marginLeft: 8,
    textAlign: 'left',
    fontSize: 21,
    marginLeft: 8,
    marginBottom: 8,
    color: '#555555'
  },

});
