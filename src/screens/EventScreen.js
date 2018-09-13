import React from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView, ActivityIndicator, View, InteractionManager} from 'react-native';

import { getEventsRequest } from '../actions/events';
import EventList from '../components/SpotComponents/EventList';
import themes from "../styleTheme";

class EventScreen extends React.Component {

  state = { didFinishTransition: false };

  constructor() {
    super();

    this.handleEventPress = this.handleEventPress.bind(this);
    this.handleEventFavoritePress = this.handleEventFavoritePress.bind(this);
  }

  componentDidMount() {

    InteractionManager.runAfterInteractions(() => {

      const { competition } = this.props.navigation.state.params;
      let events = this.props.events.filter(event => event.competition._id == competition._id);
      this.setState({didFinishTransition: true});
      //Ora events ha solo eventi della competizione attuale
      if (competition && events.length === 0)
        this.props.dispatch(getEventsRequest(competition._id));
    });


  }

  handleEventPress(item) {
    InteractionManager.runAfterInteractions(() => {
      this.props.navigation.navigate('BroadcastsList', {event: item});
    });

  }
  handleEventFavoritePress(event) {
    //Se l'utente non è loggato, rimanda alla schermata login
    if (!this.props.loggedIn)
      this.props.navigation.navigate('Auth');
  }
  render() {
    const { competition } = this.props.navigation.state.params;
    const { events, currentlySending } = this.props;

    let filteredEvents = events.filter(event => event.competition._id == competition._id);

    if (currentlySending){
      return(
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={themes.base.colors.accent.default} />
        </View>
      )
    }

    if ((!competition || filteredEvents.length === 0) && this.state.didFinishTransition){
      return (
        <Text style={{alignSelf: 'center', marginTop:16, marginBottom: 16, fontSize: 20}}>Non ci sono eventi al momento</Text>
      )
    }


    return (
      <View>
        <EventList events={filteredEvents} onItemPress={this.handleEventPress} onFavoritePress={this.handleEventFavoritePress}/>
      </View>

    )


  }
}

const mapStateToProps = (state) => {
  const { events, currentlySending, error} = state.entities;
  const { loggedIn } = state.auth;
  return {
    events, currentlySending, error, loggedIn
  }

};
export default connect(mapStateToProps)(EventScreen);
