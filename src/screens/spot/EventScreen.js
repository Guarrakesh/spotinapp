import React from 'react';
import { connect } from 'react-redux';
import {Alert} from 'react-native';
import i18n from '../../i18n/i18n';
/* Firebase */
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';

import EventList from '../../components/SpotComponents/EventList';
import ListController from '../../controllers/ListController';
import { addFavoriteEvent, deleteFavoriteEvent } from '../../actions/events';
import { entityView } from "../../actions/view";

import themes from "../../styleTheme";


class EventScreen extends React.Component {


  constructor() {
    super();

    this.handleEventPress = this.handleEventPress.bind(this);
    this.handleEventFavoritePress = this.handleEventFavoritePress.bind(this);
  }

  handleEventPress(eventId, event) {
    this.props.entityView('sportevent', eventId);
    this.props.navigation.navigate('BroadcastsList', {eventId, event, title: event.name});

  }

  handleEventFavoritePress(event, eventObj) {

    //Se l'utente non è loggato, rimanda alla schermata login
    if(this.props.userId){
      if(eventObj.isUserFavorite){
        this.props.deleteFavoriteEvent(this.props.userId, event);
      }
      else{
        this.props.addFavoriteEvent(event, this.props.userId, eventObj);
        //Notifica 6 ore prima dell'evento
        this.createPushNotification(eventObj);
      }
    }
    else{

      Alert.alert(
        `${i18n.t("auth.notLogged.addFavorite")}`,
        '',
        [
          {text: `${i18n.t("common.cancel")}`, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'OK', onPress: () => this.props.navigation.navigate("Auth")},
        ],
        { cancelable: true }
      )
    }

  }

  createPushNotification(event) {

    const eventDate = new Date(event.start_at);
    const eventTimestamp = eventDate.getTime();
    const eventNotification = new Date(eventTimestamp - (6 * 3600000)); //6 ore prima dell'evento

    //Setto il canale
    const channel = new firebase.notifications.Android.Channel(
      `favorite_events_notification_${event.id}`,
      'Fav Notification',
      firebase.notifications.Android.Importance.Max
    ).setDescription('Scheduled notification 6 hours before favorite event');

    //Creo il canale
    firebase.notifications().android.createChannel(channel);

    // Creo Notification Listener
    firebase.notifications().onNotification((notification: Notification) => {
      // Process your notification as required
      notification
        .android.setChannelId(`favorite_events_notification_${event.id}`)
        .android.setSmallIcon('notification_icon');
      firebase.notifications()
        .displayNotification(notification);

    });

    //Creo la notifica
    const localNotification = new firebase.notifications.Notification({
      sound: 'default',
      //show_in_foreground: true,
      show_in_background: true,
    })
      .setNotificationId(`fav_notification_${event.id}`)
      .setTitle(`${event.name} ${i18n.t("pushNotification.favorite.title")}`)
      .setBody(`${i18n.t("pushNotification.favorite.message")}`)
      .setData({
        type: 'start',
      })
      .android.setChannelId(`favorite_events_notification_${event.id}`) // e.g. the id you chose above
      .android.setSmallIcon('notification_icon') // create this icon in Android Studio
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
        filter={{next_events: true, competition: competitionId}}>
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
  }), {
  addFavoriteEvent,
  deleteFavoriteEvent,
  entityView,
})(EventScreen);
