import React from 'react';
import PropTypes from "prop-types";
import {Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';

import View from '../common/View';
import {Fonts} from "../../components/common/Fonts";
import themes from "../../styleTheme";
import Helpers from '../../helpers';

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ReferenceField from '../common/ReferenceField';
import ReferenceFieldController from '../../controllers/ReferenceController';



const colors = themes.base.colors;

const ReservationFloatingCard = ({
    reservation,
    onPress,
    elevation,
    dark
}) => {

  const { broadcast, createdAt } = reservation;
  const { offer } = broadcast;


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

  return(
      <View style={styles.outerContainer} elevation={elevation}>
        <TouchableOpacity onPress={onPress} style={{flex: 1,    borderRadius: themes.base.borderRadius}}>
          <ReferenceField reference="businesses" source="business" record={broadcast}>
            { ({record: business}) =>
              !business ? null :
                <ImageBackground
                    imageStyle={{borderRadius: themes.base.borderRadius}}
                    source={{uri: business.image_url ? business.image_url[0].url : "https://www.hotelristorantemiranda.com/wp-content/uploads/2014/09/ristorante-slide-01.jpg"}}
                    style={styles.imgBackground(6)}
                >
                  <View elevation={3} style={styles.status}>
                  {reservation.used ? <Icon name="check" size={32} color={themes.base.colors.primary.default}/>
                      : <Icon name="clock" size={32} color={themes.base.colors.text.default}/>}
                </View>
                  <View
                      style={[{...styles.bottomContainer}, (dark ? {...styles.darkBackground} : {...styles.lightBackground})]}>

                    <View style={styles.leftInfo}>
                      <Text
                          style={[styles.name, dark ? {color: colors.white.default} : {color: colors.text.default}]}>{business.name}</Text>
                      <ReferenceField reference="events" record={broadcast} source="event">
                        { ({record: event}) =>
                            <View>
                              <Text style={[styles.eventName, dark ? {color: colors.white.default} : {color: colors.text.default}]}>
                                {event.name}
                              </Text>
                              <View >
                                <Text style={styles.eventDate}>{Helpers.formattedEventDate(event.start_at, "D MMMM [alle] HH:mm")}</Text>
                              </View>
                            </View>
                        }
                      </ReferenceField>



                    </View>
                    <View style={styles.offerValue}>
                      <Text style={{
                        fontSize: 24,
                        color: dark ? colors.danger.light : colors.danger.default,
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}>
                        {discount(offer.type)}
                      </Text>
                      <Text style={{
                        fontSize: 13,
                        color: dark ? colors.danger.light : colors.danger.default,
                        fontWeight: 'bold',
                        textAlign: 'center'
                      }}>
                        alla cassa
                      </Text>
                    </View>
                  </View>
                </ImageBackground>
            }
          </ReferenceField>

        </TouchableOpacity>
      </View>

  )
};

ReservationFloatingCard.propTyeps = {
  onPress: PropTypes.func,
  reservation: PropTypes.object,
  dark: PropTypes.bool,
  elevation: PropTypes.number,
};

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    //I padding servono per dare spazio all'ombra
    height: 250,


  },
  imgBackground: (elevation = 4) => ({
    position: 'relative',
    flex: 1,
    paddingTop: 180,
    resizeMode: 'stretch',
    borderRadius: themes.base.borderRadius,
    elevation: elevation,
    marginBottom: 16,
    marginLeft: 8,
    marginRight: 16,
  }),
  bottomContainer: {
    zIndex: 9,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 16,
    paddingTop: 24, paddingBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255,255,255,1)'

  },
  darkBackground: {
    backgroundColor: 'rgba(43,39,39,.8)',
  },
  lightBackground: {
    backgroundColor: 'rgba(255,255,255,1)'
  },
  leftInfo: {

  },
  offerValue: {
    alignSelf: 'center'
  },
  name: {
    fontSize: 14,

    fontWeight: '300',
  },
  eventName: {
    fontWeight: '700',
    fontSize: 16,


  },
  eventDate: {
    fontWeight: '500',
    color: themes.base.colors.text.default,
    fontSize: 12
  },
  status: {
    zIndex: 10,
    position: 'absolute',
    right: 16,
    height: 55, width: 55,
    bottom: '150%',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 50,

  }


})

export default ReservationFloatingCard;