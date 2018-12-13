import React from 'react';
import PushNotification from 'react-native-push-notification';
import ProfileController from '../../controllers/ProfileController';
import InlineListController from '../../controllers/InlineListController';
import View from '../../components/common/View';
import {ScrollView, Text, StyleSheet, ActivityIndicator, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { userLogout, userCheck } from '../../actions/authActions';
import { crudDelete } from '../../actions/dataActions';
import {Touchable} from '../../components/common';

import UserInfoCard from '../../components/ProfileComponents/UserInfoCard';
import ReservationsCarousel from '../../components/ProfileComponents/ReservationsCarousel';
import SavedEventsList from '../../components/ProfileComponents/SavedEventsList';
import { connect } from 'react-redux';
import themes from "../../styleTheme";
import i18n from "../../i18n/i18n";

class ProfileScreen extends React.Component {

  constructor() {

    super();
    this.handleLogout = this.handleLogout.bind(this);
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.handleBrowse = this.handleBrowse.bind(this);
    this.handleFavoriteEventRemove = this.handleFavoriteEventRemove.bind(this);
    this.handleFavoriteEventPress = this.handleFavoriteEventPress.bind(this);
    this.handleReservationPress = this.handleReservationPress.bind(this);
    this.handleEditProfile = this.handleEditProfile.bind(this);
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
          <Touchable

              style={{backgroundColor: 'transparent', marginRight: 16, borderRadius: 50}}
              onPress={() => navigation.navigate('SettingsScreen')}
          >
            <Icon
                name='settings'
                size={24}
                color={themes.base.colors.text.default}

            />
          </Touchable>
      )
    }
  }

  checkAuthentication() {

    const { userCheck } = this.props;
    userCheck({}, "Profile");
  }
  handleLogout() {
    this.props.userLogout();
  }
  handleBrowse() {
    this.props.navigation.navigate('Browse');
  }

  handleFavoriteEventRemove(eventId) {
    this.props.crudDelete('events', eventId, {},
        `/users/${this.props.userId}`, 'profile_savedEvents_list');

  }

  handleFavoriteEventPress(eventId, event) {

    this.props.navigation.navigate('BroadcastsList', {eventId, event});

  }

  handleReservationPress(reservation){
    this.props.navigation.navigate('ReservationScreen', {reservation});
  }

  handleEditProfile(){
    this.props.navigation.navigate('EditProfileScreen');
  }


  render() {

    return (


        <ProfileController>
          {({profile, loggedIn, isLoading}) =>
              isLoading ?
                  <ActivityIndicator size="large" color={themes.base.colors.accent.default}/> :
                  <ScrollView style={{flex: 1, backgroundColor: themes.base.colors.white.default}}>
                    {loggedIn && profile._id ?

                        <View>
                          <UserInfoCard user={profile} onLogoutPress={this.handleLogout} onEditProfilePress={this.handleEditProfile}/>
                          <InlineListController basePath={`/users/${profile._id}`}
                                                id="profile_reservations_list" resource="reservations">
                            {controllerProps =>
                                controllerProps.isLoading ? null :
                                    <ReservationsCarousel
                                        {...controllerProps}
                                        onItemPress={this.handleReservationPress}
                                        onBrowsePress={this.handleBrowse}
                                    />
                            }
                          </InlineListController>
                          <InlineListController
                              basePath={`/users/${profile._id}`}
                              id="profile_savedEvents_list"
                              resource="events">
                            {controllerProps =>

                                <SavedEventsList
                                    onItemPress={this.handleFavoriteEventPress}
                                    onItemRemovePress={this.handleFavoriteEventRemove}
                                    {...controllerProps}/>

                            }
                          </InlineListController>
                        </View> :
                        <Text style={{alignSelf: 'center', fontSize: 20, marginTop: 16}}>
                          ⊗ Impossibile caricare il profilo ⊗
                        </Text>
                    }
                  </ScrollView>
          }
        </ProfileController>

    )
  }
}


const mapStateToProps = (state) => {
  return ({
    userId: state.auth.profile ? state.auth.profile._id : undefined
  });
};
export default connect(mapStateToProps, { userCheck, userLogout, crudDelete})(ProfileScreen);