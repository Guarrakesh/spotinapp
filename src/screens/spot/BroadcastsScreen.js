import React from 'react';
import { connect } from 'react-redux';
import View from '../../components/common/View';
import {Text, StyleSheet, Animated, ActivityIndicator, InteractionManager, Button, Platform} from 'react-native';
import ActionButton from 'react-native-action-button';
import moment from 'moment';
import 'moment/locale/it';

import BroadcastsList from '../../components/SpotComponents/BroadcastsList';
import ListController from '../../controllers/ListController';

import { Fonts } from "../../components/common/Fonts";

import themes from "../../styleTheme";

const HEADER_HEIGHT = 100;


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
  }

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const params = state.params || {};
    const { eventId } = params;

    return {
      headerBackTitle: null,
      title: "Locali vicini",
      headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center',
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
  }

  componentDidMount() {
    this.state.scrollAnim.addListener(this._handleScroll);
  }
  handleBusinessPress(broadcastId, businessId, distance) {

    this.props.navigation.navigate('BusinessProfileScreen', {broadcastId, businessId, distance});
  }
  handleMapPress(data) {
    const { eventId } = this.props.navigation.state.params;
    this.props.navigation.navigate('BusinessMapInSpot', {...data, listId: this.listId(eventId)});

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

    const {currentlySending} = this.props;

    let date = moment(event.start_at).locale('it').format('D MMM - hh:mm').toUpperCase();

    //TODO: Fare qualcosa qui in caso di mancata posizione!
    if (!position) return null;


    const nearPosition = {
      latitude: position.lat,
      longitude: position.lng,
      radius: 50,

    };
    if(currentlySending){
      return(
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={themes.base.colors.accent.default} />
        </View>
      )
    }

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
            <BroadcastsList
              onScroll={Animated.event(
                [ { nativeEvent: { contentOffset: { y: this.state.scrollAnim }}}]

              )}
              { ...controllerProps }
              onMapPress={this.handleMapPress}
              onMomentumScrollBegin={ this._handleMomentumScrollBegin }
              onMomentumScrollEnd={this._handleMomentumScrollEnd }
              onScrollEndDrag={this._handleScrollEndDrag}
              onItemPress={this.handleBusinessPress}
              style={{paddingTop: HEADER_HEIGHT + 32, }}
            />}
        </ListController>
        <Animated.View elevation={2} style={[styles.subHeader, { transform: [{translateY}]}]}>
          <Animated.Text style={[styles.competitionName]}>{event.competition.name}</Animated.Text>
          <Text style={styles.eventName}>{event.name}</Text>
          <Animated.Text style={[styles.date]}>{date}</Animated.Text>
        </Animated.View>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  const { latitude, longitude } = state.location.coordinates;
  const { loggedIn } = state.auth;
  return {
    loggedIn, latitude, longitude
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,


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
    fontSize: 18,
    color: themes.base.colors.text.default,
    marginBottom: 8,
    fontWeight: '700',

  },
  competitionName: {
    fontSize: 18,
    fontWeight: '300',
    color: themes.base.colors.text.default,

  },
  date: {
    color: themes.base.colors.text.default,

  },
  mapIcon: {

  }
});
export default connect(mapStateToProps)(BroadcastsScreen);
