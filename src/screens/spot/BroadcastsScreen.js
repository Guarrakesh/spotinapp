import React from 'react';
import { connect } from 'react-redux';
import View from '../../components/common/View';
import {Text, StyleSheet, ActivityIndicator, InteractionManager, Platform} from 'react-native';
import moment from 'moment';
import 'moment/locale/it';

import BroadcastsList from '../../components/SpotComponents/BroadcastsList';
import ListController from '../../controllers/ListController';


import themes from "../../styleTheme";


class BroadcastsScreen extends React.Component {

  constructor() {
    super();

    this.handleBusinessPress = this.handleBusinessPress.bind(this);
    this.handleMapPress = this.handleMapPress.bind(this);
  }
  handleMapPress(data) {
    this.props.navigation.navigate('BusinessMapInSpot', {...data});

  }
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const params = state.params || {};
    const { eventId } = params;

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


  handleBusinessPress(id, broadcast, distance) {
    this.props.navigation.navigate('BusinessProfileScreen', {broadcastId: id, business: broadcast.business, distance});

  }


 /* bottomView = (broadcasts) => {

    const { eventId } = this.props.navigation.state.params;


    if(!broadcasts || broadcasts.length === 0){
      return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{marginBottom: 16, fontFamily: Fonts.LatoMedium, fontSize: 16}}>Non ci sono locali che trasmettono questo evento</Text>
          <Button title={"Contattaci"}/>
        </View>
      )
    }
  };*/

  render() {

    const { event, eventId } = this.props.navigation.state.params;
    const position = {
      lat: this.props.latitude,
      lng: this.props.longitude
    };
    let date = moment(event.start_at).locale('it').format('D MMM - hh:mm').toUpperCase();

    //TODO: Fare qualcosa qui in caso di mancata posizione!
    if (!position) return null;


    const filter = {
      latitude: position.lat,
      longitude: position.lng,
      radius: 50,
      event: eventId
    };
    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Text style={styles.competitionName}>{event.competition.name}</Text>
          <Text style={styles.eventName}>{event.name}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <ListController
            perPage="10"
            resource="broadcasts"
            filter={filter}>
          { controllerProps => <BroadcastsList
              onMapPress={this.handleMapPress}
              { ...controllerProps } onItemPress={this.handleBusinessPress}/>}
        </ListController>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  const { latitude, longitude } = state.location;
  const { loggedIn } = state.auth;
  return {
    loggedIn, latitude, longitude
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1
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
    color: themes.base.colors.text.default,
    marginBottom: 8,
    fontWeight: '700',

  },
  competitionName: {
    fontSize: 18,
    fontWeight: '700',
    color: themes.base.colors.text.default,

  },
  date: {
    color: themes.base.colors.text.default,

  },
  mapIcon: {

  }
});
export default connect(mapStateToProps)(BroadcastsScreen);
