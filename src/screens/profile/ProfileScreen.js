import React from 'react';
import ProfileController from '../../controllers/ProfileController';
import InlineListController from '../../controllers/InlineListController';
import View from '../../components/common/View';
import {ActivityIndicator, Platform, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {userCheck, userLogout} from '../../actions/authActions';
import {deleteFavoriteEvent} from '../../actions/events';
import {Touchable} from '../../components/common';
import NotLoggedView from "../../components/BusinessProfileComponents/NotLoggedView";
import UserInfoCard from '../../components/ProfileComponents/UserInfoCard';
import ReservationsCarousel from '../../components/ProfileComponents/ReservationsCarousel';
import PendingReviewsList from "../../components/ProfileComponents/reviews/PendingReviewsList";
import SavedEventsList from '../../components/ProfileComponents/SavedEventsList';
import {connect} from 'react-redux';
import themes from "../../styleTheme";

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
    this.handleLoginPress = this.handleLoginPress.bind(this);
    this.handleReviewPress = this.handleReviewPress.bind(this);

  }

  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <Touchable

          style={{backgroundColor: 'transparent', marginRight: Platform.OS === "android" ? null : 16, borderRadius: 50}}
          onPress={() => navigation.navigate('SettingsScreen')}
        >
          <Icon
            name='settings'
            size={24}
            color={themes.base.colors.text.default}
            style={{margin: Platform.OS === "android" ? 16 : null,}}

          />
        </Touchable>
      )
    }
  };

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
    this.props.deleteFavoriteEvent(this.props.userId, eventId);
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

  handleLoginPress(){
    this.props.navigation.navigate("Auth")
  }

  handleReviewPress(reservation) {
    this.props.navigation.navigate("ReviewsNavigator", {reservation});
  }

  render() {

    return (


      <ProfileController>
        {({profile, loggedIn, isLoading}) =>
          isLoading ?
            <ActivityIndicator size="large" color={themes.base.colors.activityIndicator.default}/> :
            <ScrollView style={{flex: 1, backgroundColor: themes.base.colors.white.default}}>
              {loggedIn && profile._id ?

                <View>
                  <UserInfoCard user={profile} onLogoutPress={this.handleLogout} onEditProfilePress={this.handleEditProfile}/>
                  <InlineListController
                    basePath={`/users/${profile._id}`}
                    id="profile_reservations_list"
                    resource="reservations"
                  >
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
                    id="profile_reviews_list"
                    resource="reservations"
                    awareData
                  >
                    {controllerProps =>
                      controllerProps.isLoading ? null :
                        <PendingReviewsList
                          {...controllerProps}
                          onItemPress={this.handleReviewPress}
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
                <NotLoggedView onLoginPress={this.handleLoginPress}/>
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
export default connect(mapStateToProps, { userCheck, userLogout, deleteFavoriteEvent })(ProfileScreen);
