import React from "react";
import {connect} from "react-redux";
import firebase from "react-native-firebase";
import {StyleSheet, Animated, Text} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import i18n from "../../i18n/i18n";
import moment from 'moment';
import 'moment/locale/it';
import {VersionedImageField, View} from "../../components/common";
import ReferenceField from "../../components/common/ReferenceField";
import { sendReview } from "../../actions/reviews";
import themes from "../../styleTheme";
import Typography from "../../components/common/Typography";
import {Fonts} from "../../components/common/Fonts";
import ReviewFloatingCard from "../../components/ProfileComponents/reviews/ReviewFloatingCard";
import { profileGetInfo } from "../../actions/profile";
import NavigationService from "../../navigators/NavigationService";

/*
const response = {
  comment: String,
  userId: Id,
  broadcastId: Id,
  rating: {
    av: Number,
    food: Number,
    price Number,
    people Number,
    sub: Number,
  }
*/
const textColor = themes.base.colors.white.default;
const deviceWidth = themes.base.deviceDimensions.width;
const deviceHeight = themes.base.deviceDimensions.height;

const questions = [
  {
    quest: `${i18n.t("profile.reservations.questions.foodQuest")} 🍽`,
    answers: [
      `${i18n.t("profile.reservations.answers.food.veryBad")}`,
      `${i18n.t("profile.reservations.answers.food.bad")}️`,
      `${i18n.t("profile.reservations.answers.food.good")}`,
      `${i18n.t("profile.reservations.answers.food.veryGood")}`,
      `${i18n.t("profile.reservations.answers.food.excellent")}️`],
    type: "food"
  },
  {
    quest: `${i18n.t("profile.reservations.questions.avQuest")}`,
    answers: [
      `${i18n.t("profile.reservations.answers.av.avBad")}`,
      `${i18n.t("profile.reservations.answers.av.aGoodVBad")}️`,
      `${i18n.t("profile.reservations.answers.av.aBadVGood")}`,
      `${i18n.t("profile.reservations.answers.av.avGood")}`],
    type: "av"
  },
  {
    quest: `${i18n.t("profile.reservations.questions.peopleQuest")}`,
    answers: [
      `${i18n.t("profile.reservations.answers.people.empty")}`,
      `${i18n.t("profile.reservations.answers.people.notCrowded")}`,
      `${i18n.t("profile.reservations.answers.people.normal")}`,
      `${i18n.t("profile.reservations.answers.people.crowded")}`,
      `${i18n.t("profile.reservations.answers.people.veryCrowded")}`],
    type: "people"
  },
  {
    quest: `${i18n.t("profile.reservations.questions.priceQuest")} 💰`,
    answers: [
      `${i18n.t("profile.reservations.answers.price.veryExpensive")}`,
      `${i18n.t("profile.reservations.answers.price.quiteExpensive")}`,
      `${i18n.t("profile.reservations.answers.price.normal")}`,
      `${i18n.t("profile.reservations.answers.price.cheap")}`,
      `${i18n.t("profile.reservations.answers.price.veryCheap")}`],
    type: "price"
  },
  {
    quest: `${i18n.t("profile.reservations.questions.subQuest")}`,
    answers: [
      `${i18n.t("profile.reservations.answers.sub.veryBad")}`,
      `${i18n.t("profile.reservations.answers.sub.bad")}️`,
      `${i18n.t("profile.reservations.answers.sub.good")}`,
      `${i18n.t("profile.reservations.answers.sub.veryGood")}`,
      `${i18n.t("profile.reservations.answers.sub.excellent")}️`],
    type: "sub"
  },
  {
    quest: `${i18n.t("profile.reservations.questions.commentQuest")} 💬`,
    type: "comment"
  },


];


class ReviewsQuestionScreen extends React.Component {

  constructor() {
    super();
    this.state = {
      currentQuest: 0,
      comment: "",
      rating: {
        people: 0,
        av: 0,
        food: 0,
        price: 0,
        sub: 0
      }
    };
    this.handleAnswerPress = this.handleAnswerPress.bind(this);
    this.handleCommentChange = this.handleCommentChange.bind(this);
    this.handleConfirmPress = this.handleConfirmPress.bind(this);
    this.handleExitPress = this.handleExitPress.bind(this);
  }

  static navigationOptions = ({navigation}) => {
    return {
      header: null,

    }
  };

  componentDidMount() {
    const { reservation } = this.props.navigation.state.params;
    if(!this.props.position){
      this.props.profileGetInfo();
    }
  }

  componentWillMount() {
    this.disappear = new Animated.Value(0);
    this.appear = new Animated.Value(0);
    this.value = 0;

    this.disapperInterpolate = this.disappear.interpolate({
      inputRange: [0, 1],
      outputRange: [0, deviceHeight]
    });

    this.appearInterpolate = this.appear.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    })
  }

  handleAnswerPress(index, type) {

    this.setState(prevState => ({
      rating: {
        ...prevState.rating,
        [type]: index+1
      }
    }));

    setTimeout(() => this.carousel.snapToNext(), 500);

  }

  handleCommentChange(text) {
    this.setState({comment: text})
  }

  handleConfirmPress() {
    const { reservation } = this.props.navigation.state.params;
    const reservationId = reservation._id;
    const userId = this.props.userId;
    const comment = this.state.comment === "" ? undefined : this.state.comment;

    this.props.sendReview(reservationId, userId, comment, this.state.rating);
    //Elimino la notifica programmata 12 ore dopo
    firebase.notifications().cancelNotification(`rev_notification_${reservationId}`);

    Animated.timing(this.disappear, {
      toValue: 1,
      duration: 500,
    }).start(() => {
      Animated.timing(this.appear, {
        toValue: 1,
        duration: 500,
      }).start();
    });

    if(this.props.position){
      setTimeout(() => this.props.navigate("Main", {}, false), 1500);
    }
    else{
      setTimeout(() => this.props.navigate("Main", {}, true), 1500);
    }

  }

  handleExitPress() {
    if(this.props.position){
      this.props.navigate("Main", {}, false);
    }
    else{
      this.props.navigate("Main", {}, true);
    }
  }

  render() {
    const { reservation } = this.props.navigation.state.params;
    const { broadcast } = reservation;

    const disappearAnimatedStyle = {
      //opacity: this.disapperInterpolate,
      transform: [
        { translateY: this.disapperInterpolate}
      ]
    };

    const appearAnimatedStyle = {
      opacity: this.appearInterpolate
    };

    return(
      <View style={styles.container}>
        <KeyboardAwareScrollView

          bounces={false}
          keyboardShouldPersistTaps={"handled"}
        >
          <ReferenceField  source={"business"} record={broadcast} resource={"businesses"} reference={"businesses"}>
            {({record: business}) =>
              <View>
                <View style={styles.coloredBack}>
                  <Typography variant={"body"} style={styles.tellUsText}>{i18n.t("profile.reservations.tellUs")}</Typography>
                  <Typography variant={"display2"} style={styles.businessNameText}>{business.name.toUpperCase()}</Typography>
                  <ReferenceField source={"event"} record={broadcast} resource={"events"} reference={"events"}>
                    {({record: event}) =>
                      <View style={{flexDirection: "row", alignItems: "center"}}>
                        <Typography variant={"subheading"} style={styles.eventNameText}>{event.name}</Typography>
                        <Typography variant={"subheading"} style={styles.eventDateText}>{moment(event.start_at).locale('it').format('D MMM')} {moment(event.start_at).locale('it').format('HH:mm')}</Typography>
                      </View>
                    }
                  </ReferenceField>
                  <Animated.Text style={[styles.thanksText, appearAnimatedStyle]}>{i18n.t("profile.reservations.thanks")}</Animated.Text>
                </View>
                <VersionedImageField
                  isBackground={true}
                  source={business.cover_versions && business.cover_versions.length > 0 ? business.cover_versions : null}
                  resizeMode={'cover'}
                  style={{width: deviceWidth, height: deviceHeight/2, backgroundColor: "#000000"}}
                  minSize={{width: 1200, height: null}}
                  imgSize={{width: 1200, height: deviceHeight/2}}
                >
                  <View style={{flex: 1, opacity: 0.3, backgroundColor: "#000000"}}/>
                </VersionedImageField>
              </View>
            }

          </ReferenceField>

          <Animated.View style={[styles.overlayView, disappearAnimatedStyle]}>
            <Carousel data={questions}
                      enableMomentum={true}
                      swipeThreshold={0}
                      renderItem={({item}) =>
                        <ReviewFloatingCard
                          onPress={this.handleAnswerPress}
                          question={item} rating={ this.state.rating }
                          comment={ this.state.comment }
                          onCommentChange={ this.handleCommentChange }
                          onConfirmPress={ this.handleConfirmPress }
                        />
                      }
                      ref={(ref) => { this.carousel = ref}}
                      activeAnimationType={"spring"}
                      onSnapToItem={(index) => this.setState({ currentQuest: index }) }
                      inactiveSlideScale={0.3}
                      layout={'tinder'}
                      scrollEnabled={false}
                      enableSnap={true}
                      activeSlideAlignment={"center"}
                      removeClippedSubviews={false}
                      sliderWidth={deviceWidth}
                      itemWidth={deviceWidth}

            />
            <Pagination
              dotsLength={questions.length}
              containerStyle={{ bottom: deviceHeight/8 }}
              dotStyle={{
                width: 50,
                height: 10,
                borderRadius: 5,
                backgroundColor: themes.base.colors.accent.default,
              }}
              inactiveDotStyle={{
                marginLeft: -8,
                marginRight: -8,
                backgroundColor: themes.base.colors.white.light,
              }}
              activeDotIndex={this.state.currentQuest}
              dotColor={themes.base.colors.accent.default}
              inactiveDotOpacity={1}
              inactiveDotScale={0.6}
            />
            <Typography style={styles.exitText} onPress={this.handleExitPress}>{i18n.t("profile.reservations.exitReview")}</Typography>
            {/*<Typography style={[styles.exitText, {bottom: 50}]} onPress={() => this.carousel.snapToPrev()}>Indietro</Typography>*/}
          </Animated.View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    //justifyContent: "flex-start"
  },
  coloredBack: {
    height: deviceHeight/2,
    width: deviceWidth,
    backgroundColor: themes.base.colors.accent.default,
    paddingLeft: deviceWidth/9,
    paddingTop: deviceHeight/20
  },
  tellUsText: {
    color: textColor,
    fontWeight: "600",
    fontSize: 14
  },
  businessNameText: {
    color: textColor,
    fontWeight: "900",
    fontSize: 32
  },
  eventNameText: {
    color: textColor,
    fontFamily: Fonts.LatoItalic,
    fontSize: 18
  },
  eventDateText: {
    color: textColor,
    fontFamily: Fonts.LatoItalic,
    fontSize: 14,
    marginLeft: 8
  },
  thanksText: {
    color: textColor,
    textAlign: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
    fontFamily: Fonts.LatoBlack,
    fontSize: 32
  },
  exitText: {
    alignSelf: "center",
    position: "absolute",
    fontSize: 18,
    bottom: 60,
    color: textColor,
    textDecorationLine: "underline"
  },
  questionsCarousel: {
    width: deviceWidth/1.3,
    marginTop: deviceHeight/9,
    alignSelf: "center",
    borderRadius: themes.base.borderRadius,
    alignItems: "center"
  },
  overlayView: {
    flex: 1,
    top: deviceHeight/4.5,
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
    backgroundColor: 'transparent',
    //opacity: 0
  }
  // questionView: {
  //   height: deviceHeight/2,
  //   width: deviceWidth/1.3,
  //   backgroundColor: themes.base.colors.white.default,
  //   position: "absolute",
  //   margin: deviceWidth/9,
  //   marginTop: deviceHeight/4,
  //   alignSelf: "center",
  //   borderRadius: themes.base.borderRadius
  // }

});

export default connect((state) => ({
  userId: state.auth.profile._id,
  position: state.location.device.position ? state.location.device.position.coords : null
}), {
  sendReview,
  profileGetInfo,
  navigate: NavigationService.navigate,
})(ReviewsQuestionScreen);