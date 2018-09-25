import React from 'react';
import { View, StyleSheet, Modal, Text, ScrollView } from 'react-native';
import themes from '../../styleTheme';
import {Fonts} from "../../components/common/Fonts";

import ShowController from '../../controllers/ShowController';

import BusinessInfoCard from '../../components/BusinessProfileComponents/BusinessInfoCard';
import BroadcastInProfileList from '../../components/BusinessProfileComponents/BroadcastInProfileList';
import ImagesScrollView from '../../components/BusinessProfileComponents/ImagesScrollView';
import ReservationConfirmView from "../../components/BusinessProfileComponents/ReservationConfirmView";

const businessImg = {
  "_id": "5b7f0c595066dea0081a1bc1",
  "name": "Pizza Hot",
  "address": {
    "_id": "5b817502fa2191347fc80340",
    "location": {
      "coordinates": [
        14.0823297,
        40.8627346
      ],
      "_id": "5b86ba8892782b4e1fd62012",
      "type": "Point"
    },
    "number": "71",
    "city": "Giugliano in Campania",
    "province": "NA",
    "country": "Italia",
    "zip": 80078,
    "street": "Via Lago Patria"
  },
  "type": "Pub",
  "wifi": true,
  "seats": "80",
  "tvs": 7,
  "providers": [
    "sky",
    "dazn"
  ],
  "phone": "34604645382",
  "photos": [],
  "target": "Famiglie con Bambini, Tifosi",
  "vat": 23452243,
  "__v": 2,
  "forFamilies": true,
  "tradeName": "Pizza Hot Inc.",
  "spots": 0,
  "image_url": [
    {
      "url": "https://file.videopolis.com/D/9dc9f4ba-0b2d-4cbb-979f-fee7be8a4198/8485.11521.brussels.the-hotel-brussels.amenity.restaurant-AD3WAP2L-13000-853x480.jpeg",
      "width": 100,
      "height": 100
    },
    {
      "url": "https://u.tfstatic.com/restaurant_photos/269/55269/169/612/sabatini-vista-ristorante-aa87f.jpg",
      "width": 100,
      "height": 100
    },
    {
      "url": "https://u.tfstatic.com/restaurant_photos/269/55269/169/612/sabatini-vista-ristorante-aa87f.jpg",
      "width": 100,
      "height": 100
    },
    {
      "url": "https://media-cdn.tripadvisor.com/media/photo-s/03/17/d1/d1/ristorante-svevia.jpg",
      "width": 100,
      "height": 100
    },
    {
      "url": "https://file.videopolis.com/D/9dc9f4ba-0b2d-4cbb-979f-fee7be8a4198/8485.11521.brussels.the-hotel-brussels.amenity.restaurant-AD3WAP2L-13000-853x480.jpeg",
      "width": 100,
      "height": 100
    },
    {
      "url": "https://www.geoproject.roma.it/immage/aprire-ristorante-bar-tavola-calda-pizzeria-scia-roma-suap.jpg",
      "width": 100,
      "height": 100
    },
  ],
  "dist": {
    "calculated": 3.328925469089515,
    "location": {
      "coordinates": [
        14.0823297,
        40.8627346
      ],
      "_id": "5b86ba8892782b4e1fd62012",
      "type": "Point"
    }
  }
}

const event = [{
  "sport":{
    "active":true,
    "_id":"5b33f4f1e0cc7477e26f795f",
    "name":"Calcio",
    "slug":"football",
    "__v":1,
    "image_versions":[

    ]
  },
  "competition":{
    "competitorsHaveLogo":true,
    "_id":"5b34013ce0cc7477e26f7db9",
    "sport_id":"5b33f4f1e0cc7477e26f795f",
    "name":"Champions League",
    "country":"Europa",
    "image_versions":[
      {
        "width":"964",
        "height":"780",
        "url":"https://s3.eu-central-1.amazonaws.com/spotinapp/images/competition-logos/championsleague_logo.png"
      }
    ],
    "sport":"5b33f4f1e0cc7477e26f795f"
  },
  "_id":"5b8a5831e510e3001e68f14e",
  "competitors":[
    {
      "_id":{
        "image_versions":[
          {
            "width":"1200",
            "height":"1200",
            "url":"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Juventus_FC_2017_logo.svg/2000px-Juventus_FC_2017_logo.svg.png"
          }
        ],
        "isPerson":false,
        "_id":"5b3407e4e0cc7477e26f7fbd",
        "name":"Juventus",
        "sport_id":"5b33f4f1e0cc7477e26f795f",
        "__v":1,
        "sport":"5b33f4f1e0cc7477e26f795f"
      }
    },
    {
      "_id":{
        "image_versions":[
          {
            "width":"1200",
            "height":"1200",
            "url":"https://s3.eu-central-1.amazonaws.com/spotinapp/images/team-logos/napoli_logo.png"
          }
        ],
        "isPerson":false,
        "_id":"5b340717151128db331b708f",
        "sport_id":"5b33f4f1e0cc7477e26f795f",
        "name":"Napoli",
        "slug":"napoli",
        "sport":"5b33f4f1e0cc7477e26f795f"
      }
    }
  ],
  "name":"Juventus - Napoli",
  "start_at":"2018-09-20T10:30:00.000Z"
},{
  "sport":{
    "active":true,
    "_id":"5b33f4f1e0cc7477e26f795f",
    "name":"Tennis",
    "slug":"tennis",
    "__v":1,
    "image_versions":[

    ]
  },
  "competition":{
    "competitorsHaveLogo":false,
    "_id":"5b34013ce0cc7477e26f7db9",
    "sport_id":"5b33f4f1e0cc7477e26f795f",
    "name":"Wimbledon",
    "country":"Europa",
    "image_versions":[
      {
        "width":"964",
        "height":"780",
        "url":"https://upload.wikimedia.org/wikipedia/it/thumb/b/b9/Wimbledon.svg/1024px-Wimbledon.svg.png"
      }
    ],
    "sport":"5b33f4f1e0cc7477e26f795f"
  },
  "_id":"5b8a5831e510e3001e68f14e",
  "competitors":[
    {
      "_id":{
        "image_versions":[
          {
            "width":"1200",
            "height":"1200",
            "url":"https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Juventus_FC_2017_logo.svg/2000px-Juventus_FC_2017_logo.svg.png"
          }
        ],
        "isPerson":false,
        "_id":"5b3407e4e0cc7477e26f7fbd",
        "name":"Juventus",
        "sport_id":"5b33f4f1e0cc7477e26f795f",
        "__v":1,
        "sport":"5b33f4f1e0cc7477e26f795f"
      }
    },
    {
      "_id":{
        "image_versions":[
          {
            "width":"1200",
            "height":"1200",
            "url":"https://s3.eu-central-1.amazonaws.com/spotinapp/images/team-logos/napoli_logo.png"
          }
        ],
        "isPerson":false,
        "_id":"5b340717151128db331b708f",
        "sport_id":"5b33f4f1e0cc7477e26f795f",
        "name":"Napoli",
        "slug":"napoli",
        "sport":"5b33f4f1e0cc7477e26f795f"
      }
    }
  ],
  "name":"R. Federer - R. Nadal",
  "start_at":"2018-09-20T10:30:00.000Z"
},
]

class BusinessProfileScreen extends React.Component {

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render(){

    const {business, distance} = this.props.navigation.state.params;
    return (
        <ShowController resource="businesses"
                        id={business._id}
                        basePath="/businesses">
          { ({record, isLoading}) => {
            if (isLoading || !record)  return null;
            return (
              <ScrollView style={styles.scrollView}
                          contentContainerStyle={{alignItems: 'center', justifyContent: 'flex-start'}}>
                <View style={styles.generalContainer}>
                  <ImagesScrollView business={businessImg}/>
                  <Modal
                      animationType="slide"
                      transparent={true}
                      visible={false}
                      presentationStyle={'overFullScreen'}
                  >
                    <ReservationConfirmView/>
                  </Modal>
                  <View style={styles.cardContainer}>
                    <BusinessInfoCard distance={distance} business={record}/>
                    <Text style={{marginLeft: 8, fontSize: 18, fontFamily: Fonts.LatoBold}}>Eventi in programma</Text>
                    <BroadcastInProfileList events={event}/>
                  </View>
                </View>
              </ScrollView>
            )}
          }
        </ShowController>

    );
  }

};

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'column',
    flex: 1
  },
  generalContainer: {
    width: '100%',
    backgroundColor: themes.base.colors.white.default
  },
  cardContainer: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: -20 //TODO: da valutare (si sovrappone alle foto)
  },
})


export default BusinessProfileScreen;










