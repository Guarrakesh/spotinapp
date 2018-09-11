import React from 'react';
import { connect } from 'react-redux';
import View from '../components/common/View';
import { Text, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import moment from 'moment';
import 'moment/locale/it';

import BusinessList from '../components/BusinessComponents/BusinessList';
import Icon from 'react-native-vector-icons/Feather';
import { getBusinessRequest } from '../actions/businesses';
import { getLocationRequest } from "../actions/location";

import themes from "../styleTheme";

const businesses = [
  {
    "dist": "30",
    "type":[
      "Pub"
    ],
    "providers":[
      "dazn",
      "sky",
      "digitale-terrestre"
    ],
    "spots":-600,
    "_id":"5b859a0acadd70001e1917fe",
    "address":{
      "_id":"5b859a0acadd70001e1917ff",
      "street":"Via Lago Patria",
      "number":"247/15",
      "city":"Giugliano in Campania",
      "province":"Napoli",
      "zip":80014,
      "country":"Italia",
      "location":{
        "coordinates":[
          14.0384399,
          40.9292015
        ],
        "_id":"5b8a5ac9e510e3001e68f15f",
        "type":"Point"
      }
    },
    "name":"Pizza Hot",
    "phone":"0818391131",
    "user":"5b82c73bec9840001ef8c381",
    "vat":2345234565432,
    "tradeName":"Pizza Hot by Las Palmas",
    "wifi":true,
    "forFamilies":true,
    "seats":70,
    "tvs":10,
    "target":"Famiglie, Tifosi, Stranieri",
    "photos":[

    ],
    "__v":0
  },
  {
    "dist": "30",
    "type":[
      "Trattoria"
    ],
    "providers":[
      "dazn",
      "sky"
    ],
    "spots":10000,
    "_id":"5b91309770b1ad001ee4c1c3",
    "name":"La fessa calda",
    "phone":"3391813738",
    "user":"5b9124c00e98fc001efc0414",
    "address":{
      "_id":"5b91309770b1ad001ee4c1c4",
      "street":"Corso Vittorio Emanuele",
      "number":"115",
      "city":"napoli",
      "province":"NA",
      "country":"ITALIA",
      "zip":80100,
      "location":{
        "coordinates":[
          14.2247915,
          40.8365616
        ],
        "_id":"5b91309870b1ad001ee4c1c5",
        "type":"Point"
      }
    },
    "vat":123456789,
    "tradeName":"La fessa Calda spa",
    "wifi":true,
    "forFamilies":true,
    "seats":60,
    "tvs":5,
    "photos":[

    ],
    "__v":0
  },
  {
    "dist": "30",
    "type":[
      "Pizzeria"
    ],
    "providers":[
      "sky",
      "dazn"
    ],
    "spots":10000,
    "_id":"5b91368270b1ad001ee4c1e7",
    "name":"Pizza Bella",
    "phone":"333333333",
    "user":"5b9124c00e98fc001efc0414",
    "address":{
      "_id":"5b91368270b1ad001ee4c1e8",
      "street":"via sandro pertini",
      "city":"qualiano",
      "province":"Napoli",
      "country":"Italia",
      "zip":80019,
      "number":"5",
      "location":{
        "coordinates":[
          14.1434102,
          40.9200879
        ],
        "_id":"5b91368370b1ad001ee4c1e9",
        "type":"Point"
      }
    },
    "vat":123456789,
    "tradeName":"armando catalano srl",
    "wifi":true,
    "forFamilies":true,
    "seats":120,
    "tvs":5,
    "photos":[

    ],
    "__v":0
  },
  {
    "dist": "30",
    "type":[
      "Pizzeria"
    ],
    "providers":[
      "dazn",
      "sky"
    ],
    "spots":450,
    "_id":"5b939db3fd1c72001f4e8006",
    "name":"Add' e Scugnizz'",
    "phone":"333333333",
    "user":"5b939d5efd1c72001f4e7fff",
    "address":{
      "_id":"5b939db3fd1c72001f4e8007",
      "street":"Via Lago Patria ",
      "number":"75",
      "city":"Giugliano in Campania",
      "province":"Na",
      "country":"Italiana",
      "zip":80014,
      "location":{
        "coordinates":[
          14.0334942,
          40.9225581
        ],
        "_id":"5b939db4fd1c72001f4e8008",
        "type":"Point"
      }
    },
    "vat":12345698,
    "tradeName":"Mario Catalano srl",
    "wifi":true,
    "forFamilies":true,
    "seats":125,
    "tvs":3,
    "photos":[

    ],
    "__v":0
  }
]

class BusinessScreen extends React.Component {

  constructor() {
    super();

    this.handleBusinessPress = this.handleBusinessPress.bind(this);

  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    const params = state.params || {};

    return {

      headerStyle: {
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'transparent',
        borderBottomWidth: 0,
        backgroundColor: themes.base.colors.primary.default
      },

      title: "Locali vicini"

    }
  }

  componentDidMount() {

    const position = {
      lat: this.props.latitude,
      lng: this.props.longitude
    };

  }

  handleBusinessPress(business) {
    this.props.navigation.navigate('BusinessProfileScreen', {business: business});

  }

  render() {

    const {currentlySending} = this.props;

    return (
      <View style={styles.container}>
        <SearchBar
          round={true}
          placeholder='Cerca Locale'
          lightTheme={true}
          clearIcon={{ color: 'white' }}
        />
        <BusinessList businesses={businesses} onItemPress={this.handleBusinessPress}/>
        <ActionButton
          title=''
          position={"right"}
          buttonColor={themes.base.colors.accent.default}
          size={52}
          offsetY={32}
          onPress={() => {this.props.navigation.navigate('BusinessMap', {broadcasts: broadcasts})}}
          icon={<Icon name="map" size={24}
                      style={{color: themes.base.colors.white.default}}/>}
        />
      </View>

    )


  }
}
const mapStateToProps = (state) => {
  const { currentlySending, error} = state.entities;
  const { latitude, longitude } = state.location;
  const { loggedIn } = state.auth;
  return {
    currentlySending, error, loggedIn, latitude, longitude,
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1
    // top: 0,
    // bottom: 0,
    // right: 0,
    // left: 0,
  },
  subHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: themes.base.colors.primary.default,
    paddingBottom: 48,
    paddingTop: 16,
    marginBottom: -32,
    zIndex: 0,
  },
  eventName: {
    fontSize: 18,
    color: themes.base.colors.text.default,
    marginBottom: 8,
    fontWeight: '700',

  },
  competitionName: {
    fontSize: 18,
    fontWeight: '700',
    color: themes.base.colors.text.default,

  },
  date: {
    color: themes.base.colors.text.default,

  },
  mapIcon: {

  }
});
export default BusinessScreen;
