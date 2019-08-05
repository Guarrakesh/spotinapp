import React from 'react';
import { connect } from 'react-redux';
import {Text, StyleSheet, Animated, ActivityIndicator, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import moment from 'moment';
import 'moment/min/moment-with-locales';


import View from '../../components/common/View';
import BroadcastsList from '../../components/SpotComponents/BroadcastsList';
import ListController from '../../controllers/ListController';
import ReferenceField from "../../components/common/ReferenceField"
import themes from "../../styleTheme";
import i18n from '../../i18n/i18n';
import { entityView } from "../../actions/view";

const Fonts = themes.base.fonts;
const HEADER_HEIGHT = 100;
moment.locale(DeviceInfo.getDeviceLocale());
class BroadcastsScreen extends React.Component {

  state = {
    scrollAnim: new Animated.Value(0),
    offsetAnim: new Animated.Value(0)
  };

  listId = (eventId) => (
    `${eventId}_broadcasts_list`
  );

  constructor() {
    super();

    this.handleBusinessPress = this.handleBusinessPress.bind(this);
    this.handleMapPress = this.handleMapPress.bind(this);
    this.handleContactUsPress = this.handleContactUsPress.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const params = state.params || {};
    const { eventId } = params;

    return {
      headerBackTitle: null,
      title:  i18n.t("browse.nearOffers"),
      headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center',
        color: themes.base.colors.text.default,
        flex: 1,
        marginRight: Platform.OS === 'android' ? 75 : null,
      },
      headerStyle: {
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'transparent',
        elevation: 0,
        borderBottomWidth: 0,
        backgroundColor: themes.base.colors.primary.default
      },
    }
  };

  componentDidMount() {
    this.state.scrollAnim.addListener(this._handleScroll);
  }

  handleBusinessPress(broadcast, distance) {

    this.props.entityView('broadcast', broadcast._id);
    this.props.navigation.navigate('BusinessProfileScreen', {
      broadcastId: broadcast._id,
      businessId: broadcast.business,
      distance,
      //title: broadcast
    });
  }

  //Navigazione alla mappa
  handleMapPress(data) {
    const { eventId } = this.props.navigation.state.params;
    this.props.navigation.navigate('BusinessMapInSpot', {...data, listId: this.listId(eventId)});

  }

  //Navigazione al modulo di contatto
  handleContactUsPress(){
    const { eventId, event } = this.props.navigation.state.params;
    this.props.navigation.navigate('ContactUs', {eventId, event});
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeListener(this._handleScroll);
  }

  _handleScroll = ({ value }) => {

    this._previousScrollValue = this._currentScrollValue;
    this._currentScrollValue = Math.round(value);

  };

  _handleScrollEndDrag = () => {
    this._scrollEndTimer = setTimeout(this._handleMomentumScrollEnd, 250);
  };

  _handleMomentumScrollBegin = () => {
    clearTimeout(this._scrollEndTimer);
  };

  _handleMomentumScrollEnd = () => {
    const previous = this._previousScrollValue;
    const current = this._currentScrollValue;
    if (previous > current || current < HEADER_HEIGHT) {
      Animated.spring(this.state.offsetAnim, {
        toValue: -current,
        tension: 300,
        friction: 35
      }).start();
    } else {
      Animated.timing(this.state.offsetAnim, {
        toValue: 0,
        duration: 500
      }).start();
    }
  };


  render() {
    const { scrollAnim, offsetAnim } = this.state;

    const { event, eventId } = this.props.navigation.state.params;
    const position = {
      lat: this.props.latitude,
      lng: this.props.longitude
    };
    const translateY = Animated.add(scrollAnim, offsetAnim).interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: 'clamp'
    });



    let date = event ? moment(event.start_at).format('D MMMM [' + i18n.t("common.at") +'] HH:mm') : "";

    //TODO: Fare qualcosa qui in caso di mancata posizione!cd ios
    if (!position) return null;


    const nearPosition = {
      latitude: position.lat,
      longitude: position.lng,
      radius: 99999,

    };
    const header = event => (
      <Animated.View elevation={2} style={[styles.subHeader, { transform: [{translateY}], flexWrap: 'wrap'}]}>
        <Animated.Text adjustsFontSizeToFit={true} numberOfLines={1} style={[styles.competitionName]}>{event.competition.name}</Animated.Text>
        <Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.eventName}>{event.name}</Text>
        <Animated.Text adjustsFontSizeToFit={true} numberOfLines={1} style={styles.date}>{date}</Animated.Text>
      </Animated.View>
    );
    return (
      <View style={styles.container}>
        <ListController
          id={this.listId(eventId)}
          perPage="15"
          resource="broadcasts"
          sort={{field: 'dist.calculated', order: 'asc'}} //non funziona
          filter={{event: eventId}}
          nearPosition={nearPosition}
        >
          { controllerProps =>
            controllerProps.isLoading
              ? (
                <View style={themes.base.noContentView}>
                  <ActivityIndicator size="large" color={themes.base.colors.activityIndicator.default}/>
                </View>
              )
              :
              <BroadcastsList
                onScroll={Animated.event(
                  [ { nativeEvent: { contentOffset: { y: this.state.scrollAnim }}}]

                )}
                { ...controllerProps }
                onMapPress={this.handleMapPress}
                onContactUsPress={this.handleContactUsPress}
                onMomentumScrollBegin={ this._handleMomentumScrollBegin }
                onMomentumScrollEnd={this._handleMomentumScrollEnd }
                onScrollEndDrag={this._handleScrollEndDrag}
                onItemPress={this.handleBusinessPress}
                style={{paddingTop: HEADER_HEIGHT + 32, paddingLeft: 8, paddingRight: 8 }}
              />}
        </ListController>
        { event
          ? header(event)
          : (
            <ReferenceField reference="events" source="id" record={{id: eventId}}>
              {({record}) => header(record)}
            </ReferenceField>
          )}
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  const { latitude, longitude } = state.location.device.position ? state.location.device.position.coords : {};
  const { loggedIn } = state.auth;
  return {
    loggedIn, latitude, longitude
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.base.colors.white.default
  },
  subHeader: {
    height: HEADER_HEIGHT,
    alignItems: 'center',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: themes.base.colors.primary.default
  },
  eventName: {
    fontSize: 24,
    fontFamily: Fonts.LatoBold,
    color: themes.base.colors.text.default,
    marginBottom: 8,
  },
  competitionName: {
    fontSize: 18,
    fontWeight: '300',
    color: themes.base.colors.text.default,

  },
  date: {
    fontSize: 20,
    fontFamily: Fonts.LatoLight,
    color: themes.base.colors.text.default,

  },
  mapIcon: {

  }
});
export default connect(mapStateToProps, {
  entityView
})(BroadcastsScreen);
