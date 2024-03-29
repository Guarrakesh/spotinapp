import moment from "moment";
import React, {useEffect, useState} from "react";
import {withNamespaces} from 'react-i18next';
import {Animated, Dimensions, Platform, SafeAreaView, StatusBar, Text, TextInput, TouchableOpacity} from "react-native";
import {Slider} from "react-native-elements";
import {scale} from "react-native-size-matters";
import {connect} from "react-redux";
import validate from "validate.js";
import {fetchEnd, fetchStart} from "../../actions/fetchActions";
import {showNotification} from "../../actions/notificationActions";
import auth from '../../api/auth';

import {Button, Touchable, View} from "../../components/common";
import FormErrorBox from "../../components/common/FormError/FormErrorBox";
import Mascotte from "../../components/common/Mascotte";
import usePrevious from "../../helpers/hooks/usePrevious";
import {coordsSelector} from "../../reducers/location";
import themes from "../../styleTheme";
import contactUsValidation  from "../../validations/contactUs";
import vars from '../../vars';
import styles from './contactScreenStyles';

const deviceWidth = themes.base.deviceDimensions.width;
const deviceHeight = themes.base.deviceDimensions.height;
const colors = themes.base.colors;
const _businessTypes = [
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
};
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
        maxDistance: undefined,
        numOfPeople: 1,
        businessTypes: [],
        errors: [],
        fieldsWithError: [],
      }

  );
  const [index, setIndex] = useState(0);
  const [animatedDone] = useState(new Animated.Value(0));

  const showDone = () => {
    Animated.spring(animatedDone, {
      toValue: 1,
      tension: 100,
      friction: 30,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {

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

  const handleBusinessTypePress = (type) => {
    if (state.businessTypes.includes(type)) {
      setState({...state, businessTypes: state.businessTypes.filter(t => t !== type)})
    } else {
      setState({...state, businessTypes: [...state.businessTypes, type]})
    }
  };
  const submitFirstForm = () => {
    const { maxDistance, businessTypes } = state;
    const validationErrors = validate({
      maxDistance, businessTypes
    }, contactUsValidation);
    if (validationErrors) {
      setState({...state, errors: Object.keys(validationErrors).map(k => validationErrors[k][0])});
    } else {
      setIndex(1);
    }

  };


  const showFailure = (response) => {
    if (response) {
      props.dispatch(showNotification(
          t("browse.noBroadcasts.notification.failure.message"),
          "warning",
          {
            title: t("browse.noBroadcasts.notification.failure.title"),
          }
      ));
    } else {
      props.dispatch(showNotification(
          t("common.notificationFailure.message"),
          "error",
          {
            title: t("common.notificationFailure.title")
          }
      ));
    }

  };

  const isPhoneNumber = value => /^(([+]|00)39)?((3[1-6][0-9]))(\d{6,7})$/g.test(value);
  const _sendRequest = async () =>  {

    const { t } = props;
    const isAuth = props.userId;
    const { email, userPosition, businessTypes, maxDistance, userId, numOfPeople, event } = state;

    // Validation
    setState({...state, errors: []});
    if (!isPhoneNumber(email) && !/^\S+@\S+\.\S+$/.test(email)) {
      return setState({
        ...state,
        errors: [t('browse.noBroadcasts.formErrors.emailOrPhoneNotValid')],
        fieldsWithError: [...state.fieldsWithError, 'email']
      });
    }

    const fetchUrl = isAuth ? `${vars.apiUrl}/users/${userId}/requests` : `${vars.apiUrl}/broadcast-requests`;
    const fetchOptions = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        event,
        maxDistance,
        numOfPeople,
        userPosition,
        businessTypes,
        ...(isPhoneNumber(email) ? { phone: email } : { email }),
      })
    };
    try {
      props.dispatch(fetchStart());
      if (isAuth) {
        await auth.check();
        const token = await auth.getAuthToken();
        fetchOptions.headers.Authorization = `Bearer ${token.accessToken}`;
      }
      try {
        const response = await fetch(fetchUrl, fetchOptions);
        if (response.status === 204) {
          showDone();
        } else {
          console.error(response)
          showFailure(response);
        }
      } catch (e) {
        console.error(e);
        showFailure();
      }
    } catch (e) {
      props.navigation.navigate("Auth", {}, true);
    } finally {
      props.dispatch(fetchEnd());
    }

  };

  const { event } = props.navigation.state.params;
  const distances = [5, 10, 50, 100];
  const { t } = props;
  let date = moment(event.start_at).calendar();


  return(
      <React.Fragment>
        <FormErrorBox errors={state.errors}
                      show={state.errors.length > 0}
                      onSwipeAway={() => setState({...state, errors: []})}/>

        <StatusBar barStyle="light-content"/>
        <SafeAreaView style={{ backgroundColor: colors.accent.default}}/>
        <View style={styles.container}>

          <View style={styles.header}>
            <Text style={styles.eventName} numberOfLines={1} adjustsFontSizeToFit={true}>{event.name.toUpperCase()}</Text>
            <Text style={styles.eventDate}>{date}</Text>
          </View>


          <Animated.View style={[
            styles.content,
            { transform: [{ translateY: animatedDone.interpolate({ inputRange: [0, 1], outputRange: [0, deviceHeight] }) }] }
          ]}>
            <SlidingView visible={index === 0} style={{ zIndex: 10, position: 'absolute'}}>
              <Text style={styles.title}>{t("browse.noBroadcasts.weOrganizeForYou", { eventName: event.name})}</Text>

              <Text style={styles.label}>{t("browse.noBroadcasts.howMuchTravel")}</Text>
              <View style={styles.distancesContainer}>
                {distances.map(dist => (
                    <Touchable

                        style={[styles.selectableButton,  styles.distanceButton ,
                          { flexBasis: deviceWidth / 4 - scale(24) },
                          dist === state.maxDistance ? styles.selectableButtonSelected : {}
                        ]}
                        onPress={() => setState({...state,maxDistance: dist}) }
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
                {_businessTypes.map(type => (
                    <Touchable

                        style={[styles.selectableButton, styles.businessTypeButton,
                          state.businessTypes.includes(type) ? styles.selectableButtonSelected : {}
                        ]}
                        onPress={() => handleBusinessTypePress(type)}
                    >
                      <Text
                          allowFontScaling
                          style={[
                            styles.selectableButtonTitle,
                            state.businessTypes.includes(type) ? styles.selectableButtonSelectedTitle : {}
                          ]}>
                        {type.toUpperCase()}
                      </Text></Touchable>
                ))}
              </View>
              <Button

                  uppercase
                  round
                  disabled={state.businessTypes.length === 0 || !state.maxDistance}
                  containerStyle={styles.continueButton}
                  variant="primary"
                  onPress={submitFirstForm}>{t("browse.noBroadcasts.continue")}</Button>

            </SlidingView>
            <SlidingView visible={index === 1} style={{ zIndex: 11, position: 'absolute'}}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.label}>
                  {t("browse.noBroadcasts.insertEmailPhone")}
                </Text>
                <View style={[
                    styles.inputOuterContainer,
                  state.fieldsWithError.includes('email') ? {
                    borderColor: themes.base.colors.danger.light,
                    borderWidth: 1,
                    } : {}
                ]}>
                  <TextInput
                      // onSubmitEditing={() => passwordRef.current.focus()}
                      onChangeText={email => setState({...state, email: email.trim()})}

                      allowFontScaling
                      autoCapitalize='none'
                      value={state.email}
                      textContentType='emailAddress'
                      keyboardType='email-address'
                      style={[
                        styles.input,
                      ]}
                      placeholder={`${t("common.email")}/${t("common.phone")}`}
                      placeholderTextColor={themes.base.inputPlaceholderColor}

                  />
                </View>
                <Text>{t("browse.noBroadcasts.insertEmailHelperText")}</Text>
              </View>
              <Button
                  block
                  uppercase
                  round
                  disabled={!state.email}
                  containerStyle={styles.sendButton}
                  variant="primary"
                  onPress={_sendRequest}>{t("common.send")}</Button>
            </SlidingView>
            { Platform.OS === "ios" &&
            <TouchableOpacity style={styles.iosCloseBtn} onPress={() =>props.navigation.navigate('BroadcastsList')}>
              <Text style={{textDecorationLine: 'underline', fontSize: 13}}>{t("common.close").toUpperCase()}</Text>
            </TouchableOpacity>
            }
          </Animated.View>
          <Animated.View

              style={[
                styles.doneContainer,
                { opacity: animatedDone, transform: [
                    { scale: animatedDone.interpolate({ inputRange: [0,1], outputRange: [0, 1] }) }] },
                { translateY: animatedDone.interpolate({ inputRange: [0,1], outputRange: [deviceWidth, 0]})}
              ]
              }>
            <Mascotte sport={event.sport.slug} width={deviceHeight * 0.2} height={deviceHeight * 0.2}/>
            <Text style={styles.doneTitle}>{t("common.done")}</Text>
            <Text style={styles.doneText}>
              {isPhoneNumber(state.email) ? t("browse.noBroadcasts.doneTextWithEmail", { email: state.email }) : t("browse.noBroadcasts.doneTextWithPhone", { phone: state.email })}
            </Text>
            <Button
                onPress={() => props.navigation.navigate('Main')}
                round block containerStyle={{marginTop: deviceHeight * 0.1}}>{t("common.close")}</Button>
          </Animated.View>
        </View>
      </React.Fragment>
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
