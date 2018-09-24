import React from 'react';
import { userLogout } from '../../actions/login';
import {View, Text, Button} from 'react-native';
import UserInfoCard from './UserInfoCard';

const user = {
  name: "Armando Catalano",
  email: "armocata@libero.it",
  image: "https://media.licdn.com/dms/image/C4E03AQFX_8NZvj7RVw/profile-displayphoto-shrink_800_800/0?e=1543449600&v=beta&t=GCd4X8KnsajmTIzz2Ue_6F_-AFgX2JaDuu8kZir_uZk"
}

export default class Profile extends React.Component {

  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.props.navigation.dispatch(userLogout());
  }
  render() {
    return (
      <View>
        <Button title="Logout" onPress={this.handleLogout}/>
        <UserInfoCard user={user}/>
      </View>

    )
  }
}

