import React, {Component} from 'react';
import View from '../common/View';
import {Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import themes from '../../styleTheme';
import Images from "../../assets/images";
import Helpers from "../../helpers";
import {Fonts} from "../common/Fonts";
import moment from "moment";

const event = {
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
}


class ReservationConfirmView extends Component {


  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {

    let date = moment(event.start_at).locale('it').format('dddd D MMMM');
    let time = moment(event.start_at).locale('it').format('hh:mm');

    return (
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center'}}>
      <View style={styles.container} elevation={3}>
        <Text style={{fontFamily: Fonts.LatoSemibold, fontSize: 18}}>Vuoi prenotare questa offerta?</Text>
        <View style={styles.eventInfoView}>
          <View style={styles.competitorsLogoView}>
            { event.competition.competitorsHaveLogo ? <Image source={{uri: event.competitors[0]._id.image_versions[0].url}} style={{width: 37, height: 37}} resizeMode={'contain'}/> : <Image source={{uri: event.competition.image_versions[0].url}} style={{width: 37, height: 37}} resizeMode={'contain'}/> }
            { event.competition.competitorsHaveLogo ? <Image source={{uri: event.competitors[1]._id.image_versions[0].url}} style={{width: 37, height: 37, marginTop: 8}} resizeMode={'contain'}/> : null }
          </View>
          <View style={{marginLeft: 16, justifyContent: 'space-between', flex: 1}}>
            <Text style={styles.eventNameText}>{event.name}</Text>
            <Text style={styles.eventDateText}>{date}</Text>
            <Text style={styles.eventTimeText}>{time}</Text>
          </View>
          <View style={styles.sportIconView}>
            <Image source={Images.icons.sports[Helpers.sportSlugIconMap(event.sport.slug)]} style={styles.sportIcon}/>
          </View>
        </View>
        <View style={{width: '100%',borderColor: '#EEEEEE', borderBottomWidth: 1, borderTopWidth: 1, paddingTop: 16, paddingBottom: 16}}>
          <Text style={{fontFamily: Fonts.LatoMedium, fontSize: 18}}>Prenotando questa offerta puoi usufruire del:</Text>
          <Text style={{fontFamily: Fonts.LatoBold, fontSize: 18, color: themes.base.colors.accent.default, marginTop: 8, alignSelf: 'center'}}>-10% alla cassa</Text>
          <Text style={{fontFamily: Fonts.LatoLightItalic, fontSize: 12, color: themes.base.colors.danger.default, marginTop: 16}}>*lo sconto non include la prenotazione di un tavolo riservato presso il locale</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingTop: 16, alignItems: 'center'}}>
          <TouchableOpacity>
            <Text style={{fontFamily: Fonts.LatoBold, fontSize: 14, color: themes.base.colors.text.default}}>ANNULLA</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={styles.confirmButton} elevation={2}>
              <Text style={styles.confirmText}>CONFERMA</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 32,
    padding: 16,
    backgroundColor: themes.base.colors.white.light,
    borderRadius: 8,
    borderColor: themes.base.colors.text.default,
    alignItems: 'center'
  },
  eventInfoView: {
    marginBottom: 16,
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  competitorsLogoView: {

  },
  eventNameText: {
    fontSize: 18,
    fontFamily: Fonts.LatoBold
  },
  eventDateText: {
    fontSize: 16,
    fontFamily: Fonts.LatoMedium,
    marginTop: 5,
    marginBottom: 5,
  },
  eventTimeText: {
    fontSize: 20,
    fontFamily: Fonts.LatoLight
  },
  sportIconView: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  sportIcon: {
    width: 60,
    height: 60
  },
  confirmButton: {
    backgroundColor: themes.base.colors.accent.default,
    borderRadius: 100,
    margin: 5
  },
  confirmText: {
    fontSize: 18,
    fontFamily: Fonts.LatoBold,
    color: themes.base.colors.white.light,
    marginRight: 16,
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 8
  }
})

export default ReservationConfirmView;