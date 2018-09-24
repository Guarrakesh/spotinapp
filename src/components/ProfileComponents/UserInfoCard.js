import React from 'react';
import View from '../common/View';
import { Text, Image, StyleSheet} from 'react-native';
import {Fonts} from "../common/Fonts";
import themes from "../../styleTheme";

const UserInfoCard = (props) =>{

  const {user} = props;

  return (

    <View style={styles.container} elevation={1}>
      <View style={styles.imageView}>
        <Image source={{uri: user.image}} style={styles.userImage}/>
      </View>
      <View style={styles.infoView}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
      </View>
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    backgroundColor: themes.base.colors.white.light,
  },
  imageView: {

  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 35
  },
  infoView: {
    flex: 1,
    marginLeft: 16
  },
  userName: {
    fontFamily: Fonts.LatoBold,
    fontSize: 18
  },
  userEmail:{
    fontFamily: Fonts.LatoMedium,
    fontSize: 16
  }
});

export default UserInfoCard;