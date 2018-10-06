import React from 'react';
import View from '../../components/common/View';
import {  Text, TouchableOpacity, StyleSheet } from 'react-native';
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


  return(
    <TouchableOpacity style={styles.eventContainer}>
        <ReferenceField reference="competitions" source="competition" record={event}>
          {({record, isLoading}) =>
            isLoading ? null : (
              !record.competitorsHaveLogo
                ?
                <View style={styles.competitors}>
                  {competitors.map(comp => (
                    <VersionedImageField source={comp._links.image_versions} minSize={{width: 62, height: 62}}
                                         imgSize={{width: 32, height: 32}}/>
                  ))}
                </View>
                :
                <View style={{}}>
                  {<VersionedImageField source={record.image_versions} minSize={{width: 128, height: 128}}
                                        imgSize={{width: 48, height: 48}}/>}
                </View>
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