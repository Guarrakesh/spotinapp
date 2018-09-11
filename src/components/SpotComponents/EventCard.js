import React from 'react';
import { TouchableOpacity, Image, Text, Dimensions, StyleSheet} from 'react-native';
import View from '../common/View';
import moment from 'moment';
import 'moment/locale/it';
import themes from '../../styleTheme';
import Icon from 'react-native-vector-icons/Entypo';
import VersionedImageField from '../common/VersionedImageField';
const colors = themes.base.colors
//const screenwidth = Dimensions.get('window').width;
//const screeheight = Dimensions.get('window').height;


/*let eventExample: {

 "_id": "5b340827151128db331b7091",
 "isFavorite": true,
 "sport": {
 "_id": "5b33f4f1e0cc7477e26f795f",
 "name": "Calcio",

 "slug": "football",

 },
 "competition": {
 "_id": "5b340126e0cc7477e26f7d9a",
 "name": "Serie A",
 image_url: "https://upload.wikimedia.org/wikipedia/it/thumb/b/b9/Wimbledon.svg/1024px-Wimbledon.svg.png",
 },

 "name": "Napoli - Juventus",
 "description": "La partita dell'anno",
 "start_at": "2016-05-18T16:00:00.000Z",
 "competitorHasLogo": true,
 "competitors": [
 {
 "name": "Federer",
 "_id": "5b340717151128db331b708f",
 "image_versions": [
 {
 "url": "http://example.com",
 "width" : 780,
 "height": 500
 }
 ]
 },
 {
 "name": "Nadal",
 "_id": "5b3407e4e0cc7477e26f7fbd"
 }
 ]
 }
 */


const EventCard = (props) => {

  let imageUrl;
  let competitors = props.competitors;
  const competition = props.competition;
  if (competition.competitorsHaveLogo) {

    competitorsComponent = competitors.map(item => {
      const comp = item.competitor;
      console.log(comp);
      return <View style={styles.competitors}>

        { <VersionedImageField source={comp.image_versions} minSize={{width: 62, height: 62}} imgSize={{width: 32, height: 32}} />}

      </View>
    });
  } else {
    competitorsComponent =
      <View style={{marginTop: 32}}>
        { <VersionedImageField source={competition.image_versions} minSize={{width: 62, height: 62}} imgSize={{width: 32, height: 32}} />}
      </View>
  }
  // let date = new Date(props.start_at);
  // let dayString, timeString;
  // if (date) {
  //
  //   dayString = `${date.getDay()} ${date.toLocaleString('it-IT', { month: 'short'}).toString().toLocaleUpperCase()}`
  //   timeString = `${date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}`;
  // }

  let date = moment(props.start_at).locale('it').format('d MMM - hh:mm').toUpperCase();


  return (

    <View elevation={1} style={styles.containerStyle}>

      <TouchableOpacity style={styles.favorite} onPress={props.onFavoritePress}>

        {props.isFavorite ?   <Icon name="heart" size={24} color={colors.accent.default}/> :  <Icon name="heart-outlined" size={24} color={colors.accent.default}/>}

      </TouchableOpacity>

      <TouchableOpacity style={styles.eventInfo} onPress={props.onPress}>
        <View style={styles.competitorsLogosContainer}>
          {competitorsComponent}
        </View>

        <View style={styles.detailContainer}>
          <Text style={{fontSize: 21}}>{props.name}</Text>
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

    marginTop: 16,
    flexDirection: 'column',
    marginBottom: 16,
    justifyContent: 'space-between'
  },

};


export default EventCard;
