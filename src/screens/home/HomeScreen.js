import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import HomeController from '../../controllers/HomeController';
import InlineListController from '../../controllers/InlineListController';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import BusinessCarousel from '../../components/BusinessComponents/BusinessCarousel';
import BroadcastCarousel from '../../components/BroadcastComponents/BroadcastCarousel';
import EventCarousel from '../../components/EventComponents/EventCarousel';

import themes from '../../styleTheme';
const logoImg = require('../../assets/img/logo-text.png');
const localImg = require('../../assets/img/barIcons/local/LocalIcon.png');

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
                id="home_broadcasts_list"
                resource="broadcasts"
                nearPosition={{...position, radius: 100}}>
                {controllerProps =>
                  <View>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                      <MaterialIcon name={'local-offer'} size={21} color={themes.base.colors.text.default} style={{marginTop: 16, marginRight: 5}}/>
                      <Text style={styles.inlineListHeader}>Offerte intorno a te</Text>
                    </View>
                    {controllerProps.isLoading ?
                      <View style={{height: 236, justifyContent: 'center'}}>
                        <ActivityIndicator size="large" color={themes.base.colors.accent.default}/>
                      </View> :
                      <BroadcastCarousel onItemPress={this.handleBroadcastPress} {...controllerProps} />}
                  </View>
                }
              </InlineListController>
              <InlineListController
                id="home_events_list"
                resource="events"
                sort={{field: '_id', order: -1}}
              >
                {controllerProps =>
                  <View>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                      <MaterialCommunity name={'clock'} size={21} color={themes.base.colors.text.default} style={{marginTop: 16, marginRight: 5}}/>
                      <Text style={styles.inlineListHeader}>Prossimi eventi</Text>
                    </View>
                    {controllerProps.isLoading ?
                      <View style={{height: 138, justifyContent: 'center'}}>
                        <ActivityIndicator size="large" color={themes.base.colors.accent.default}/>
                      </View>  :
                      <EventCarousel onItemPress={this.handleEventPress} {...controllerProps} />}
                  </View>
                }
              </InlineListController>
              <InlineListController
                id="home_businesses_list"
                resource="businesses"
                nearPosition={{...position, radius: 100}}>
                {controllerProps =>
                  <View style={{marginBottom: 16}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                      <Image source={localImg} style={{width: 21, height: 21, marginTop: 16, marginRight: 5}}/>
                      <Text style={styles.inlineListHeader}>Locali intorno a te</Text>
                    </View>
                    {controllerProps.isLoading ?
                      <View style={{height: 166, justifyContent: 'center'}}>
                        <ActivityIndicator size="large" color={themes.base.colors.accent.default}/>
                      </View>  :
                      <BusinessCarousel onItemPress={this.handleBusinessPress} {...controllerProps} />}
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
    backgroundColor: themes.base.colors.white.default,
    flex: 1,
    padding: 0,

    paddingTop: 16,
  },
  inlineListHeader: {
    fontFamily: themes.base.fonts.LatoBold,
    textAlign: 'center',
    fontSize: 21,
    marginTop: 8,
    color: themes.base.colors.text.default
  },

});
