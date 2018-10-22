import React from 'react';
import { Dimensions, TouchableOpacity, Image, Text, ImageBackground} from 'react-native';
import View from '../common/View';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import themes from '../../styleTheme';
import Images from '../../assets/images';
import Helpers from '../../helpers';
import { Fonts } from "../common/Fonts";
import moment from "moment";


let offer = {
  name: "Pizza e Bibita",
  type: 0, //prezzo fisso
  value: '10',
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac urna elementum, euismod ligula eget, malesuada justo. In elementum lorem ligula, at pulvinar dolor congue a.",
  event: {

    "_id": "5b340827151128db331b7091",

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
        "_id": "5b340717151128db331b708f"
      },
      {
        "name": "Nadal",
        "_id": "5b3407e4e0cc7477e26f7fbd"
      }
    ]
  },
  image_url: "http://www.ultimora.news/local/cache-vignettes/L800xH433/arton2037-c509a.jpg?1525880334",


};


const OfferCard = () => {

  return (

    <View elevation={1} style={styles.container}>
      <View style={styles.imageStyle}>
        <ImageBackground
          source={offer.image_url ? {uri: offer.image_url} : {uri: "https://images.tippest.it/unsafe/375x243/1134560b6eda4fe2ba230e3cbe08d5df/07-04.jpg"}}
          style={styles.offerImgBackground}
          resizeMode={"cover"}
        >
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, paddingBottom: 8, backgroundColor: 'rgba(255,255,255,0.8)' }}>
            <Text style={styles.offerName}>{offer.name}</Text>
            <Text style={styles.offerValue}>
              {offer.type == 0 ? offer.value + "€" : "-" + offer.value + "%"}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.offerDescription}>{offer.description}</Text>
        <OfferEvent />
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', paddingTop: 16}}>
          <TouchableOpacity>
            <View style={styles.reservationButton} elevation={2}>
              <Text style={styles.reservationText}>PRENOTA OFFERTA</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
};

const OfferEvent = () => {

  let date = moment(offer.event.start_at).locale('it').format('dddd D MMMM');
  let time = moment(offer.event.start_at).locale('it').format('HH:mm');

  let competitors = offer.event.competitors;
  let competitorsComponent;

  if (offer.event.competitorHasLogo) {
    competitorsComponent =
      <View style={styles.competitors}>
        { competitors[0].image_url ? <Image source={{uri: competitors[0].image_url}}/> : <Icon name="sports-club" size={36}/> }
        { competitors[1].image_url ? <Image source={{uri: competitors[1].image_url}}/> : <Icon name="sports-club" size={36}/> }
      </View>
  } else {
    competitorsComponent =
      <View>
        { offer.event.competition.image_url ? <Image source={{uri: offer.event.competition.image_url}} style={{width: 36, height: 36}}/>
          : <Icon name="sports-club" size={36}/> }
      </View>
  }
  return(
    <View style={{flexDirection: 'row', marginTop: 16, width: '100%'}}>
      <View style={{flexDirection: 'column', justifyContent: 'center',}}>
        {competitorsComponent}
      </View>
      <View style ={{flexDirection: 'column', marginLeft: 16, justifyContent: 'space-between'}}>
        <Text style={styles.eventNameText}>{offer.event.name}</Text>
        <Text style={styles.eventDateText}>{date}</Text>
        <Text style={styles.eventTimeText}>{time}</Text>
      </View>
      <View style={{marginLeft: 50}}>
        <Image
          source={Images.icons.sports[Helpers.sportSlugIconMap(offer.event.sport.slug)]}
          style={{height: 60, width: 60, marginTop: 16, marginRight: 32 }}
        />
      </View>
    </View>
  )
}

const styles = {
  container:{
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: themes.base.colors.white.light,
  },
  offerImgBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  infoContainer: {
    padding: 16,
    paddingTop: 8
  },
  bookOfferButton: {
    backgroundColor: themes.base.colors.accent.default,
    width: 180,
    height: 38,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 50,
    marginTop: 20,
    marginBottom: 15,
    ...themes.base.elevations.depth2
  },

  imageStyle: {
    borderRadius: 5,
    height: 189,
    width: '100%',
    //justifycontent: 'center',
    alignItems: 'center',

  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  competitors: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'space-between',
  },
  offerName: {
    color: themes.base.colors.text.default,
    fontSize: 24,
    fontFamily: Fonts.LatoBold

  },
  offerValue: {
    color: themes.base.colors.danger.default,
    fontSize: 36,
    fontFamily: Fonts.LatoBlack
  },
  offerDescription: {
    color: themes.base.colors.text.default
  },
  eventNameText: {
    fontSize: 18,
    fontFamily: Fonts.LatoBold,
    color: themes.base.colors.text.default
  },
  eventDateText: {
    fontSize: 16,
    fontFamily: Fonts.LatoMedium,
    marginTop: 5,
    marginBottom: 5,
    color: themes.base.colors.text.default
  },
  eventTimeText: {
    fontSize: 20,
    fontFamily: Fonts.LatoLight,
    color: themes.base.colors.text.default
  },
  reservationButton: {
    backgroundColor: themes.base.colors.accent.default,
    borderRadius: 100,
    margin: 5
  },
  reservationText: {
    fontSize: 16,
    fontFamily: Fonts.LatoBold,
    color: themes.base.colors.white.light,
    marginRight: 16,
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 8
  }

};

export default OfferCard;
