import React from 'react';

import EventCard from './EventCard';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
const EventList = (props) => {

  const events = props.events;
  if (events.length <= 0) {
    return null;
  }

  const eventList = events.map(event =>
    <EventCard
      key={event._id}
      onPress={ ()=> props.onItemPress(event)}
      onFavoritePress={ () => props.onFavoritePress(event)}
      {...event}
    />

   )

  return (
    <View style={styles.container}>
      {eventList}
    </View>
  );
}

EventList.propTypes = {
    onItemPress: PropTypes.func.isRequired,
    events: PropTypes.array.isRequired,
    onFavoritePress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
        padding: 8,
    }
});

export default EventList;