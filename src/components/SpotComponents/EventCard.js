import React from 'react';
import { TouchableOpacity, Image, Text, Dimensions, StyleSheet} from 'react-native';
import View from '../common/View';
import moment from 'moment';
import 'moment/locale/it';
import themes from '../../styleTheme';
import Icon from 'react-native-vector-icons/MaterialIcons';

const colors = themes.base.colors


const EventCard = (props) => {

  let competitors = props.competitors;
  if (!props.competitorHasLogo || props.competitorHasLogo) {

    competitorsComponent = competitors.map(comp => {
      console.log(comp)
      return <View style={styles.competitors}>

        { (comp._id.image_versions && comp._id.image_versions.length > 0) ? <Image source={{uri: comp._id.image_versions[0].url, width: 36, height: 36}} resizeMode={'contain'} /> : <Icon name="sports-club" size={36}/> }

      </View>
    });




  } else {
    competitorsComponent =
      <View style={{marginTop: 32}}>
        { props.competition.image_url ? <Image source={{uri: offer.event.competition.image_url}} style={{width: 36, height: 36}} resizeMode={'contain'}/>
          : <Icon name="sports-club" size={36}/> }
      </View>
  }

  let date = moment(props.start_at).locale('it').format('d MMM - hh:mm').toUpperCase();


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
    marginRight: 16,
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
    paddingTop: 16

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
    textTransform: 'capitalize'
  }

};


export default EventCard;
