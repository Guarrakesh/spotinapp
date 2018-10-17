import React from 'react';
import PropTypes from "prop-types";
import {Text, StyleSheet, ImageBackground, Image, Alert} from 'react-native';
import { Button } from 'react-native-elements';

import View from '../common/View';
import {Fonts} from "../../components/common/Fonts";
import themes from "../../styleTheme";
import Helpers from '../../helpers';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ReferenceField from '../common/ReferenceField';
import VersionedImageField from "../common/VersionedImageField";
import Images from "../../assets/images";
import moment from "moment";
import 'moment/locale/it';

const colors = themes.base.colors;

const ReservationView = ({reservation, onPress}) => {

  const { broadcast, createdAt } = reservation;
  const { offer, newsfeed, event } = broadcast;


  // let roundedDistance = Math.round(dist.calculated*10)/10;
  // roundedDistance = roundedDistance.toString().replace(".",",");

  let date = (startAt) => {
    return(
        moment(startAt).locale('it').format('dddd D MMMM')
    )
  }

  let time = (startAt) => {
    return(
        moment(startAt).locale('it').format('HH:mm')
    )
  };

  const discount = (type) => {
    switch (parseInt(type)) {
      case 0:
        return `${offer.value}€`;
      case 1:
        return `-${offer.value}%`;
      case 2:
        return `-${offer.value}€`;
      default:
        return null;
    }
  };

  const deletePress = () => {
    Alert.alert(
        'Eliminare la prenotazione?',
        'Eliminando la prenotazione non avrai più diritto allo sconto',
        [
          {text: 'Annulla', style: 'cancel'},
          {text: 'Elimina', onPress: () => console.log('OK Pressed')},
        ],
        { cancelable: true }
    )
  }


  return(
      <View style={styles.container} elevation={2}>
        <ReferenceField reference={"businesses"} source={"business"} record={broadcast}>
          { ({record: business}) =>
              <View style={styles.imgContainer}>
                <ImageBackground
                    source={{uri: business.cover_versions[0] ? business.cover_versions[0].url : "https://www.hotelristorantemiranda.com/wp-content/uploads/2014/09/ristorante-slide-01.jpg"}}
                    style={styles.imgBackground}
                >
                  <View style={styles.businessContainer}>
                    <Text style={styles.businessName}>{business.name}</Text>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{flexDirection: 'column', flex: 1}}>
                        <Text style={styles.businessType}>{business.type.join(' • ')}</Text>
                        <Text style={styles.businessAddress}>{business.address.street} {business.address.number}</Text>
                        <Text style={styles.businessAddress}>{business.address.city} ({business.address.province})</Text>
                      </View>
                      <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', right: 8, bottom: 8}}>
                        <Icon name="map-marker-radius" color={colors.white.light} size={20}/>
                        <Text style={styles.businessDistance}>1,2 km</Text>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </View>}
        </ReferenceField>

        <View style={styles.eventInfoView}>
        <ReferenceField resource="competitions" source="competition" record={event}>
          { ({record: competition}) =>
            competition.competitorsHaveLogo
              ?
              <View style={styles.competitorsLogoView}>
                {event.competitors.map(comp => { return (
                  <VersionedImageField source={comp._links.image_versions} minSize={{width: 62, height: 62}} imgSize={{width: 32, height: 32}}/>
                )})}
              </View>
              :
              <View style={{marginTop: 8, marginLeft: 16}}>
                { <VersionedImageField source={competition.image_versions} minSize={{width: 128, height: 128}} imgSize={{width: 48, height: 48}} />}
              </View>


          }
        </ReferenceField>



          <View style={{margin: 16, marginTop: 0, justifyContent: 'space-between'}}>
            <Text style={styles.eventNameText}>{event.name}</Text>
            <Text style={styles.eventDateText}>{date(event.start_at)}</Text>
            <Text style={styles.eventTimeText}>{time(event.start_at)}</Text>
          </View>


          <View style={styles.sportIconView}>
            <Image source={Images.icons.sports[Helpers.sportSlugIconMap(sport.slug)]} style={styles.sportIcon}/>
          </View>


        </View>
        )}

        {(newsfeed || newsfeed > 0) ?
            <View style={styles.offerInfoView}>
              <Text style={styles.offerTitleText}>{offer.title}</Text>
              <Text style={styles.offerDescriptionText}>{offer.description}</Text>
            </View> : null
        }
        <View style={styles.offerReservationView}>
          <View style={styles.offerContainer}>
            <Text style={styles.offerText}>{discount(offer.type)} alla cassa</Text>
          </View>

          <View style={styles.reservedView}>

            <Button
                title={"Elimina".toUpperCase()}
                titleStyle={styles.deleteText}
                buttonStyle={styles.deleteButton}
                containerStyle={{borderRadius: 50}}
                onPress={() => deletePress()}
            />
          </View>

        </View>
      </View>
  )


};

ReservationView.propTypes = {
  reservation: PropTypes.object,
  onPress: PropTypes.func
}

const styles = StyleSheet.create({
  container: {
    borderRadius: themes.base.borderRadius,
    //overflow: 'hidden',
    margin: 8,
    backgroundColor: themes.base.colors.white.light
  },
  imgContainer: {
    borderTopLeftRadius: themes.base.borderRadius,
    borderTopRightRadius: themes.base.borderRadius,
    overflow: 'hidden'
  },
  imgBackground: {
    borderTopLeftRadius: themes.base.borderRadius,
    borderTopRightRadius: themes.base.borderRadius,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    paddingTop: 100,
    backgroundColor: themes.base.colors.white.light
  },
  businessContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  businessName: {
    fontFamily: Fonts.LatoBold,
    fontSize: 20,
    color: colors.white.light,
  },
  businessType: {
    fontFamily: Fonts.Lato,
    fontSize: 16,
    color: themes.base.colors.white.light
  },
  businessDistance: {
    fontSize: 18,
    fontFamily: Fonts.LatoBold,
    color: colors.white.light,
  },
  businessAddress: {
    fontSize: 14,
    fontFamily: Fonts.LatoLightItalic,
    color: colors.white.light,
  },
  eventInfoView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16
  },
  competitorsLogoView: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 16,

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
    position: 'absolute',
    right: 16
  },
  sportIcon: {
    width: 60,
    height: 60
  },
  offerInfoView: {
    marginLeft: 16,
    marginRight: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: themes.base.colors.white.divisor
  },
  offerTitleText: {
    fontSize: 20,
    fontFamily: Fonts.LatoBold,
    color: themes.base.colors.text.default
  },
  offerDescriptionText: {
    fontSize: 16,
    fontFamily: Fonts.Lato,
    color: themes.base.colors.text.default
  },
  offerReservationView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16
  },
  offerContainer: {
    //borderWidth: 2,
    borderColor: themes.base.colors.accent.default,
    borderRadius: 100,
  },
  offerText: {
    fontSize: 16,
    fontFamily: Fonts.LatoBold,
    color: themes.base.colors.danger.default,
  },
  reservedView: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 5,
    borderRadius: 50,
    overflow: 'hidden'
  },
  deleteButton: {
    backgroundColor: themes.base.colors.danger.light,
    alignItems: 'center',
    borderColor: "transparent",
  },
  deleteText: {
    fontSize: 16,
    fontFamily: Fonts.LatoBold,
    color: themes.base.colors.white.light,
    marginLeft: 16,
    marginRight: 16

  },
})

export default ReservationView;