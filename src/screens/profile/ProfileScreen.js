import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import ProfileController from '../../controllers/ProfileController';
import InlineListController from '../../controllers/InlineListController';


import ListController from '../../controllers/ListController'
import { userLogout } from '../../actions/login';
import UserInfoCard from '../../components/ProfileComponents/UserInfoCard';
import ReservationsCarousel from '../../components/ProfileComponents/ReservationsCarousel';
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
              <View>
                {loggedIn && profile._id
                    ?
                    <View style={{padding: 8}}>
                      <UserInfoCard user={profile} onLogoutPress={() => this.handleLogout()}/>
                      <InlineListController resource="reservations">
                        {controllerProps =>
                            controllerProps.isLoading ? null :
                                <ReservationsCarousel {...controllerProps}/>
                        }


                      </InlineListController>
                    </View>
                    : <Button title="Accedi" onPress={() => {
                  this.props.navigation.navigate('SignIn')
                }}/>
                }
              </View>
          }

        </ProfileController>
    )
  }
}


export default ProfileScreen;
