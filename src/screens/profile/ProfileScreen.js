import React from 'react';
import ProfileController from '../../controllers/ProfileController';
import InlineListController from '../../controllers/InlineListController';
import View from '../../components/common/View';
import {ScrollView, Text, Button, StyleSheet, ActivityIndicator} from 'react-native';

import { userLogout, userCheck } from '../../actions/authActions';
import UserInfoCard from '../../components/ProfileComponents/UserInfoCard';
import ReservationsCarousel from '../../components/ProfileComponents/ReservationsCarousel';
import SavedEventsCard from '../../components/ProfileComponents/SavedEventsCard';
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
  }


  checkAuthentication() {

    const { userCheck } = this.props;
    userCheck({}, "Profile");
  }
  handleLogout() {
    this.props.userLogout();
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
                                <InlineListController id="profile_reservations_list" resource="reservations">
                                  {controllerProps =>
                                      controllerProps.isLoading ? null :
                                          <ReservationsCarousel {...controllerProps}/>
                                  }
                                </InlineListController>
                                <Text style={themes.base.inlineListTitleStyle}>Eventi preferiti</Text>
                                <InlineListController id="profile_savedEvents_list" resource="events">
                                  {controllerProps =>
                                      controllerProps.isLoading ? null :
                                          <SavedEventsCard {...controllerProps}/>
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
    auth: state.auth,
  });
};
export default connect(mapStateToProps, { userCheck, userLogout })(ProfileScreen);