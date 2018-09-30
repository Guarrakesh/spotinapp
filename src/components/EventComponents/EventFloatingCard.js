import React from 'react';
import { TouchableOpacity, Image, Text, Dimensions, StyleSheet} from 'react-native';
import View from '../common/View';
import moment from 'moment';
import 'moment/locale/it';
import themes from '../../styleTheme';
import ReferenceField from '../common/ReferenceField'
import VersionedImageField from '../common/VersionedImageField';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Fonts} from "../common/Fonts";
import ReferenceManyFieldController from '../../controllers/ReferenceManyFieldController';
import Images from '../../assets/images';
import Helpers from '../../helpers';

const colors = themes.base.colors


const EventCard = ({
  event,
  onPress,
  elevation,
  sport
}) => {

  let competitors = event.competitors;
  const competitorsComponent = (
      <ReferenceField  reference="competitions" source="competition" record={event}>
        {({record, isLoading}) =>
          isLoading ? null : (

            record.competitorsHaveLogo
                ?
                <View style={styles.competitors}>
                  {competitors.map(comp => (
                    <ReferenceField reference="competitors" source="competitor" record={comp}>
                      {({record: competitor}) =>
                         <VersionedImageField source={competitor.image_versions} minSize={{width: 62, height: 62}} imgSize={{width: 32, height: 32}} />
                      }
                    </ReferenceField>
                ))}
                </View>
                :
                <View style={{marginTop: 16}}>
                  { <VersionedImageField source={record.image_versions} minSize={{width: 128, height: 128}} imgSize={{width: 48, height: 48}} />}
                </View>
        )}
      </ReferenceField>
  );

  let date = moment(event.start_at).locale('it').format('D MMM - HH:mm').toUpperCase();
  const time = moment(event.start_at).locale('it').format('HH:mm').toUpperCase();

  return (

      <View elevation={elevation} style={styles.containerStyle}>
        <TouchableOpacity style={styles.eventInfo} onPress={onPress}>
          <View style={styles.competitorsLogosContainer}>
            {competitorsComponent}
          </View>

          <View style={styles.detailContainer}>
            <Text style={styles.eventNameText} numberOfLines={1} adjustsFontSizeToFit={true}>{event.name}</Text>
            <Text style={styles.businessesInfoText}>3 locali vicino a te</Text>
            <Text style={styles.dateText}>{time}</Text>
          </View>

            <View style={styles.sportIconView}>
              <Image source={Images.icons.sports[Helpers.sportSlugIconMap(sport.slug)]} style={styles.sportIcon}/>
            </View>


        </TouchableOpacity>
      </View>

  );
}
const styles = {
  containerStyle: {
    marginTop: 10,
    borderRadius: themes.base.borderRadius,
    marginBottom: 8,
    height: 130,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: colors.white.default,
  },
  favorite: {
    borderRightColor: colors.white.divisor,
    borderRightWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    marginRight: 8,
    flexGrow: 0,
    flexBasis: 63,
    marginBottom: 16
  },
  eventInfo: {
    flexGrow: 3,
    flexDirection: 'row',

  },
  competitorsLogosContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexGrow: 0,
    flexBasis: 54,
    paddingTop: 22,
    paddingBottom: 18

  },
  competitors: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
    flex: 1,

  },
  detailContainer: {
    marginTop: 20,
    flexDirection: 'column',
    marginBottom: 20,
    justifyContent: 'space-around',
    flex: 1,
    flexWrap: 'wrap'
  },
  eventNameText: {
    fontSize: 18,
    color: themes.base.colors.text.default,
    fontFamily: Fonts.Lato,
  },
  businessesInfoText: {
    fontSize: 14,
    color: colors.accent.default,
    fontFamily: Fonts.LatoBold,
  },
  dateText: {
    fontSize: 20,
    fontFamily: Fonts.LatoLight
  },
  arrowIconView: {
    justifyContent: 'center',
    right: 0,
    height: '100%',
  },
  arrowImg: {
    marginRight: 8
  },
  sportIconView: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    right: 16
  },
  sportIcon: {
    width: 60,
    height: 60
  },

};


export default EventCard;
