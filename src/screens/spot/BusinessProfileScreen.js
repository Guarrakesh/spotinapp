import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, ScrollView, ActivityIndicator} from 'react-native';
import Modal from "react-native-modal";
import { connect } from 'react-redux';
import themes from '../../styleTheme';
import {Fonts} from "../../components/common/Fonts";

import ShowController from '../../controllers/ShowController';

import BusinessInfoCard from '../../components/BusinessProfileComponents/BusinessInfoCard';
import BroadcastInProfileList from '../../components/BusinessProfileComponents/BroadcastInProfileList';
import ImagesScrollView from '../../components/BusinessProfileComponents/ImagesScrollView';
import ReservationConfirmView from "../../components/BusinessProfileComponents/ReservationConfirmView";
import ListController from "../../controllers/ListController";
import ReferenceManyFieldController from '../../controllers/ReferenceManyFieldController';

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
      "url": "https://lh3.googleusercontent.com/706ioxPbNl4bj--kiIBR9auLTlppAkGljRRixcwGSA-qTTzWqKInwkyK2Cq5yhpAjh8KgnI2hThSZ6WdsEZR0yNZcSBWDo1BdklYpLtCIRIqtEOFnIiv6gHTo5v0hA8FTpXZdhqV2Avmq3TgJ6orKXiJid0zSl7iEQ1uHsp_jH-eY0iaJP2CCxkUoK672LnrZpm3MvD-pB46zUx0Hnp8sJG3A_scoKjDP6Wtpu41n3ScsvbHNrUuLz77umiZrEZo4QFMTAzZiGSK0HKQwy7SU9USOy839ny0K0X6h70bS-BSPwMS_WdXRXsVcwklBy2dRyTxG1D-VmrTIupEmJrbIzg9ozDLESPsjTgMATMySQ5si4sbC6l__v7j2_Fb6oKXF-LD7xBHEUQS5wkx7fwFsShMi3-JHcnPapYtfbQtaFkfyY88_NmxyeBKdheh2axSnwDIUzZCqFmcJViOsMZ0RrctA-4Keqokpw4wWicjin5T7nlCeZdW4-OEp3MpTAe7ZxSwsr_JHkPwkjzhZ8aFlHpGwV5LOFCN5i7pG8BNitQ_Js8qb0oP2uBWXu3AGmr8D5zyGb97TnkyB-z8ij9oG3cUvkbzOWk45S1A193qiwaBtqH6VJaplFTp0WNcPF-a=w2316-h1736-no",
      "width": 100,
      "height": 100
    },
    {
      "url": "https://lh3.googleusercontent.com/Mnam-bfMfC8QxRaLQEyHZQ27jX0arkyvGr1aDYrkLwzTPtcsG02KqWVNXQwQvq-_Be9pG32s3i32Vm3paMezexuIOI68pTGclrROJPZUucrcK6z4u0hGvFPy86Jr4eG_hJzyrflhmJvsc-ceuno8kBdLfqayV6nDnkcRLUOgi4aPofhSE9HuVaREyWOm-BnYyk5yF11VBN2Pm1lIPKzbQcYT02kLX8xVDkJx1W1cevwdWJTrGhit5Y_bg2fuvWxaxNcHPzd-cxFg0w83uiEs1qw_jM5FsR2H_90UdK1ZxD6XiO4lxCt_u14oZLF38qEXVQHkha4oVe2ZeXuGIYJlevzgGucz1MqE9Ik_LLVRvLrj69gZn-kRJj8BrNfbljXDM5WMk4DaHcb0hJyeu1hgMJgD-KCeLjBHKKMu4A7QGI4bZ8hJgBV4-udBEzAeuX6hYELnwKQHOR6TxW80gaeloF-vQF8Qf92vbzY1__-a5Res2cDaGfhBb4o9dX69UGXt9oifFaSietLu6lOftgmWDAuECG171CmSRSh_BD16lk7qPDm-nWQ1f_h-27eWyMzAt4mU0qPYFpkEh9MQu7rnfzGdVoP1MlbgzDGk9ID1rnau9Z85XRNA2TzGJcOAUDJA=w2316-h1736-no",
      "width": 100,
      "height": 100
    },
    {
      "url": "https://lh3.googleusercontent.com/c-WG7B3n15frqVIWq56TPVcLsAiZiICr69TGliXOr_pvYDYXC2rdm1rq-eCJgz-0yfpo5BllpkV5SA8K5FytRAMHcvyG7j3kfpwb5jaoYDvT10W3gj3r8ZGsBIhpVtC-aFuK8HP46-NJV4-1zb8y2cjv7J4YmI3IYQ8rYZEydUPZl3vY1SF4gD1EVcce8nAfcUTXsjhpEBvsR6uaMi4m0FWSZtRixqmMUPOthbSGhFZ5dQSGM3SgxHijeYhvx835FkCUKNVheonAKoZwv58c-kzL0ANFPO-RLOGdNw20KUnn5vxYexQIUsxRjq65nTzHsgOlj_hMeCRikBnmy7AOalC1PDOc8wbX3Ny_qpsxeIChy7w8Elg-Ge6SlfBqu4VPuiGPH2RWaMsakE6sU5-2ag9lbeor3xWVS7nLqBEu9z8Xnr1yR2kEjlZ99gmieP6VTX8sWfUUQCTujJpi8UGo91gcPMAV-M5ZBmxRNPcqLbclLttFXYe3--PsGwih3Yp95-A2IenmkHpVpC1-EuGs5qoclf-ur_oTKy2L6ZsXjSSjfHsbaiilyB8Rvo59mAbJPvw8vXWbvy2GMFmjHdBVYvQuOZYMOF4vEDTcjypOYCO0qG5-XpOTE_mkJSNj9Fv7=w2316-h1736-no",
      "width": 100,
      "height": 100
    },
    {
      "url": "https://lh3.googleusercontent.com/TtVmOyQRfv2-c15rhQU1qrUjo7ukgsdXCvegd_td9El88jawcVd4nqJ2AZwaltwK1lyQ_GQDCLK4Sa-E3fRc4DfOYBnZHvTtk-wcx1RNSzg375sM_Ri_Ha-MElijMyY29yAzjeu4G7xgnKjWHJBIV_QIUTsgpzvCD2hrw7_0iouysfZNz2YLsPe77R4SiabzV_3aPcu1zrG_gon9g3oucxv5vddhNcqTQ1jPX_pZeS6BzrQzsoWM3QutJQsvl9iEpIkmlfbmQyIPjtPw1OSIv95_53lm-Nmd3Ba4QB_kLm6dDxxTdNT5H0bI_ecVtqY-95JocjFyDp26O70hLZULKG44CNQzpmXshyuvLKj91DRDZgXk55xlhEy4714_82VGORv9zRlmamLXe6fXUSNqvZbckQzjlXpq3fYyv3bP_5n6C9L-yHqmZXXPmIM9Fw9m6WcdcRC_s5mF0YLdim2967yxc9zwpW0WpZMEI9pf8Q0C06kfnPce8uTXmYNor7-0Dm4FMPJuyB7S4RerOOqTKOALFUs9rZHHN5Pw395cnutqfxgCwNnZ6BSYa86gABhM7u5hBlRx2CITdpRvOx5cuMr-gKeYdw3zF-ogQe5bwbFXAEqMgY-iZwK2XrXGwOry=w2316-h1736-no",
      "width": 100,
      "height": 100
    },
    {
      "url": "https://media-cdn.tripadvisor.com/media/photo-o/04/6d/68/55/el-machico-ristopub-steack.jpg",
      "width": 100,
      "height": 100
    },
    {
      "url": "https://media-cdn.tripadvisor.com/media/photo-p/08/b7/93/3f/photo0jpg.jpg",
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

  handleReservePress(broadcast, event) {

    this.setState({
      modalVisible: true,
      currentBroadcast: broadcast,
      modalData: {
        broadcast,
        event
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


  render(){

    const {businessId, distance} = this.props.navigation.state.params;
    return (
      <ShowController resource="businesses"
                      id={businessId}
                      basePath="/businesses">
        { ({record, isLoading}) => {

          if (isLoading || !record) return null;


          return (
            <ScrollView style={styles.scrollView}
                        contentContainerStyle={{alignItems: 'center', justifyContent: 'flex-start'}}>
              <View style={styles.generalContainer}>
                <ImagesScrollView business={businessImg}/>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={this.state.modalVisible}
                  presentationStyle={'overFullScreen'}
                >
                  <ReservationConfirmView   onConfirmPress={this.handleConfirm.bind(this)}
                                            onCancelPress={this.handleModalDismiss.bind(this)}
                                            data={this.state.modalData}/>
                </Modal>
                <View style={styles.cardContainer}>
                  { record && <BusinessInfoCard distance={distance} business={record}/>}

                    <ReferenceManyFieldController
                        resource="broadcasts"
                      reference="broadcasts"
                      target="business"
                      source="id"
                      record={record}
                      >
                      {controllerProps => <BroadcastInProfileList {...controllerProps}
                                                                  onReservePress={this.handleReservePress.bind(this)}/>}

                    </ReferenceManyFieldController>

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










