import React from "react";
import { StyleSheet, Image} from "react-native";
import i18n from "../../i18n/i18n";
import IonicIcon from "react-native-vector-icons/Ionicons"
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { View, Button, Typography } from "../common"
import themes from "../../styleTheme";
import Images from '../../assets/images'

const NotLoggedView = (props) => {

  const {onLoginPress} = props;

  return (
    <View elevation={2} style={styles.container}>
      <View style={{flexDirection: "row", marginBottom: 16}}>
       <Image source={Images.icons.mascotte.waterpolo} resizeMode="contain" style={{height: 128}}/>
      </View>
      <Typography variant={"heading"}>{i18n.t("auth.notLogged.title")}</Typography>
      <Typography variant={"body"}>{i18n.t("auth.login.subtitle")}</Typography>
      <Button
        uppercase
        containerStyle={styles.loginButton}
        onPress={onLoginPress}
        round
        variant={"primary"}
      >{i18n.t("auth.login.signIn")}</Button>
    </View>

  )
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: "center",
    backgroundColor: themes.base.colors.white.light,
    borderRadius: themes.base.borderRadius,
    margin: 8,
    padding: 16
  },
  loginButton: {
    marginTop: 16
  }
});

export default NotLoggedView;