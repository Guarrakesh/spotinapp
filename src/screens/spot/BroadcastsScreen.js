import React from 'react';
import { connect } from 'react-redux';
import View from '../../components/common/View';
import {Text, StyleSheet, Animated, ActivityIndicator, InteractionManager, Button, Platform} from 'react-native';
import ActionButton from 'react-native-action-button';
import moment from 'moment';
import 'moment/locale/it';

import BroadcastsList from '../../components/SpotComponents/BroadcastsList';
import Icon from 'react-native-vector-icons/Feather';
import {Fonts} from "../../components/common/Fonts";
import { getBroadcastsRequest } from '../../actions/broadcasts';

import themes from "../../styleTheme";

const HEADER_HEIGHT = 100;


class BroadcastsScreen extends React.Component {

  state = {
    scrollAnim: new Animated.Value(0),
    offsetAnim: new Animated.Value(0)
  };


  constructor() {
    super();

    this.handleBusinessPress = this.handleBusinessPress.bind(this);

  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    const params = state.params || {};
    const { event } = params;

    return {
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
    InteractionManager.runAfterInteractions(() => {
      const {event} = this.props.navigation.state.params;
      const position = {
        lat: this.props.latitude,
        lng: this.props.longitude
      };

      if (!event.broadcasts) {
        this.props.dispatch(getBroadcastsRequest(event._id, position));
      }

      this.state.scrollAnim.addListener(this._handleScroll);
    });


  }
  _handleScroll = ({ value }) => {
    this._previousScrollValue = this._currentScrollValue;
    this._currentScrollValue = value;
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
    if (previous > current && current < HEADER_HEIGHT) {
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


  handleBusinessPress(broadcast) {
    this.props.navigation.navigate('BusinessProfileScreen', {business: broadcast.business});

  }

  bottomView = (broadcasts) => {
    if(!broadcasts || broadcasts.length === 0){
      return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{marginBottom: 16, fontFamily: Fonts.LatoMedium, fontSize: 16}}>Non ci sono locali che trasmettono questo evento</Text>
          <Button title={"Contattaci"}/>
        </View>
      )
    }
    else {
      return (

          <BroadcastsList
            onScroll={Animated.event(
                [ { nativeEvent: { contentOffset: { y: this.state.scrollAnim }}}]

            )}
            onMomentumScrollBegin={ this._handleMomentumScrollBegin }
            onMomentumScrollEnd={this._handleMomentumScrollEnd }
            onScrollEndDrag={this._handleScrollEndDrag}
              broadcasts={broadcasts} onItemPress={this.handleBusinessPress}
            style={{paddingTop: HEADER_HEIGHT + 32}}
          />
        )
    }
  };

  render() {
    const { scrollAnim, offsetAnim } = this.state;

    const translateY = Animated.add(scrollAnim, offsetAnim).interpolate({
      inputRange: [0, HEADER_HEIGHT],
      outputRange: [0, -HEADER_HEIGHT],
      extrapolate: 'clamp'
    });
    const {event} = this.props.navigation.state.params;
    let broadcasts = event.broadcasts;
    const {currentlySending} = this.props;

    let date = moment(event.start_at).locale('it').format('D MMM - hh:mm').toUpperCase();

    if(currentlySending){
      return(
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={themes.base.colors.accent.default} />
        </View>
      )
    }<Animated.View style={[styles.subHeader, { transform: [{translateY}]}]}>
      <Animated.Text style={[styles.competitionName]}>{event.competition.name}</Animated.Text>
      <Text style={styles.eventName}>{event.name}</Text>
      <Animated.Text style={[styles.date]}>{date}</Animated.Text>
    </Animated.View>


    return (
      <View style={styles.container}>


        {this.bottomView(broadcasts)}

        <ActionButton
            title=''
            position={"right"}
            buttonColor={themes.base.colors.accent.default}
            size={52}
            offsetY={32}
            onPress={() => {this.props.navigation.navigate('BusinessMapInSpot', {broadcasts: broadcasts})}}
            icon={<Icon name="map" size={24}
                        style={{color: themes.base.colors.white.default}}/>}
        />
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
  const { currentlySending, error} = state.entities;
  const { latitude, longitude } = state.location;
  const { loggedIn } = state.auth;
  return {
    currentlySending, error, loggedIn, latitude, longitude,
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
