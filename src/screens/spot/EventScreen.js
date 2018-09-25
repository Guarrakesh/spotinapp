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
    InteractionManager.runAfterInteractions(() => {
      this.props.navigation.navigate('BroadcastsList', {eventId, event});
    });

  }
  handleEventFavoritePress(eventId) {
    //Se l'utente non è loggato, rimanda alla schermata login
    if (!this.props.loggedIn)
      this.props.navigation.navigate('Auth');
  }


  render() {
    const { competitionId } = this.props.navigation.state.params;



    return (
      <ListController
        resource="events"
        filter={{competition: competitionId, extend: 'competitors.competitor'}}>
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

const mapStateToProps = (state) => {
  const { loggedIn } = state.auth;
  return { loggedIn }

};
export default connect(mapStateToProps)(EventScreen);
