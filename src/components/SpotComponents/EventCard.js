import React from 'react';
import { TouchableOpacity, Image, Text, Dimensions, StyleSheet} from 'react-native';
import View from '../common/View';
import moment from 'moment';
import 'moment/locale/it';
import themes from '../../styleTheme';
import VersionedImageField from '../common/VersionedImageField';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Fonts} from "../common/Fonts";

const colors = themes.base.colors


const EventCard = (props) => {

  let competitors = props.competitors;
  const competition = props.competition;
  let competitorsComponent;
  if (competition.competitorsHaveLogo) {

    competitorsComponent = competitors.map(item => {
      const comp = item.competitor;

      return <View style={styles.competitors}>

        { <VersionedImageField source={comp.image_versions} minSize={{width: 62, height: 62}} imgSize={{width: 32, height: 32}} />}

      </View>
    });
  } else {
    console.log(competition.image_versions);
    competitorsComponent =
      <View style={styles.competitors}>
        <VersionedImageField source={competition.image_versions} minSize={{width: 128, height: 128}} imgSize={{width: 48, height: 48}} />
      </View>
  }

  let date = moment(props.start_at).locale('it').format('D MMM - HH:mm').toUpperCase();
  const time = moment(props.start_at).locale('it').format('HH:mm').toUpperCase();

  return (

    <View elevation={1} style={styles.containerStyle}>

      <TouchableOpacity style={styles.favorite} onPress={props.onFavoritePress}>

        {props.isFavorite ?   <Icon name="favorite" size={30} color={colors.accent.default}/> :  <Icon name="favorite-border" size={30} color={colors.accent.default}/>}

      </TouchableOpacity>

      <TouchableOpacity style={styles.eventInfo} onPress={props.onPress}>
        <View style={styles.competitorsLogosContainer}>
          {competitorsComponent}
        </View>

        <View style={styles.detailContainer}>
          <Text style={styles.eventNameText} numberOfLines={1} adjustsFontSizeToFit={true}>{props.name}</Text>
          <Text style={styles.businessesInfoText}>3 locali vicino a te</Text>
          <Text style={styles.dateText}>{time}</Text>
        </View>
        <View style={styles.arrowIconView}>
          <Icon name="keyboard-arrow-right" color={themes.base.colors.text.default} style={styles.arrowImg} size={25}/>
        </View>
      </TouchableOpacity>
    </View>

  );
}
const styles = {
  containerStyle: {
    marginTop: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    height: 116,
    backgroundColor: colors.white.default,
  },
  favorite: {
    borderRightColor: colors.text.default,
    borderRightWidth: 0.5,
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
    flexDirection: 'row'
  },
  competitorsLogosContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: 0,
    flexBasis: 54,
    paddingTop: 22

  },
  competitors: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8,

  },
  detailContainer: {
    marginTop: 20,
    flexDirection: 'column',
    marginBottom: 20,
    justifyContent: 'space-between',
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

};


export default EventCard;
