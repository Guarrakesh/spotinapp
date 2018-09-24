import React from 'react';
import { userLogout } from '../../actions/login';
import {View, Text, Button} from 'react-native';
import UserInfoCard from '../../components/ProfileComponents/UserInfoCard';
import { connect } from 'react-redux';

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
    const { loggedIn } = this.props.auth;

    return (
      <View>
        {loggedIn
          ?
          <View style={{padding: 8}}>
            <UserInfoCard user={user}/>
          </View>
          :  <Button title="Accedi" onPress={() => {this.props.navigation.navigate('SignIn')}}/>
        }


      </View>

    )
  }
}

const mapStateToProps = state => {
  return ({
    auth: state.auth
  });
}

export default connect(mapStateToProps)(ProfileScreen);

