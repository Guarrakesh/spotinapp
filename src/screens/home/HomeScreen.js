import React from 'react';
import { connect } from 'react-redux';

import {View, Text, StyleSheet, ScrollView, Image, ActivityIndicator} from 'react-native';
import { Button } from 'react-native-elements';
import { withNamespaces } from 'react-i18next';

import HomeController from '../../controllers/HomeController';
import InlineListController from '../../controllers/InlineListController';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunity from "react-native-vector-icons/MaterialCommunityIcons";
import BusinessCarousel from '../../components/BusinessComponents/BusinessCarousel';
import BroadcastCarousel from '../../components/BroadcastComponents/BroadcastCarousel';
import EventCarousel from '../../components/EventComponents/EventCarousel';
import { entityView } from "../../actions/view";

import themes from '../../styleTheme';
import {Fonts} from "../../components/common/Fonts";
const logoImg = require('../../assets/img/logo-text/logo-text.png');
const localImg = require('../../assets/img/barIcons/local/LocalIcon.png');

import { refreshList as refreshListAction } from '../../actions/listActions';



class HomeScreen extends React.Component {

  HOME_BROADCASTS_LIST_ID = "home_broadcasts_list";
  HOME_EVENTS_LIST_ID = "home_events_list";
  HOME_BUSINESSES_LIST_ID = "home_businesses_list";
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
  };

  constructor(props) {
    super(props);

    this.handleEventPress = this.handleEventPress.bind(this);
    this.handleBusinessPress = this.handleBusinessPress.bind(this);
    this.handleBroadcastPress = this.handleBroadcastPress.bind(this);
  }

  componentDidMount() {
    console.log("params", this.props.navigation.state);
    if (this.props.navigation.state.params) {
      const {goTo, screen} = this.props.navigation.state.params;
      if (goTo) {
        this.props.navigation.navigate(screen);
      }
    }
  }

  handleBroadcastPress(broadcast, distance) {
    this.props.entityView('broadcast', broadcast._id);
    this.props.navigation.navigate('BusinessProfileScreen', {
      broadcastId: broadcast._id,
      businessId: broadcast.business,
      distance,
      id: broadcast.business //for analytics
    });
  }


  handleBusinessPress(businessId, distance) {
    this.props.entityView('business', businessId);
    this.props.navigation.navigate('BusinessProfileScreen', {
      businessId,
      distance,
      id: businessId, //for analytics

    });

  }


  handleEventPress(event, eventId) {
    this.props.entityView('sportevent', eventId);
    this.props.navigation.navigate('BroadcastsList', {eventId, event});
  }

  handleRefresh(){
    this.props.refreshList("broadcasts", this.HOME_BROADCASTS_LIST_ID );
    this.props.refreshList("businesses", this.HOME_BUSINESSES_LIST_ID );
    this.props.refreshList("events", this.HOME_EVENTS_LIST_ID );
  }


  render() {
    const { t } = this.props;
    return (
      <HomeController>
        {({isLoading, position,...rest}) =>
          !position ?
            <View style={{flex: 1, justifyContent: 'center'}}>
              <ActivityIndicator size="large" color={themes.base.colors.activityIndicator.default}/>
            </View> :
            <ScrollView
              style={styles.homeContainer}
            >
              <InlineListController
                id={this.HOME_BROADCASTS_LIST_ID}
                resource="broadcasts"
                nearPosition={{...position, radius: 99999}}>
                {controllerProps => controllerProps.isLoading ?
                  <View style={{height: 325, justifyContent: 'center'}}>
                    <ActivityIndicator size="large" color={themes.base.colors.activityIndicator.default}/>
                  </View> :
                  <View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 8}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <MaterialIcon name={'local-offer'} size={21} color={themes.base.colors.text.default} style={{marginRight: 5, marginTop: 3}}/>
                        <Text style={styles.inlineListHeader}>{t('home.nearOffers')}</Text>
                      </View>

                    </View>
                    <BroadcastCarousel onItemPress={this.handleBroadcastPress} {...controllerProps} />

                  </View>
                }
              </InlineListController>
              <InlineListController

                id={this.HOME_EVENTS_LIST_ID}
                resource="events"
                filter={{next_events: true}}
                sort={{field: '_id', order: -1}}
              >
                {controllerProps => controllerProps.isLoading ?
                  null :
                  <View>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 8, marginTop: 8, justifyContent: 'space-between'}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <MaterialCommunity name={'clock'} size={21} color={themes.base.colors.text.default} style={{marginRight: 5, marginTop: 3}}/>
                        <Text style={styles.inlineListHeader}>{t('home.nextEvents')}</Text>
                      </View>
                      <View>
                        <Button
                          title={t('home.seeAll').toUpperCase()}
                          titleStyle={styles.seeAllTitle}
                          buttonStyle={styles.seeAllButton}
                          onPress={() => this.props.navigation.navigate('SportList')}
                        />
                      </View>
                    </View>
                    <EventCarousel onItemPress={this.handleEventPress} {...controllerProps} />
                  </View>
                }
              </InlineListController>
              <InlineListController
                id={this.HOME_BUSINESSES_LIST_ID}
                resource="businesses"
                nearPosition={{...position, radius: 99999}}>
                {controllerProps => controllerProps.isLoading ?
                  null :
                  <View style={{marginBottom: 16}}>
                    <View style={{flexDirection: 'row', alignItems: 'center', marginLeft: 8, marginTop: 8, justifyContent: 'space-between'}}>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image source={localImg} style={{width: 21, height: 21, marginRight: 5}}/>
                        <Text style={styles.inlineListHeader}>{t("home.nearBusinesses")}</Text>
                      </View>
                      <View>
                        <Button
                          title={t('home.seeAll').toUpperCase()}
                          titleStyle={styles.seeAllTitle}
                          buttonStyle={styles.seeAllButton}
                          onPress={() => this.props.navigation.navigate('BusinessScreen')}
                        />
                      </View>

                    </View>
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

  }

});

const mapDispatchToProps = {
  refreshList: refreshListAction,
  entityView,
};

export default withNamespaces()(connect(null, mapDispatchToProps)(HomeScreen));