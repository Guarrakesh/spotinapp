import React from 'react';
import ProfileController from '../../controllers/ProfileController';
import InlineListController from '../../controllers/InlineListController';
import View from '../../components/common/View';
import {ScrollView, Text, Button, StyleSheet, ActivityIndicator} from 'react-native';

import { userLogout, userCheck } from '../../actions/authActions';
import { crudDelete } from '../../actions/dataActions';

import UserInfoCard from '../../components/ProfileComponents/UserInfoCard';
import ReservationsCarousel from '../../components/ProfileComponents/ReservationsCarousel';
import SavedEventsList from '../../components/ProfileComponents/SavedEventsList';
import { connect } from 'react-redux';
import themes from "../../styleTheme";

const user = {
  name: "Armando Catalano",
  email: "armocata@libero.it",
  image: "https://media.licdn.com/dms/image/C4E03AQFX_8NZvj7RVw/profile-displayphoto-shrink_800_800/0?e=1543449600&v=beta&t=GCd4X8KnsajmTIzz2Ue_6F_-AFgX2JaDuu8kZir_uZk"
}

class ProfileScreen extends React.Component {

  constructor() {

    super();
    this.handleLogout = this.handleLogout.bind(this);
    this.checkAuthentication = this.checkAuthentication.bind(this);
    this.handleBrowse = this.handleBrowse.bind(this);
    this.handleFavoriteEventRemove = this.handleFavoriteEventRemove.bind(this);
    this.handleFavoriteEventPress = this.handleFavoriteEventPress.bind(this);
    this.handleReservationPress = this.handleReservationPress.bind(this);
  }


  checkAuthentication() {

    const { userCheck } = this.props;
    userCheck({}, "Profile");
  }
  handleLogout() {
    this.props.userLogout();
  }
  handleBrowse() {
    this.props.navigation.navigate('Esplora');
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


  render() {

    return (


          <ProfileController>
            {({profile, loggedIn, isLoading}) =>
                isLoading ?
                    <ActivityIndicator size="large" color={themes.base.colors.accent.default}/> :
                    <ScrollView style={{flex: 1, backgroundColor: themes.base.colors.white.default}}>
                      {loggedIn && profile._id ?

                              <View style={{padding: 8}}>
                                <UserInfoCard user={profile} onLogoutPress={this.handleLogout}/>
                                <InlineListController basePath={`/users/${profile._id}`}
                                id="profile_reservations_list" resource="reservations">
                                  {controllerProps =>
                                      controllerProps.isLoading ? null :
                                          <ReservationsCarousel
                                              {...controllerProps}
                                              onBrowsePress={this.handleBrowse}
                                              ids={[]}/>
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