import React from 'react';
import PropTypes from 'prop-types';
import {  Text, StyleSheet, Alert } from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import 'moment/locale/it';

import { Touchable, View } from '../../components/common';

import themes from "../../styleTheme";
import {Fonts} from "../common/Fonts";
import ReferenceField from "../common/ReferenceField";
import VersionedImageField from "../common/VersionedImageField";

const SavedEventListItem = (props) => {

  const { event, onRemovePress, onPress} = props;

  const date = moment(event.start_at).locale('it').format('ddd D MMM').toString();
  const time = moment(event.start_at).locale('it').format('HH:mm').toUpperCase();

  const onLongPress = (event) => {
    Alert.alert(
        `${event.name}`,
        'Vuoi rimuoverlo dagli eventi preferiti?',
        [
          {text: 'Annulla', onPress: () => {}, style: 'cancel'},
          {text: 'Rimuovi', onPress: () => props.onRemovePress()},
        ],
        { cancelable: true }
    )
  };

  return(
      <Touchable
          onPress={onPress}
          style={styles.eventContainer}
          onLongPress={() => onLongPress(event)}>
        <View style={{flexDirection: 'row', flex: 1}}>
          <VersionedImageField source={event.competition.image_versions} minSize={{width: 128, height: 128}}
                               imgSize={{width: 32, height: 32}}/>

          <Text style={styles.eventName}>{event.name}</Text>
          <View style={styles.dateContainer}>
            <Text style={styles.eventTime}>{time}</Text>
            <Text style={styles.eventDate}>{date}</Text>
          </View>
        </View>
      </Touchable>

  )
};

SavedEventListItem.propTypes = {
  event: PropTypes.object,
  onRemovePress: PropTypes.func,
  onPress: PropTypes.func
};
const styles = StyleSheet.create({

  eventContainer: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: themes.base.colors.white.divisor
  },
  eventName: {
    fontSize: 18,
    fontFamily: Fonts.LatoMedium,
    color: themes.base.colors.text.default,
    flex: 1,
    alignSelf: 'center',
    marginLeft: 8
  },
  dateContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end'
  },
  eventTime: {
    fontFamily: Fonts.LatoBold,
    color: themes.base.colors.text.default

  },
  eventDate: {
    textTransform: 'capitalize',
    fontFamily: Fonts.LatoLight,
    color: themes.base.colors.text.default
  }
});

export default SavedEventListItem;