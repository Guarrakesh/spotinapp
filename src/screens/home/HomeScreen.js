import React from 'react';
import {View, Text, StyleSheet, ScrollView, Image, ActivityIndicator, Platform} from 'react-native';
import { Button } from 'react-native-elements';
import HomeController from '../../controllers/HomeController';
import InlineListController from '../../controllers/InlineListController';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import BusinessCarousel from '../../components/BusinessComponents/BusinessCarousel';
import BroadcastCarousel from '../../components/BroadcastComponents/BroadcastCarousel';
import EventCarousel from '../../components/EventComponents/EventCarousel';

import themes from '../../styleTheme';
import {Fonts} from "../../components/common/Fonts";
const logoImg = require('../../assets/img/logo-text.png');
const localImg = require('../../assets/img/barIcons/local/LocalIcon.png');

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {

    return {
      headerTitle: (<Image
        source={logoImg}
        style={{height: 25, alignSelf: 'center', width: '100%'}}
        resizeMode={'contain'}/>),
      headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
        //marginLeft: Platform.OS === 'android' ? 75 : null,
      },
      headerStyle: {
        backgroundColor: themes.base.colors.primary.default,
      },
      headerBackTitle: null
    }
  }

  constructor(props) {
    super(props);

    this.handleEventPress = this.handleEventPress.bind(this);
    this.handleBusinessPress = this.handleBusinessPress.bind(this);
    this.handleBroadcastPress = this.handleBroadcastPress.bind(this);

  }
  handleBroadcastPress(broadcastId, businessId, distance) {
    this.props.navigation.navigate('BusinessProfileScreen', {broadcastId, businessId, distance});
  }
  handleBusinessPress(businessId, distance) {
    this.props.navigation.navigate('BusinessProfileScreen', {businessId, distance});

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
                    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 8}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <MaterialIcon name={'local-offer'} size={21} color={themes.base.colors.text.default} style={{marginRight: 5, marginTop: 3}}/>
                        <Text style={styles.inlineListHeader}>Offerte intorno a te</Text>
                      </View>
                    </View>
                    {controllerProps.isLoading ?
                      <View style={{height: 325, justifyContent: 'center'}}>
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
                    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 8}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <MaterialCommunity name={'clock'} size={21} color={themes.base.colors.text.default} style={{marginRight: 5, marginTop: 3}}/>
                        <Text style={styles.inlineListHeader}>Prossimi eventi</Text>
                      </View>
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
                    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 8, justifyContent: 'space-between'}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={localImg} style={{width: 21, height: 21, marginRight: 5}}/>
                        <Text style={styles.inlineListHeader}>Locali intorno a te</Text>
                      </View>
                      <View>
                        <Button
                          title={'VEDI TUTTI ➔'}
                          titleStyle={styles.seeAllTitle}
                          buttonStyle={styles.seeAllButton}
                          onPress={() => this.props.navigation.navigate('BusinessScreen')}
                        />
                      </View>
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
    textAlign: 'left',
    fontSize: 21,
    color: themes.base.colors.text.default,
  },
  seeAllButton: {
    backgroundColor: 'transparent',
    elevation: 0
  },
  seeAllTitle: {
    color: themes.base.colors.text.default,
    fontFamily: Fonts.LatoMedium,
    fontSize: 14,
    paddingBottom: 0,
    textDecorationLine: 'underline'
  }

});
