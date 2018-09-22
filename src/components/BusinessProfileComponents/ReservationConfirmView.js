import React, {Component} from 'react';
import PropTypes from 'prop-types';
import View from '../common/View';
import {Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import themes from '../../styleTheme';
import Images from "../../assets/images";
import Helpers from "../../helpers";
import {Fonts} from "../common/Fonts";
import moment from "moment";

class ReservationConfirmView extends Component {


  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {

    const {onCancelPress, onConfirmPress} = this.props;
    if (!this.props.data) return null;

    const {broadcast} = this.props.data;
    console.log(broadcast);

    const { event, offer } = broadcast;

    let date = moment(event.start_at).locale('it').format('dddd D MMMM');
    let time = moment(event.start_at).locale('it').format('HH:mm');

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

    return (

        <View style={styles.container} elevation={3}>
          <Text style={{fontFamily: Fonts.LatoSemibold, fontSize: 18}}>Vuoi prenotare questa offerta?</Text>
          <View style={styles.eventInfoView}>
            <View style={styles.competitorsLogoView}>
              { event.competition.competitorsHaveLogo ? <Image source={{uri: event.competitors[0].competitor.image_versions[0].url}} style={{width: 37, height: 37}} resizeMode={'contain'}/> : <Image source={{uri: event.competition.image_versions[0].url}} style={{width: 37, height: 37}} resizeMode={'contain'}/> }
              { event.competition.competitorsHaveLogo ? <Image source={{uri: event.competitors[1].competitor.image_versions[0].url}} style={{width: 37, height: 37, marginTop: 8}} resizeMode={'contain'}/> : null }
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
            <Text style={{fontFamily: Fonts.LatoBold, fontSize: 18, color: themes.base.colors.accent.default, marginTop: 8, alignSelf: 'center'}}>{discount(offer.type)} alla cassa</Text>
            <Text style={{fontFamily: Fonts.LatoLightItalic, fontSize: 12, color: themes.base.colors.danger.default, marginTop: 16}}>*lo sconto non include la prenotazione di un tavolo riservato presso il locale</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingTop: 16, alignItems: 'center'}}>
            <TouchableOpacity onPress={onCancelPress}>
              <Text style={{fontFamily: Fonts.LatoBold, fontSize: 14, color: themes.base.colors.text.default, marginLeft: 16}}>ANNULLA</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirmPress}>
              <View style={styles.confirmButton} elevation={2}>
                <Text style={styles.confirmText}>CONFERMA</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

    );
  }
}

ReservationConfirmView.propTypes = {
  onConfirmPress: PropTypes.func,
  onCancelPress: PropTypes.func,

}
const styles = StyleSheet.create({
  container: {
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