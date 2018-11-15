import React from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView, ActivityIndicator, View, InteractionManager} from 'react-native';
import i18n from '../../i18n/i18n';

import EventList from '../../components/SpotComponents/EventList';
import ListController from '../../controllers/ListController';
import { crudCreate } from '../../actions/dataActions';
import PushNotification from "react-native-push-notification";
import moment from "moment";


class EventScreen extends React.Component {


  constructor() {
    super();

    this.handleEventPress = this.handleEventPress.bind(this);
    this.handleEventFavoritePress = this.handleEventFavoritePress.bind(this);
  }

  handleEventPress(eventId, event) {

    this.props.navigation.navigate('BroadcastsList', {eventId, event});

  }
  handleEventFavoritePress(event, eventObj) {
    //Se l'utente non è loggato, rimanda alla schermata login
    this.props
        .crudCreate('events', { event }, `/users/${this.props.userId}`, undefined, 'profile_savedEvents_list');

    //Notifica 6 ore prima dell'evento
    this.createPushNotification(eventObj);

  }

  createPushNotification(event) {

    const eventDate = new Date(event.start_at);
    const eventTimestamp = eventDate.getTime();
    const eventNotification = new Date(eventTimestamp - (6 * 3600000)); //6 ore prima dell'evento

    console.log("Data evento", eventDate);
    console.log("Data notifica", eventNotification);
    console.log("CreatePushNotification", event.name);

    PushNotification.localNotificationSchedule({
      title: `${event.name} ${i18n.t("pushNotification.favorite.title")}`,
      message: `${i18n.t("pushNotification.favorite.message")}`,
      date: eventNotification
    });
  }


  render() {
    const { competitionId } = this.props.navigation.state.params;



    return (
        <ListController
            id={`${competitionId}_event_list`}
            resource="events"
            infiniteScroll
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


export default connect(state => ({
    userId: state.auth.profile ? state.auth.profile._id : undefined
    })
, {
  crudCreate
})(EventScreen);
