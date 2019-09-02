import moment from "moment";
import React, { useState, useEffect  } from "react";
import {withNamespaces} from 'react-i18next';
import {Animated, Text, TextInput, Dimensions} from "react-native";
import {Slider} from "react-native-elements";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {connect} from "react-redux";
import validate from "validate.js";
import {fetchEnd, fetchStart} from "../../actions/fetchActions";
import {showNotification} from "../../actions/notificationActions";
import auth from '../../api/auth';

import {Button, Touchable, VersionedImageField, View} from "../../components/common";
import usePrevious from "../../helpers/hooks/usePrevious";
import {coordsSelector} from "../../reducers/location";
import themes from "../../styleTheme";
import signup from "../../validations/signup";
import vars from '../../vars';
import styles from './contactScreenStyles';

const colors = themes.base.colors;

const SlidingView = ({ visible, style = {}, children }) => {
  const [_visibility] = useState(new Animated.Value(visible ? 1 : 0));
  const [mounted, setMounted] = useState(visible);
  const prevVisible = usePrevious(visible);
  useEffect(() => {
    if (visible) {
      setMounted(true);
    }
    Animated.spring(_visibility, {
      toValue: visible ? 1 : 0,
      useNativeDriver: true,
    }).start(() => {
      setMounted({ mounted: visible });
    })
  }, [visible]);

  const containerStyle = {
    opacity: _visibility,
    transform: [
      {
        translateX: _visibility.interpolate({
          inputRange: [0, 1],
          outputRange: [prevVisible ? Dimensions.get('screen').width * -1 : Dimensions.get('screen').width, 0]
        })
      }
    ]
  };
  return (
      <Animated.View style={[containerStyle, style]}>
        {mounted ? children : null}
      </Animated.View>
  )
}
const  ContactUsScreen = (props) => {

  const [state, setState] = useState({
        index: 0,
        userId: "",
        email: "",
        event: "",
        userPosition: {
          latitude: props.latitude,
          longitude: props.longitude
        },
        location: "",
        maxDistance: 0,
        numOfPeople: 1,
        notes: "",
        errors: {}
      }

  );
  const [index, setIndex] = useState(0);
  useEffect(() => {

  }, [index]);
  useEffect(() => {
    const {event} = props.navigation.state.params;

    setState({...state,
      event: event._id,
      userId: props.userId,
      email: props.email,
      userPosition: {
        latitude: props.latitude,
        longitude: props.longitude
      }
    });
  }, []);


  const _sendRequest = () =>  {

    const { userId, event, userPosition, location, maxDistance, numOfPeople, notes, email } = state;
    const { t } = self.props;
    const isAuth = props.userId;
    const fetchUrl = isAuth ? `${vars.apiUrl}/users/${userId}/requests` : `${vars.apiUrl}/broadcast-requests`;

    setState({...state, errors: {}});

    const validationErrors = validate({
      email: email.replace(" ", "")
    }, signup);

    if (validationErrors.email) {
      setState({...state, errors: validationErrors});
    }
    else{
      if(isAuth) {
        auth.check().then(() => {
          auth.getAuthToken().then(token => {
            props.dispatch(fetchStart());
            fetch(fetchUrl,
                {
                  headers: {
                    'Authorization':`Bearer ${token.accessToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                  method: "POST",
                  body: JSON.stringify({
                    email,
                    event,
                    location,
                    maxDistance,
                    numOfPeople,
                    userPosition,
                    note: notes
                  })
                })
                .then(function(res){
                  if(res.status === 204){
                    props.dispatch(fetchEnd());
                    //mostra notifica
                    props.dispatch(showNotification(
                        t("browse.noBroadcasts.notification.success.message"),
                        "success",
                        {
                          title: t("browse.noBroadcasts.notification.success.title"),
                        }
                    ));
                    props.navigation.navigate('BroadcastsList');
                  }
                  else{
                    //mostra notifica
                    props.dispatch(showNotification(
                        t("browse.noBroadcasts.notification.failure.message"),
                        "warning",
                        {
                          title: t("browse.noBroadcasts.notification.success.title"),
                        }
                    ));

                    props.dispatch(fetchEnd());
                    console.log(res);
                  }
                })
                .catch(function(res){
                  props.dispatch(showNotification(
                      t("common.notificationFailure.message"),
                      "error",
                      {
                        title: t("common.notificationFailure.title")
                      }
                  ));
                  props.dispatch(fetchEnd());
                  console.log(res);
                })
          })
        }).catch(function(e){
          props.navigation.navigate("Auth", {}, true);
          props.dispatch(fetchEnd());
          console.log(e);
        })
      }
      else {
        fetch(fetchUrl,
            {
              headers: {
                //'Authorization':`Bearer ${token.accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              method: "POST",
              body: JSON.stringify({
                email,
                event,
                location,
                maxDistance,
                numOfPeople,
                userPosition,
                note: notes
              })
            })
            .then(function(res){
              if(res.status === 204){
                props.dispatch(fetchEnd());
                //mostra notifica
                props.dispatch(showNotification(
                    t("browse.noBroadcasts.notification.success.message"),
                    "success",
                    {
                      title: t("browse.noBroadcasts.notification.success.title"),
                    }
                ));
                props.navigation.navigate('BroadcastsList');
              }
              else{
                //mostra notifica
                props.dispatch(showNotification(
                    t("browse.noBroadcasts.notification.failure.message"),
                    "warning",
                    {
                      title: t("browse.noBroadcasts.notification.success.title"),
                    }
                ));

                props.dispatch(fetchEnd());
                console.log(res);
              }
            })
            .catch(function(res){
              props.dispatch(showNotification(
                  t("common.notificationFailure.message"),
                  "error",
                  {
                    title: t("common.notificationFailure.title")
                  }
              ));
              props.dispatch(fetchEnd());
              console.log(res);
            })
      }
    }

  };

  const {event} = props.navigation.state.params;
  const distances = [5, 10, 50, 100];
  const { t } = props;
  let date = moment(event.start_at).calendar();


  return(
      <View>
        <KeyboardAwareScrollView
            contentContainerStyle={styles.container}
            bounces={false}
        >
          <View style={styles.header}>
            <Text style={styles.eventName} numberOfLines={1} adjustsFontSizeToFit={true}>{event.name.toUpperCase()}</Text>
            <Text style={styles.eventDate}>{date}</Text>
          </View>


          <View style={styles.content}>
            <SlidingView visible={index === 0}>
              <Text style={styles.title}>{t("browse.noBroadcasts.weOrganizeForYou", { eventName: event.name})}</Text>

              <Text style={styles.label}>{t("browse.noBroadcasts.howMuchTravel")}</Text>
              <View style={styles.distancesContainer}>
                {distances.map(dist => (
                    <Touchable

                        style={[styles.distanceButton,
                          dist === state.maxDistance ? styles.distanceButtonSelected : {}
                        ]}
                        onPress={() => { setState({...state,maxDistance: dist}) }}
                    >
                      <Text
                          allowFontScaling
                          style={[
                            styles.distanceButtonTitle,
                            dist === state.maxDistance ? styles.distanceButtonSelectedTitle : {}
                          ]}>
                        {dist + ' km'.toUpperCase()}
                      </Text></Touchable>
                ))}
              </View>
              <Text style={styles.label}>{t("browse.noBroadcasts.howManyPeople")}</Text>

              <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <Slider
                    value={state.numOfPeople}
                    minimumValue={1}
                    maximumValue={20}
                    step={1}
                    style={{justifyContent: 'center', flexGrow: 2 }}
                    thumbStyle={{borderWidth: 2, borderColor: colors.accent.default}}
                    thumbTintColor={colors.white.light}
                    onValueChange={(numOfPeople) => setState({...state,numOfPeople})} />

                <Text style={styles.peopleText}>{state.numOfPeople}</Text>

              </View>


              <Button
                  variant="primary"
                  onPress={() => setIndex(index === 0 ? 1 : 0)}>press</Button>

            </SlidingView>
            <SlidingView visible={index === 1}>
                <View style={{justifyContent: 'center'}}>
                  <Text>
                    Inserisci la tua mail o il
                    numero di cellulare
                  </Text>
                </View>
            </SlidingView>
          </View>

        </KeyboardAwareScrollView>
      </View>
  );
}


const mapStateToProps = (state) => {

  const { latitude, longitude } = coordsSelector(state);

  const isLoading = state.loading > 0;
  const userId = state.auth.profile._id;
  const profile = state.auth.profile;
  const email = state.auth.profile.email ? state.auth.profile.email : "";

  return {
    latitude, longitude, userId, isLoading, profile, email
  }
};



export default connect(mapStateToProps)(withNamespaces()(ContactUsScreen));