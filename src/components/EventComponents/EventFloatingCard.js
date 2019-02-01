import React from 'react';
import { Image, Text, Dimensions, StyleSheet} from 'react-native';
import {View, Touchable} from '../common';
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

const colors = themes.base.colors;


const EventCard = ({
                     event,
                     onPress,
                     elevation,

                   }) => {

  let {competitors, competition} = event;
  const competitorsComponent = (

    competition.competitorsHaveLogo
      ?
      <View style={styles.competitors}>
        {competitors.map(comp => (

          <VersionedImageField source={comp._links.image_versions} minSize={{width: 62, height: 62}} imgSize={{width: 32, height: 32}} />

        ))}
      </View>
      :
      <View style={{marginTop: 16}}>
        { <VersionedImageField source={competition.image_versions} minSize={{width: 128, height: 128}} imgSize={{width: 48, height: 48}} />}
      </View>
  );

  let date = moment(event.start_at).locale('it').format('D MMM').toUpperCase();
  const time = moment(event.start_at).locale('it').format('HH:mm').toUpperCase();

  return (
    <Touchable
      activeOpacity={0.5}
      style={[styles.containerStyle, {elevation: 1, ...themes.base.elevations[`depth${elevation}`]}]}
      onPress={onPress} delayPressIn={50}>

      <View style={{flexDirection: 'row'}}>
        <View style={styles.competitorsLogosContainer}>
          {competitorsComponent}
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.eventNameText} numberOfLines={1} adjustsFontSizeToFit={true}>{event.name}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.dateText}>{date} alle {time}</Text>
            {event.sport && <View style={styles.sportIconView}>
              <Image source={Images.icons.sports[Helpers.sportSlugIconMap(event.sport.slug)]} style={styles.sportIcon}/>
            </View>}
          </View>
        </View>


      </View>

    </Touchable>

  );
}
const styles = {
  containerStyle: {
    borderRadius: themes.base.borderRadius,
    margin: 8,
    padding: 16,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white.light,
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
    marginRight: 16,
    height: '100%'
  },
  competitors: {
    flexDirection: 'column',
    justifyContent: 'space-between',

  },
  detailContainer: {
    flexDirection: 'column',
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
    flex: 1,
    fontSize: 14,
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
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  sportIcon: {
    width: 40,
    height: 40,
  },

};


export default EventCard;
