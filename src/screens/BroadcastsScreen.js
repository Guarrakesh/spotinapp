import React from 'react';

import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import { Button } from 'react-native-elements';
import BroadcastsList from '../components/SpotComponents/BroadcastsList';
import Icon from 'react-native-vector-icons/Feather';
import { getBroadcastsRequest } from '../actions/broadcasts';

import themes from "../styleTheme";


class BroadcastsScreen extends React.Component {

  constructor() {
    super();

    this.handleBusinessPress = this.handleBusinessPress.bind(this);

  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    const params = state.params || {};
    const { event } = params;

    return {
      /*headerStyle: {
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          height: Dimensions.get('window').width / 3,
          backgroundColor: themes.base.colors.primary.default
      },
      headerTitle: (props) => {
        return (<View>
            <Text>Serie A</Text>
            <Text>Juventus ./ Napoli</Text>
        </View>)
      },*/
      headerStyle: {
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'transparent',
        borderBottomWidth: 0,
        backgroundColor: themes.base.colors.primary.default
      },

      title: "Locali vicini"

    }
  }

  componentDidMount() {

    const {event} = this.props.navigation.state.params;
    const position = {
      lat: this.props.latitude,
      lng: this.props.longitude
    };

    if (!event.broadcasts) {
      this.props.dispatch(getBroadcastsRequest(event._id, position));
    }

  }

  handleBusinessPress(business) {
    this.props.navigation.navigate('BusinessProfileScreen', {business: business});

  }

  render() {

    const {event} = this.props.navigation.state.params;
    let broadcasts = event.broadcasts;
    const {currentlySending} = this.props;

    // if (!broadcasts || !broadcasts.docs || broadcasts.docs.length === 0)
    //     return null;


    let date = new Date(event.start_at);
    let dayString, timeString,weekOfDayString;
    if (date) {

      weekOfDayString = date.toLocaleString('it-IT', {weekday: 'short'}).toString().toLocaleUpperCase();
      dayString = `${date.getDay()} ${date.toLocaleString('it-IT', { month: 'short'}).toString()}`;
      timeString = `${date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}`;

    }
    console.log(this.props);
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Text style={styles.competitionName}>{event.competition.name}</Text>
          <Text style={styles.eventName}>{event.name}</Text>
          <Text style={styles.date}>{`${weekOfDayString} ${dayString} - ${timeString}`}</Text>
        </View>
        <BroadcastsList broadcasts={broadcasts} onItemPress={this.handleBusinessPress}/>
        <ActionButton
          title=''
          position={"right"}
          buttonColor={themes.base.colors.accent.default}
          size={52}
          offsetY={32}
          onPress={() => {this.props.navigation.navigate('BusinessMap', {broadcasts: broadcasts})}}
          icon={<Icon name="map" size={24}
                      style={{color: themes.base.colors.white.default}}/>}
        />
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
    flex: 1
    // top: 0,
    // bottom: 0,
    // right: 0,
    // left: 0,
  },
  subHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: themes.base.colors.primary.default,
    paddingBottom: 48,
    paddingTop: 16,
    marginBottom: -32,
    zIndex: 0,
  },
  eventName: {
    fontSize: 18,
    color: themes.base.colors.white.light,
    marginBottom: 8,
    fontWeight: '700',

  },
  competitionName: {
    fontSize: 18,
    fontWeight: '700',
    color: themes.base.colors.white.light,

  },
  date: {
    color: themes.base.colors.text.default,

  },
  mapIcon: {

  }
});
export default connect(mapStateToProps)(BroadcastsScreen);
