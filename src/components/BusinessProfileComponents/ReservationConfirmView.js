import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withNamespaces } from 'react-i18next';
import {Text, Image, StyleSheet, Animated, View, Easing} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Slider } from "react-native-elements";
import AnimateNumber from 'react-native-animate-number';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import 'moment/min/locales';
import { connect } from 'react-redux';
import get from 'lodash/get';

import { Button, VersionedImageField, Touchable, Input } from '../common';
import themes from '../../styleTheme';
import Images from "../../assets/images";
import Helpers from "../../helpers";
import {Fonts} from "../common/Fonts";


moment.locale(DeviceInfo.getDeviceLocale());
const CHEER_BAR_WIDTH = themes.base.deviceDimensions.width-64;

//Inizializzo i voti a zero se non sono presenti nel broadcast
const votes = {
  cheers: {
    home: 0,
    guest: 0,
    total: 0,
  }
};

class ReservationConfirmView extends Component {

  constructor() {
    super();
    this.state = {
      numPeople: 0,
      backOpacity: 0,
      firstCompViewWidth: new Animated.Value(0),
      firstCompCheersPercentage: 0,
      secondCompCheersPercentage: 0,
      cheerFor: "",
      previousCheers: {}
    };
  }

  componentDidMount(): void {
    const { cheers } = this.props.data.broadcast;
    const total = cheers && cheers.total ? cheers.total : 0;
    const home = cheers && cheers.home ? cheers.home : 0;
    const guest = cheers && cheers.guest ? cheers.guest : 0;

    const firstCompPercentage = total === 0 ? 50 : (home*100)/total;
    const secondCompPercentage = 100 - firstCompPercentage;

    const initialBarWidth =
      total === 0 ?
        CHEER_BAR_WIDTH/2 : home === 0 ?
        0 : (CHEER_BAR_WIDTH * home)/total;

    this.setState({
      firstCompCheersPercentage: firstCompPercentage.toFixed(0),
      secondCompCheersPercentage: secondCompPercentage.toFixed(0),
      firstCompViewWidth: new Animated.Value(initialBarWidth),
      previousCheers: {
        total: total,
        home: home,
        guest: guest
      }
    })
  }


  componentWillMount(){
    this.flip = new Animated.Value(0);

    this.value = 0;

    this.flip.addListener(({ value }) => {
      if(value > 89 && this.state.backOpacity === 0){
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

  }

  nextPress() {
    Animated.timing(this.flip, {
      toValue: 180,
      duration: 500
    }).start();
  }

  firstCompetitorVoting() {

    const { cheers } = this.props.data.broadcast;
    //const { total, home } = cheers ? cheers : votes.cheers;
    const total = cheers && cheers.total ? cheers.total : 0;
    const home = cheers && cheers.home ? cheers.home : 0;
    const newTotalCheers = total + 1;
    const newHomeCompCheers = home + 1;
    const newBarWidth = (CHEER_BAR_WIDTH * newHomeCompCheers)/newTotalCheers;

    const firstCompPercentage = (newHomeCompCheers*100)/newTotalCheers;
    const secondCompPercentage = 100 - firstCompPercentage;

    this.setState({
      firstCompCheersPercentage: firstCompPercentage,
      secondCompCheersPercentage: secondCompPercentage,
      cheerFor: "__home__"
    });

    Animated.timing(this.state.firstCompViewWidth, {
      toValue: newBarWidth,
      duration: 500,
      delay: 0,
      easing: Easing.out(Easing.cubic)
    }).start()
  }

  secondCompetitorVoting() {

    const { cheers } = this.props.data.broadcast;
    //const { total, home } = cheers ? cheers : votes.cheers;
    const total = cheers && cheers.total ? cheers.total : 0;
    const home = cheers && cheers.home ? cheers.home : 0;
    const newTotalCheers = total + 1;
    const newBarWidth = (CHEER_BAR_WIDTH * home)/newTotalCheers;

    const firstCompPercentage = (home*100)/newTotalCheers;
    const secondCompPercentage = 100 - firstCompPercentage;

    this.setState({
      firstCompCheersPercentage: firstCompPercentage,
      secondCompCheersPercentage: secondCompPercentage,
      cheerFor: "__guest__"
    });

    Animated.timing(this.state.firstCompViewWidth, {
      toValue: newBarWidth,
      duration: 500,
      delay: 0,
      easing: Easing.out(Easing.cubic)
    }).start()
  }

  render() {

    const { onCancelPress, onConfirmPress, onLoginPress, event, business, t, isAuth } = this.props;
    if (!this.props.data || !event) return null;

    const { broadcast } = this.props.data;

    const { offer } = broadcast;
    const hasOffer = offer && (offer.value || offer.value === 0)
    const hasCompetitors = event.sport.has_competitors;

    const { competitorsHaveLogo } = event.competition;
    const { competitors } = event;

    //TODO: Da sostituire con i colori dei competitor presi dal server
    const firstCompetitorColor = event.competitors[0] && event.competitors[0].color ? event.competitors[0].color : "#ABCDDD";
    const secondCompetitorColor = event.competitors[1] && event.competitors[1].color ? event.competitors[1].color : "#2752A5";

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

    const firstCompImgHandler = () => {
      return (
        competitorsHaveLogo ?
          event.competitors[0]._links.image_versions ?
            <VersionedImageField
              source={event.competitors[0]._links.image_versions}
              minSize={{width: 64, height: 64}}
              imgSize={{width: 37, height: 37}}
              resizeMode={'contain'}/> : null
          :
          event.competition.image_versions ?
            <VersionedImageField
              source={event.competition.image_versions}
              minSize={{width: 64, height: 64}}
              imgSize={{width: 37, height: 37}}
              resizeMode={'contain'}/> : null
      )

    };

    const secondCompImgHandler = () => {
      return (
        competitorsHaveLogo ?
          event.competitors[1]._links.image_versions ?
            <VersionedImageField
              source={event.competitors[1]._links.image_versions}
              minSize={{width: 64, height: 64}}
              imgSize={{width: 37, height: 37}}
              style={{marginTop: 8}} resizeMode={'contain'}/> : null
          : null
      )
    };

    const eventRecapView = () => (
      <View style={{marginLeft: 16, justifyContent: 'space-between', flex: 1}}>
        <Text adjustsFontSizeToFit numberOfLines={1} style={styles.eventNameText}>{event.name}</Text>
        <Text style={styles.eventDateText}>{date}</Text>
        <Text style={styles.eventTimeText}>{time}</Text>
      </View>
    );

    const offerRecapView = () => (
      <View style={styles.offerView}>
        <Text style={styles.headerOfferText}>{t("browse.getOffer.info")}</Text>
        <Text style={styles.offerText}>{discount(offer.type)} {t("common.atCheckout")}*</Text>
        <Text style={styles.noteText}>*{t("browse.getOffer.additionalInfo")}</Text>
      </View>
    );


    const cheerView = () => (
      <View style={styles.offerView}>
        <Text style={styles.whomSupport}>{t("browse.getOffer.whomSupport")}</Text>
        <View style={styles.competitorsVotingView}>
          <Touchable style={[styles.competitorButton, {backgroundColor: firstCompetitorColor}]} onPress={() => this.firstCompetitorVoting()}>
            <Text style={styles.competitorNameInButton}>{competitors[0].name}</Text>
          </Touchable>
          <Touchable style={[styles.competitorButton, {backgroundColor: secondCompetitorColor}]} onPress={() => this.secondCompetitorVoting()}>
            <Text style={styles.competitorNameInButton}>{competitors[1].name}</Text>
          </Touchable>
        </View>
        <View style={[styles.votesBar, {backgroundColor: secondCompetitorColor}]}>
          <Animated.View style={[styles.firstCompVotes, {backgroundColor: firstCompetitorColor, width: this.state.firstCompViewWidth}]}/>
        </View>
        <View style={styles.percentageView}>
          <Text style={styles.percentageText}>
            <AnimateNumber
              style={styles.percentageText}
              value={this.state.firstCompCheersPercentage}
              countBy={10}
              formatter={(val) => {
                return parseFloat(val).toFixed(1)}}/>
            %
          </Text>
          <Text style={styles.percentageText}>
            <AnimateNumber
              style={styles.percentageText}
              value={this.state.secondCompCheersPercentage}
              countBy={10}
              formatter={(val) => {
                return parseFloat(val).toFixed(1)}}/>
            %
          </Text>
        </View>
        <Text style={styles.estimationText}>{t("browse.getOffer.supportersEstimation")} {business.name}</Text>
      </View>
    );

    const playerCheerView = () => (
      <View style={styles.offerView}>
        <Text style={styles.whomSupport}>{t("browse.getOffer.whomSupport")}</Text>
        <Input
          placeholder={t("browse.getOffer.typeWhom")}
          placeholderTextColor={themes.base.inputPlaceholderColor}
          numberOfLines={1}
          shake={true}
          containerStyle={styles.inputOuterContainer}
          inputContainerStyle={{borderBottomWidth: 0}}
          inputStyle={styles.textInputStyle}
          onChangeText={(text) => this.setState({cheerFor: text})}
        />
        <Text style={styles.estimationText}>{t("browse.getOffer.cheerWithUs")} {business.name}</Text>
      </View>
    );


    return (

      <View>
        <Animated.View style={[styles.container, backAnimatedStyle]} elevation={3}>
          {/*<Text style={{fontFamily: Fonts.LatoSemibold, fontSize: 18}}>{hasOffer ? t("browse.getOffer.title") : "Riepilogo"}</Text>*/}
          <View style={styles.eventInfoView}>
            <View style={styles.competitorsLogoView}>
              { firstCompImgHandler() }
              { secondCompImgHandler() }
            </View>
            {eventRecapView()}
            <View style={styles.sportIconView}>
              <Image source={Images.icons.sports[Helpers.sportSlugIconMap(event.sport.slug)]} style={styles.sportIcon}/>
            </View>
          </View>
          {
            hasCompetitors ?
              cheerView() : playerCheerView()
          }
          <View style={{overflow: 'hidden', flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingTop: 16, alignItems: 'center'}}>
            <Button round clear uppercase onPress={onCancelPress}>
              {t("browse.getOffer.cancel")}
            </Button>
            <Button round elevation={1} onPress={isAuth ? () => onConfirmPress(this.state.numPeople, this.state.cheerFor, this.state.previousCheers) : onLoginPress}
                    uppercase clear variant="primary">
              {isAuth ? t("browse.getOffer.confirm") : t("auth.login.signIn")}
            </Button>
          </View>
        </Animated.View>
        {
          this.state.backOpacity === 0 ?
            <Animated.View style={[frontAnimatedStyle, styles.container, styles.backView]}>
              <View style={styles.eventInfoView}>
                <View style={styles.competitorsLogoView}>
                  { firstCompImgHandler() }
                  { secondCompImgHandler() }
                </View>
                { eventRecapView() }
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
              <View style={{overflow: 'hidden', flexDirection: 'row', justifyContent: 'space-around', width: '100%', paddingTop: 16, alignItems: 'center'}}>
                <Button round clear uppercase onPress={onCancelPress}>
                  {t("browse.getOffer.cancel")}
                </Button>
                <Button round elevation={1} onPress={isAuth ? () => this.nextPress() : onLoginPress}
                        uppercase clear variant="primary">
                  {isAuth ?
                    this.state.numPeople === 0 ? t("common.skip") : t("common.next")
                    :
                    t("auth.login.signIn")}
                </Button>
              </View>
            </Animated.View> : null
        }

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
    borderColor: themes.base.colors.white.divisor,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingTop: 16,
    paddingBottom: 16
  },
  headerOfferText: {
    fontFamily: Fonts.LatoMedium,
    fontSize: 18
  },
  whomSupport: {
    fontFamily: Fonts.LatoMedium,
    fontSize: 18,
    alignSelf: 'center'
  },
  competitorsVotingView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16
  },
  competitorButton: {
    width: themes.base.deviceDimensions.width/3,
    borderRadius: themes.base.borderRadius/2,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  competitorNameInButton: {
    color: themes.base.colors.white.light,
    fontFamily: Fonts.LatoBold,
    fontSize: 16,
    alignSelf: "center",
    textAlign: "center"
  },
  votesBar: {
    marginTop: 16,
    height: 20,
    overflow: 'hidden',
    //borderWidth: 1,
    borderColor: themes.base.colors.accent.default,
    borderRadius: 10
  },
  percentageView: {
    flexDirection: "row",
    justifyContent: 'space-around',
    marginTop: 8
  },
  percentageText: {
    fontFamily: Fonts.LatoBoldItalic,
    fontSize: 18
  },
  estimationText: {
    alignSelf: 'center',
    marginTop: 5,
    fontFamily: Fonts.LatoLightItalic,
    fontSize: 16
  },
  firstCompVotes: {
    height: 20,
    borderBottomLeftRadius: 10,
    borderTopLeftRadius: 10
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
  inputOuterContainer: {
    width:'100%',
    backgroundColor: 'transparent',
    maxHeight: 60,
    justifyContent: 'center',
    ...themes.base.elevations.depth1,
    position: 'relative',
  },
  textInputStyle: {
    fontFamily: themes.base.fonts.LatoMedium,
    backgroundColor: '#fff',
    elevation: 2,
    borderRadius: 100,
    paddingLeft: 16,
    paddingRight: 16,
    margin: 12,
    fontSize: 16,
    borderColor: themes.base.colors.accent.default,
    borderWidth: 1
  },
});

const mapStateToProps = (state, props) => {
  const { broadcast } = props.data;
  const event = get(state, `entities.events.data[${broadcast.event}]`);
  const business = get(state, `entities.businesses.data[${broadcast.business}]`);

  if (!event) return {};
  return {
    event,
    business
  }
};



export default compose(
  connect(mapStateToProps),
  withNamespaces()
)(ReservationConfirmView);