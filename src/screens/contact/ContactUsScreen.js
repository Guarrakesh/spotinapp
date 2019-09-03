import moment from "moment";
import React, {useEffect, useState} from "react";
import {withNamespaces} from 'react-i18next';
import {Animated, Dimensions, Platform, Text, TextInput, TouchableOpacity} from "react-native";
import {Slider} from "react-native-elements";
import {scale} from "react-native-size-matters";
import {connect} from "react-redux";
import validate from "validate.js";
import {fetchEnd, fetchStart} from "../../actions/fetchActions";
import {showNotification} from "../../actions/notificationActions";
import auth from '../../api/auth';

import {Button, Touchable, View} from "../../components/common";
import usePrevious from "../../helpers/hooks/usePrevious";
import {coordsSelector} from "../../reducers/location";
import themes from "../../styleTheme";
import signup from "../../validations/signup";
import vars from '../../vars';
import styles from './contactScreenStyles';

const deviceWidth = themes.base.deviceDimensions.width;

const colors = themes.base.colors;
const businessTypes = [
  'Pub', 'Pizzeria', 'Ristorante',
  'Trattoria', 'Bar', 'Altro',
];
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
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.eventName} numberOfLines={1} adjustsFontSizeToFit={true}>{event.name.toUpperCase()}</Text>
          <Text style={styles.eventDate}>{date}</Text>
        </View>


        <View style={styles.content}>
          <SlidingView visible={index === 0} style={{ position: 'absolute'}}>
            <Text style={styles.title}>{t("browse.noBroadcasts.weOrganizeForYou", { eventName: event.name})}</Text>

            <Text style={styles.label}>{t("browse.noBroadcasts.howMuchTravel")}</Text>
            <View style={styles.distancesContainer}>
              {distances.map(dist => (
                  <Touchable

                      style={[styles.selectableButton,  styles.distanceButton ,
                        { flexBasis: deviceWidth / 4 - scale(24) },
                        dist === state.maxDistance ? styles.selectableButtonSelected : {}
                      ]}
                      onPress={() => { setState({...state,maxDistance: dist}) }}
                  >
                    <Text
                        allowFontScaling
                        style={[
                          styles.selectableButtonTitle,
                          dist === state.maxDistance ? styles.selectableButtonSelectedTitle : {}
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
            <Text style={styles.label}>{t("browse.noBroadcasts.whichBusinessType")}</Text>
            <View style={styles.businessTypeContainer}>
              {businessTypes.map(type => (
                  <Touchable

                      style={[styles.selectableButton, styles.businessTypeButton,
                        type === state.maxDistance ? styles.selectableButtonSelected : {}
                      ]}
                      onPress={() => { setState({...state,maxDistance: type}) }}
                  >
                    <Text
                        allowFontScaling
                        style={[
                          styles.selectableButtonTitle,
                          type === state.maxDistance ? styles.selectableButtonSelectedTitle : {}
                        ]}>
                      {type.toUpperCase()}
                    </Text></Touchable>
              ))}
            </View>
            <Button

                uppercase
                round
                containerStyle={styles.continueButton}
                variant="primary"
                onPress={() => setIndex(1)}>{t("browse.noBroadcasts.continue")}</Button>

          </SlidingView>
          <SlidingView visible={index === 1} style={{ position: 'absolute'}}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.label}>
                Inserisci la tua mail o il
                numero di cellulare
              </Text>
              <View style={styles.inputOuterContainer}>
              <TextInput
                 // onSubmitEditing={() => passwordRef.current.focus()}
                 onChangeText={email =>  setState({...state, email: email.trim()})}

                  allowFontScaling
                  autoCapitalize='none'
                  value={state.email}
                  textContentType='emailAddress'
                  keyboardType='email-address'
                  style={[
                    styles.input,
                  ]}
                  placeholder={t("common.email")}
                  placeholderTextColor={themes.base.inputPlaceholderColor}

              />
            </View>
              <Text>{t("Qualora troveremo un locale adatto a te ti ricontatteremo con maggiori dettagli")}</Text>
            </View>
            <Button
                block
                uppercase
                round
                containerStyle={styles.sendButton}
                variant="primary"
                onPress={() => setIndex(2)}>{t("common.send")}</Button>
          </SlidingView>
          { Platform.OS === "ios" &&
          <TouchableOpacity style={styles.iosCloseBtn} onPress={() =>props.navigation.navigate('BroadcastsList')}>
            <Text style={{textDecorationLine: 'underline', fontSize: 13}}>{t("common.close").toUpperCase()}</Text>
          </TouchableOpacity>
            }
        </View>

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