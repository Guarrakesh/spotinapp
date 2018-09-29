import React from 'react';
import {View, Text, Button, StyleSheet, ActivityIndicator} from 'react-native';
import ProfileController from '../../controllers/ProfileController';
import InlineListController from '../../controllers/InlineListController';


import ListController from '../../controllers/ListController'
import { userLogout } from '../../actions/login';
import UserInfoCard from '../../components/ProfileComponents/UserInfoCard';
import ReservationsCarousel from '../../components/ProfileComponents/ReservationsCarousel';
import { connect } from 'react-redux';
import {Fonts} from "../../components/common/Fonts";
import themes from "../../styleTheme";

const user = {
  name: "Armando Catalano",
  email: "armocata@libero.it",
  image: "https://media.licdn.com/dms/image/C4E03AQFX_8NZvj7RVw/profile-displayphoto-shrink_800_800/0?e=1543449600&v=beta&t=GCd4X8KnsajmTIzz2Ue_6F_-AFgX2JaDuu8kZir_uZk"
}

const broadcasts = [{
  "newsfeed": null,
  "_id": "5b998220ffa7a3001f05794c",
  "event": "5b994f412663a4001f50c84e",
  "business": {
    "type": [
      "Pub"
    ],
    "providers": [
      "dazn",
      "sky",
      "digitale-terrestre"
    ],
    "spots": -750,
    "_id": "5b859a0acadd70001e1917fe",
    "address": {
      "_id": "5b859a0acadd70001e1917ff",
      "street": "Via Lago Patria",
      "number": "247/15",
      "city": "Giugliano in Campania",
      "province": "Napoli",
      "zip": 80014,
      "country": "Italia",
      "location": {
        "coordinates": [
          14.0384399,
          40.9292015
        ],
        "_id": "5b8a5ac9e510e3001e68f15f",
        "type": "Point"
      }
    },
    "dist":{
      "calculated": 1.234
    },
    "name": "Pizza Hot",
    "phone": "0818391131",
    "user": "5b82c73bec9840001ef8c381",
    "vat": 2345234565432,
    "tradeName": "Pizza Hot by Las Palmas",
    "wifi": true,
    "forFamilies": true,
    "seats": 70,
    "tvs": 10,
    "target": "Famiglie, Tifosi, Stranieri",
    "photos": [],
    "__v": 1
  },
  "offer": {
    "_id": "5b998220ffa7a3001f05794d",
    "title": "Maxischermo",
    "description": "Pilu a volontà casse di pilu, umida e secca.",
    "type": 1,
    "value": 30
  },
  "image_url": [],
  "reservations": [
    {
      "_id": "5ba65641818e6f001ea1d769",
      "user": "5b3cd4437df61039baf7edaa",
      "broadcast": "5b998220ffa7a3001f05794c",
      "created_at": "2018-09-22T14:48:33.858Z"
    },
    {
      "_id": "5ba6a06f31032e1495d00c1a",
      "user": "5b5aeeb9a14629001e799c18",
      "broadcast": "5b998220ffa7a3001f05794c",
      "created_at": "2018-09-22T20:05:03.791Z"
    }
  ],
  "__v": 0
},
  {
    "newsfeed": null,
    "_id": "5b998220ffa7a3001f05794c",
    "event": "5b994f412663a4001f50c84e",
    "business": {
      "type": [
        "Pub"
      ],
      "providers": [
        "dazn",
        "sky",
        "digitale-terrestre"
      ],
      "spots": -750,
      "_id": "5b859a0acadd70001e1917fe",
      "address": {
        "_id": "5b859a0acadd70001e1917ff",
        "street": "Via Lago Patria",
        "number": "247/15",
        "city": "Giugliano in Campania",
        "province": "Napoli",
        "zip": 80014,
        "country": "Italia",
        "location": {
          "coordinates": [
            14.0384399,
            40.9292015
          ],
          "_id": "5b8a5ac9e510e3001e68f15f",
          "type": "Point"
        }
      },
      "dist":{
        "calculated": 1.234
      },
      "name": "Pizza Hot",
      "phone": "0818391131",
      "user": "5b82c73bec9840001ef8c381",
      "vat": 2345234565432,
      "tradeName": "Pizza Hot by Las Palmas",
      "wifi": true,
      "forFamilies": true,
      "seats": 70,
      "tvs": 10,
      "target": "Famiglie, Tifosi, Stranieri",
      "photos": [],
      "__v": 1
    },
    "offer": {
      "_id": "5b998220ffa7a3001f05794d",
      "title": "Maxischermo",
      "description": "Pilu a volontà casse di pilu, umida e secca.",
      "type": 1,
      "value": 30
    },
    "image_url": [],
    "reservations": [
      {
        "_id": "5ba65641818e6f001ea1d769",
        "user": "5b3cd4437df61039baf7edaa",
        "broadcast": "5b998220ffa7a3001f05794c",
        "created_at": "2018-09-22T14:48:33.858Z"
      },
      {
        "_id": "5ba6a06f31032e1495d00c1a",
        "user": "5b5aeeb9a14629001e799c18",
        "broadcast": "5b998220ffa7a3001f05794c",
        "created_at": "2018-09-22T20:05:03.791Z"
      }
    ],
    "__v": 0
  },{
    "newsfeed": null,
    "_id": "5b998220ffa7a3001f05794c",
    "event": "5b994f412663a4001f50c84e",
    "business": {
      "type": [
        "Pub"
      ],
      "providers": [
        "dazn",
        "sky",
        "digitale-terrestre"
      ],
      "spots": -750,
      "_id": "5b859a0acadd70001e1917fe",
      "address": {
        "_id": "5b859a0acadd70001e1917ff",
        "street": "Via Lago Patria",
        "number": "247/15",
        "city": "Giugliano in Campania",
        "province": "Napoli",
        "zip": 80014,
        "country": "Italia",
        "location": {
          "coordinates": [
            14.0384399,
            40.9292015
          ],
          "_id": "5b8a5ac9e510e3001e68f15f",
          "type": "Point"
        }
      },
      "dist":{
        "calculated": 1.234
      },
      "name": "Pizza Hot",
      "phone": "0818391131",
      "user": "5b82c73bec9840001ef8c381",
      "vat": 2345234565432,
      "tradeName": "Pizza Hot by Las Palmas",
      "wifi": true,
      "forFamilies": true,
      "seats": 70,
      "tvs": 10,
      "target": "Famiglie, Tifosi, Stranieri",
      "photos": [],
      "__v": 1
    },
    "offer": {
      "_id": "5b998220ffa7a3001f05794d",
      "title": "Maxischermo",
      "description": "Pilu a volontà casse di pilu, umida e secca.",
      "type": 1,
      "value": 30
    },
    "image_url": [],
    "reservations": [
      {
        "_id": "5ba65641818e6f001ea1d769",
        "user": "5b3cd4437df61039baf7edaa",
        "broadcast": "5b998220ffa7a3001f05794c",
        "created_at": "2018-09-22T14:48:33.858Z"
      },
      {
        "_id": "5ba6a06f31032e1495d00c1a",
        "user": "5b5aeeb9a14629001e799c18",
        "broadcast": "5b998220ffa7a3001f05794c",
        "created_at": "2018-09-22T20:05:03.791Z"
      }
    ],
    "__v": 0
  }];

class ProfileScreen extends React.Component {

  constructor() {

    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.dispatch(userLogout());
  }

  renderProfile(profile, loggedIn, isLoading){
    if(isLoading){
      return(
        <ActivityIndicator size="large" color={themes.base.colors.accent.default}/>
      )
    }
    if(loggedIn){
      if(!profile._id){
        return(
          <Text style={{alignSelf: 'center', fontSize: 20, marginTop: 16}}>
            ⊗ Impossibile caricare il profilo ⊗
          </Text>
        )
      }
      return(
        <View style={{padding: 8}}>
          <UserInfoCard user={profile} onLogoutPress={() => this.handleLogout()}/>
          <InlineListController resource="reservations">
            {controllerProps =>
              controllerProps.isLoading ? null :
                <ReservationsCarousel {...controllerProps}/>
            }
          </InlineListController>
        </View>
      )
    }
    else {
      <Button title="Accedi" onPress={() => {
        this.props.navigation.navigate('SignIn')
      }}/>
    }
  }
  render() {


    return (
      <ProfileController>
        {({profile, loggedIn, isLoading}) =>
          <View>
            {this.renderProfile(profile,loggedIn,isLoading)}
          </View>
        }

      </ProfileController>
    )
  }
}


export default ProfileScreen;

