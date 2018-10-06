import React from 'react';
import View from '../../components/common/View';
import {ScrollView, Text, Button, StyleSheet, ActivityIndicator} from 'react-native';
import ProfileController from '../../controllers/ProfileController';
import InlineListController from '../../controllers/InlineListController';


import ListController from '../../controllers/ListController'
import { userLogout } from '../../actions/login';
import UserInfoCard from '../../components/ProfileComponents/UserInfoCard';
import ReservationsCarousel from '../../components/ProfileComponents/ReservationsCarousel';
import SavedEventsCard from '../../components/ProfileComponents/SavedEventsCard';
import { connect } from 'react-redux';
import {Fonts} from "../../components/common/Fonts";
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
  }

  handleLogout() {
    this.props.dispatch(userLogout());
  }

  render() {

    return (
      <ProfileController>
        {({profile, loggedIn, isLoading}) =>
        1==0 ?
          <ActivityIndicator size="large" color={themes.base.colors.accent.default}/> :
          <ScrollView style={{flex: 1, backgroundColor: themes.base.colors.white.default}}>
            {loggedIn ?
              (!profile._id ?
                <Text style={{alignSelf: 'center', fontSize: 20, marginTop: 16}}>
                  ⊗ Impossibile caricare il profilo ⊗
                </Text> :
                <View style={{padding: 8}}>
                  <UserInfoCard user={profile} onLogoutPress={() => this.handleLogout()}/>
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
                </View> ):
              <Button title="Accedi" onPress={() => {
              this.props.navigation.navigate('SignIn')
            }}/>
            }
          </ScrollView>
        }
      </ProfileController>
    )
  }
}


export default ProfileScreen;
