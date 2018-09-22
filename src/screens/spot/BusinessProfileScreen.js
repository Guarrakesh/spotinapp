import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, ScrollView, ActivityIndicator} from 'react-native';
import Modal from "react-native-modal";
import { connect } from 'react-redux';
import themes from '../../styleTheme';
import {Fonts} from "../../components/common/Fonts";
import broadcasts from '../../api/broadcasts';
import events from '../../api/events';
import BusinessInfoCard from '../../components/BusinessProfileComponents/BusinessInfoCard';
import BroadcastInProfileList from '../../components/BusinessProfileComponents/BroadcastInProfileList';
import ImagesScrollView from '../../components/BusinessProfileComponents/ImagesScrollView';
import ReservationConfirmView from "../../components/BusinessProfileComponents/ReservationConfirmView";
import { reserveBroadcastRequest as reserveBroadcastAction} from '../../actions/reservation';
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

class BusinessProfileScreen extends React.Component {

  state = {
    modalVisible: false,
    modalData: {},
    broadcasts: [],
    eventLoaded: false,
    currentlySending: true
  };

  static navigationOptions = () => {

    return {

      title: "Profilo Locale",
      headerBackTitle: null,

      headerStyle: {
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'transparent',
        borderBottomWidth: 0,
        backgroundColor: themes.base.colors.primary.default
      },
      headerTitleStyle: {
        fontFamily: Fonts.LatoBold,
        color: themes.base.colors.text.default
      },
    }
  }

  handleReservePress(broadcast) {
    this.setState({
      modalVisible: true,
      currentBroadcast: broadcast,
      modalData: {
        broadcast
      }
    });
  }
  handleModalDismiss() {
    this.setState({
      modalVisible: false,
    });
  }
  handleConfirm() {
    this.setState({
      modalVisible: false,

    });

    this.props.reserveBroadcast(this.state.currentBroadcast._id);

  }

  componentDidMount(){

    const {business} = this.props.navigation.state.params;

    broadcasts.fetchByBusiness(business._id).then(response => {
      this.setState({broadcasts: response.docs, currentlySending: true});
      const ids = response.docs.map(broadcast => broadcast.event);

      events.fetchAccumulated(ids).then(response => {
        console.log(response);
        let broadcastsData;
        response.docs.forEach(event => {
          broadcastsData = this.state.broadcasts.map(broadcast => {
            if (broadcast.event === event._id) {
              broadcast.event = event;
            }
            return broadcast;
          });

        });
        this.setState({broadcasts: broadcastsData, eventLoaded: true, currentlySending: false})
      });
    }).catch(error => {
        console.log("ERRORE FETCH BY BUSINESS:", error);
    });

  }

  render(){

    const {business} = this.props.navigation.state.params;
    const { broadcasts, eventLoaded } = this.state;

    let broadcastList;

    if(!eventLoaded || !broadcasts){
      broadcastList = <Text style={{marginLeft: 8, fontSize: 18, fontFamily: Fonts.LatoBold}}>Non ci sono eventi in programma</Text>;
    }
    else{
      broadcastList = <View>
        <Text style={{marginLeft: 8, fontSize: 18, fontFamily: Fonts.LatoBold}}>Eventi in programma</Text>
        <BroadcastInProfileList broadcasts={broadcasts} onReservePress={this.handleReservePress.bind(this)}/>
      </View>

    }

    if(this.state.currentlySending){
      broadcastList = <View>
        <ActivityIndicator size="large" color={themes.base.colors.accent.default} />
      </View>
    }

    return (

      <ScrollView style={styles.scrollView} contentContainerStyle={{alignItems: 'center', justifyContent: 'flex-start'}}>
        <View style={styles.generalContainer}>
          <ImagesScrollView business={businessImg}/>
          <Modal
            animationType="fade"
            transparent={true}
            isVisible={this.state.modalVisible}
            presentationStyle={'overFullScreen'}
          >
            <ReservationConfirmView
              onConfirmPress={this.handleConfirm.bind(this)}
              onCancelPress={this.handleModalDismiss.bind(this)} data={this.state.modalData}/>
          </Modal>
          <View style={styles.cardContainer}>
            <BusinessInfoCard business={business}/>
            {broadcastList}
          </View>
        </View>
      </ScrollView>


    );
  }

};

const styles = StyleSheet.create({
  scrollView: {
    flexDirection: 'column',
    flex: 1
  },
  generalContainer: {
    width: '100%'
  },
  cardContainer: {
    flex: 1,
    marginLeft: 8,
    marginRight: 8,
    marginTop: -20 //TODO: da valutare (si sovrappone alle foto)
  },
})

BusinessProfileScreen.propTypes = {
  reserveBroadcast: PropTypes.func,
}

const mapStateToProps = (state) => ({
});
const mapDispatchToProps = {
  reserveBroadcast: reserveBroadcastAction
}

export default connect(mapStateToProps, mapDispatchToProps)(BusinessProfileScreen);










