import React from 'react';
import View from '../../components/common/View';
import {  Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import themes from "../../styleTheme";
import {Fonts} from "../common/Fonts";
import ReferenceField from "../common/ReferenceField";
import VersionedImageField from "../common/VersionedImageField";
import Icon from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import 'moment/locale/it';

const SavedEventView = (props) => {

  const {event} = props;

  const date = moment(event.start_at).locale('it').format('ddd D MMM').toString();
  const time = moment(event.start_at).locale('it').format('HH:mm').toUpperCase();

  const onLongPress = (event) => {
    Alert.alert(
      `${event.name}`,
      'Vuoi rimuoverlo dagli eventi preferiti?',
      [
        {text: 'Annulla', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Rimuovi', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: true }
    )
  };

  return(
    <TouchableOpacity style={styles.eventContainer} onLongPress={() => onLongPress(event)}>
      <ReferenceField reference="competitions" source="competition" record={event}>
        {({record, isLoading}) =>
          isLoading ? null : (
            <VersionedImageField source={record.image_versions} minSize={{width: 128, height: 128}}
                                 imgSize={{width: 32, height: 32}}/>
          )}
      </ReferenceField>
      <Text style={styles.eventName}>{event.name}</Text>
      <View style={styles.dateContainer}>
        <Text style={styles.eventTime}>{time}</Text>
        <Text style={styles.eventDate}>{date}</Text>
      </View>
    </TouchableOpacity>

  )
}

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
})

export default SavedEventView;