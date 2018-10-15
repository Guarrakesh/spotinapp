import React from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView, ActivityIndicator, View, InteractionManager} from 'react-native';


import EventList from '../../components/SpotComponents/EventList';
import ListController from '../../controllers/ListController';


class EventScreen extends React.Component {

  constructor() {
    super();

    this.handleEventPress = this.handleEventPress.bind(this);
    this.handleEventFavoritePress = this.handleEventFavoritePress.bind(this);

  }

  handleEventPress(eventId, event) {

    this.props.navigation.navigate('BroadcastsList', {eventId, event});

  }
  handleEventFavoritePress(eventId) {
    //Se l'utente non è loggato, rimanda alla schermata login

  }


  render() {
    const { competitionId } = this.props.navigation.state.params;



    return (
        <ListController
            id={`${competitionId}_event_list`}
            resource="events"
            filter={{competition: competitionId}}>
          { controllerProps => <EventList
              onItemPress={this.handleEventPress}
              onFavoritePress={this.handleEventFavoritePress}
              { ...controllerProps }
          />
          }
        </ListController>

    )


  }
}


export default connect(null, {

})(EventScreen);
