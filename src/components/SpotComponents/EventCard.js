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

      <View style={{marginTop: 32}}>
        { <VersionedImageField source={competition.image_versions} minSize={{width: 62, height: 62}} imgSize={{width: 32, height: 32}} />}
      </View>
  }

  let date = moment(props.start_at).locale('it').format('D MMM - HH:mm').toUpperCase();


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
          <Text style={styles.eventNameText}>{props.name}</Text>
          <Text style={{fontSize: 14, color: colors.accent.default}}># Numero Locali </Text>
          <Text style={{fontSize: 14, fontWeight: '200'}}>{date}</Text>
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
    ...themes.base.elevations.depth1
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
    marginBottom: 25,
    justifyContent: 'space-between'
  },
  eventNameText: {
    fontSize: 21,
    color: themes.base.colors.text.default,
    textTransform: 'capitalize',
    fontFamily: Fonts.Lato
  },
  arrowIconView: {
    justifyContent: 'center',
    right: 0,
    height: '100%',
    position: 'absolute'
  },
  arrowImg: {
    marginRight: 8
  },

};


export default EventCard;
