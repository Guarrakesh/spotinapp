import React from 'react';
import { connect } from 'react-redux';
import {Text, ScrollView, ActivityIndicator, View, InteractionManager, BackHandler} from 'react-native';
import i18n from '../../i18n/i18n';
/* Firebase */
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';

import EventList from '../../components/SpotComponents/EventList';
import ListController from '../../controllers/ListController';
import { crudCreate } from '../../actions/dataActions';
import PushNotification from "react-native-push-notification";
import moment from "moment";
import themes from "../../styleTheme";



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

    //Setto il canale
    const channel = new firebase.notifications.Android.Channel(
      'favorite_events_notification',
      'Fav Notification',
      firebase.notifications.Android.Importance.Max
    ).setDescription('Scheduled notification 6 hours before favorite event');

    //Creo il canale
    firebase.notifications().android.createChannel(channel);

    // Creo Notification Listener
    firebase.notifications().onNotification((notification: Notification) => {
      // Process your notification as required
      console.log("NOTIFICATION:", notification);
      notification
        .android.setChannelId('favorite_events_notification')
        .android.setSmallIcon('ic_launcher'); //TODO: icona piccola da settare
      firebase.notifications()
        .displayNotification(notification);

    });

    //Creo la notifica
    const localNotification = new firebase.notifications.Notification({
      sound: 'default',
      //show_in_foreground: true,
      show_in_background: true,
    })
      .setNotificationId('hh2')
      .setTitle(`${event.name} ${i18n.t("pushNotification.favorite.title")}`)
      .setBody(`${i18n.t("pushNotification.favorite.message")}`)
      .setData({
        type: 'start',
      })
      .android.setChannelId('favorite_events_notification') // e.g. the id you chose above
      .android.setSmallIcon('ic_launcher') // create this icon in Android Studio
      .android.setColor(themes.base.colors.accent.default) // you can set a color here
      .android.setPriority(firebase.notifications.Android.Priority.High);


    firebase.notifications()
      .scheduleNotification(localNotification, {
        fireDate: eventNotification.getTime(),
      })
      .catch(err => console.error(err));
  }

  componentWillUnmount() {

    /* Firebase Push Notification */
    //this.notificationListener();

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
