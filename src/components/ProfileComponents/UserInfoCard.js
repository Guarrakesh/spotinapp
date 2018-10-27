import React from 'react';
import View from '../common/View';
import { Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Fonts} from "../common/Fonts";
import themes from "../../styleTheme";

const UserInfoCard = (props) =>{

  const {user, onLogoutPress} = props;

  return (

    <View style={styles.container} elevation={1}>
      <View style={styles.imageView}>
        <Image source={{uri: user.picture ? user.picture : `https://ui-avatars.com/api/?name=${user.name}`}} style={styles.userImage}/>
      </View>
      <View style={styles.infoView}>
        <Text style={styles.userName} numberOfLines={1} adjustsFontSizeToFit={true}>{user.name}</Text>
        <Text style={styles.userEmail} numberOfLines={1} adjustsFontSizeToFit={true}>{user.email}</Text>
      </View>
      <TouchableOpacity onPress={onLogoutPress}>
        <Icon name={"logout"} size={30} color={themes.base.colors.accent.default}/>
      </TouchableOpacity>
    </View>
  );


}

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    backgroundColor: themes.base.colors.white.light,
  },
  imageView: {

  },
  userImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: themes.base.colors.accent.default
  },
  infoView: {
    flex: 1,
    marginLeft: 16
  },
  userName: {
    fontFamily: Fonts.LatoBold,
    fontSize: 18,
    color: themes.base.colors.text.default
  },
  userEmail:{
    fontFamily: Fonts.LatoLight,
    fontSize: 16
  }
});

export default UserInfoCard;