import React from 'react';

import EventCard from './EventCard';
import PropTypes from 'prop-types';
import { StyleSheet, SectionList, Text } from 'react-native';
import { groupBy } from 'lodash';
import moment from 'moment';
import 'moment/locale/it';
import {Fonts} from "../common/Fonts";
import themes from "../../styleTheme";


const EventList = (props) => {

  const events = props.events;
  if (events.length <= 0) {
    return null;
  }


  const sectionKeys = events.reduce((sections, event) => {
    const date = new Date(event.start_at);
    const sectionKey = `${date.getDate().toString()}.${date.getMonth().toString()}`;
    if (!sections.includes(sectionKey))
      sections.push(sectionKey);

    return sections;
  }, new Array());

  const sections = sectionKeys.map(key => {
    const section = {key};
    section.data = events.filter(event => {
      const date = new Date(event.start_at);
      const sectionKey = `${date.getDate().toString()}.${date.getMonth().toString()}`;
      return sectionKey === key;
    })
    return section;
  });


  const headerSection = ({section}) => {

    const date = moment(section.data[0].start_at).locale('it').format('dddd D MMMM').toString();

    return (
      <Text style={{marginLeft: 16, marginTop: 16, fontSize: 20, color: themes.base.colors.text.default, textTransform: 'capitalize', fontFamily: Fonts.LatoBold}}>{date}</Text>
    )
  }


  return (
    <SectionList
      renderItem={({item}) => <EventCard
        key={item._id}
        onPress={ ()=> props.onItemPress(item)}
        onFavoritePress={ () => props.onFavoritePress(item)}
        {...item}/>}
      contentContainerStyle={styles.container}
      renderSectionHeader={headerSection}
      sections={sections}
      ListHeaderComponent={ <Text style={{alignSelf: 'center', marginTop:16, marginBottom: 16, fontSize: 20}}>Seleziona l'evento</Text>}
    />
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
