import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withNamespaces } from 'react-i18next';
import {Text, Image, StyleSheet, Animated} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Slider } from "react-native-elements";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import 'moment/min/locales';
import { connect } from 'react-redux';
import get from 'lodash/get';

import { View, Button } from '../common';
import themes from '../../styleTheme';
import Images from "../../assets/images";
import Helpers from "../../helpers";
import {Fonts} from "../common/Fonts";


moment.locale(DeviceInfo.getDeviceLocale());

class ReservationConfirmView extends Component {

constructor() {
  super();
  this.state = {
    numPeople: 0,
    backOpacity: 0
  };
}

  componentWillMount(){
    this.flip = new Animated.Value(0);

    this.value = 0;

    this.flip.addListener(({ value }) => {
      if(value > 89){
        this.setState({backOpacity: 1});
      }
    });

    this.frontInterpolate = this.flip.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
      extrapolate: 'clamp'
    });

    this.backInterpolate = this.flip.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg'],
      extrapolate: 'clamp'
    });

    // this.backOpacity = this.flip.interpolate({
    //   inputRange: [89, 90],
    //   outputRange: [0, 1]
    // });

  }

  nextPress() {
    Animated.timing(this.flip, {
      toValue: 180,
      duration: 500
    }).start();
  }

  render() {

    const { onCancelPress, onConfirmPress, onLoginPress, event, t, isAuth } = this.props;
    if (!this.props.data || !event) return null;

    const { broadcast } = this.props.data;

    const { offer } = broadcast;

    let date = moment(event.start_at).format('dddd D MMMM');

    let time = moment(event.start_at).format('HH:mm');
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

    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    };

    const backAnimatedStyle = {
      opacity: this.state.backOpacity,
      transform: [
        { rotateY: this.backInterpolate }
      ]
    };

    return (

      <View>
        <Animated.View style={[styles.container, backAnimatedStyle]} elevation={3}>
          <Text style={{fontFamily: Fonts.LatoSemibold, fontSize: 18}}>{t("browse.getOffer.title")}</Text>
          <View style={styles.eventInfoView}>
            <View style={styles.competitorsLogoView}>
              { event.competition.competitorsHaveLogo ? <Image source={{uri: event.competitors[0]._links.image_versions[0].url}} style={{width: 37, height: 37}} resizeMode={'contain'}/> : <Image source={{uri: event.competition.image_versions[0].url}} style={{width: 37, height: 37}} resizeMode={'contain'}/> }
              { event.competition.competitorsHaveLogo ? <Image source={{uri: event.competitors[1]._links.image_versions[0].url}} style={{width: 37, height: 37, marginTop: 8}} resizeMode={'contain'}/> : null }
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
          <View style={styles.offerView}>
            <Text style={styles.headerOfferText}>{t("browse.getOffer.info")}</Text>
            <Text style={styles.offerText}>{discount(offer.type)} {t("common.atCheckout")}*</Text>
            <Text style={styles.noteText}>*{t("browse.getOffer.additionalInfo")}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingTop: 16, alignItems: 'center'}}>
            <Button clear uppercase onPress={onCancelPress}>
              {t("browse.getOffer.cancel")}
            </Button>

            <Button elevation={1} onPress={isAuth ? () => onConfirmPress(this.state.numPeople) : onLoginPress}
                    uppercase clear variant="primary">
              {isAuth ? t("browse.getOffer.confirm") : t("auth.login.signIn")}
            </Button>
          </View>
        </Animated.View>
        <Animated.View style={[frontAnimatedStyle, styles.container, styles.backView]}>
          <View style={styles.eventInfoView}>
            <View style={styles.competitorsLogoView}>
              { event.competition.competitorsHaveLogo ? <Image source={{uri: event.competitors[0]._links.image_versions[0].url}} style={{width: 37, height: 37}} resizeMode={'contain'}/> : <Image source={{uri: event.competition.image_versions[0].url}} style={{width: 37, height: 37}} resizeMode={'contain'}/> }
              { event.competition.competitorsHaveLogo ? <Image source={{uri: event.competitors[1]._links.image_versions[0].url}} style={{width: 37, height: 37, marginTop: 8}} resizeMode={'contain'}/> : null }
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
          <View style={styles.offerView}>
            <Text style={{fontFamily: Fonts.LatoSemibold, fontSize: 18, marginBottom: 16, alignSelf: "center"}}>{t("browse.getOffer.howManyPeople")}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.peopleText}>{this.state.numPeople === 0 ? t("browse.getOffer.dontKnow") : this.state.numPeople}</Text>
              <MaterialIcons name={"people"} size={25} style={styles.peopleIcon}/>
            </View>
            <Slider
              value={this.state.numPeople}
              minimumValue={0}
              maximumValue={20}
              step={1}
              style={{justifyContent: 'center', marginLeft: 16, marginRight: 16}}
              //trackStyle={{height: 1}}
              thumbStyle={{borderWidth: 2, borderColor: themes.base.colors.accent.default}}
              thumbTintColor={themes.base.colors.white.light}
              onValueChange={(numPeople) => this.setState({numPeople})} />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingTop: 16, alignItems: 'center'}}>
            <Button clear uppercase onPress={onCancelPress}>
              {t("browse.getOffer.cancel")}
            </Button>
            <Button elevation={1} onPress={isAuth ? () => this.nextPress() : onLoginPress}
                    uppercase clear variant="primary">
              {isAuth ?
                this.state.numPeople === 0 ? t("common.skip") : t("common.next")
                :
                t("auth.login.signIn")}
            </Button>
          </View>
        </Animated.View>
      </View>
    );
  }
}

ReservationConfirmView.propTypes = {
  onConfirmPress: PropTypes.func,
  onCancelPress: PropTypes.func,

};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: themes.base.colors.white.light,
    borderRadius: 8,
    borderColor: themes.base.colors.text.default,
    alignItems: 'center',
    backfaceVisibility: "hidden"
  },
  backView: {
    alignSelf: 'center',
    position: "absolute"
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
  sportIconView: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  sportIcon: {
    width: 60,
    height: 60
  },
  offerView: {
    width: '100%',
    borderColor: '#EEEEEE',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingTop: 16,
    paddingBottom: 16
  },
  headerOfferText: {
    fontFamily: Fonts.LatoMedium,
    fontSize: 18
  },
  offerText: {
    fontFamily: Fonts.LatoBold,
    fontSize: 18,
    color: themes.base.colors.danger.default,
    marginTop: 8,
    alignSelf: 'center'
  },
  noteText: {
    fontFamily: Fonts.LatoLightItalic,
    fontSize: 16,
    color: themes.base.colors.danger.default,
    marginTop: 16
  },
  cancelButtonText: {
    fontFamily: Fonts.LatoBold,
    fontSize: 14,
    color: themes.base.colors.text.default,
    marginLeft: 16,
    textDecorationLine: 'underline'
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
  },
  peopleText: {
    fontSize: 28,
    alignSelf: 'center',
    fontFamily: Fonts.LatoBold,
    color: themes.base.colors.text.default
  },
  peopleIcon: {
    position: 'absolute',
    right: 16,
    color: themes.base.colors.accent.default
  },
});

const mapStateToProps = (state, props) => {
  const { broadcast } = props.data;
  const event = get(state, `entities.events.data[${broadcast.event}]`);
  if (!event) return {};
  return {
    event
  }
};



export default compose(
  connect(mapStateToProps),
  withNamespaces()
)(ReservationConfirmView);