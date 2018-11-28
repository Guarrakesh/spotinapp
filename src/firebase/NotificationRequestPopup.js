import React from "react";
import PropTypes from "prop-types";
import { Platform, StyleSheet, Modal } from "react-native";
import { withNamespaces } from "react-i18next";
import Icon from "react-native-vector-icons/Ionicons";
import * as Animatable from "react-native-animatable";
import { View, Typography, Button } from "../components/common";
import themes from "../styleTheme";

const AnimatedView = Animatable.createAnimatableComponent(View);
const colors = themes.base.colors;
const iconName = Platform.select({ios: "ios-notifications-outline", android: "md-notifications-outline"});
const NotificationRequestPopup = ({
    t,
    title,
    message,
    visible
}) => {

  return (
      visible ?
          <AnimatedView useNativeDriver animation="fadeIn" duration={300} style={styles.overlay}>
            <AnimatedView useNativeDriver animation="bounceInUp" delay={100} style={styles.container}>
              <Icon name={iconName} color={colors.accent.default} size={72}/>
              <Typography align="center" gutterBottom variant="title">
                {title || t("notifications.popup.title")}
              </Typography>
              <Typography align="center" variant="body">
                {message || t("notifications.popup.getUpdated")}
              </Typography>
              <View style={{marginTop: 32, flexDirection: "row"}}>
                <Button clear round>{t("notifications.popup.decline")}</Button>
                <Button round variant="primary">{t("notifications.popup.accept")}</Button>
              </View>
            </AnimatedView>
          </AnimatedView>
          : null
  )
};

NotificationRequestPopup.propTypes = {
  t: PropTypes.object
};
const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: null,
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.76)"
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "85%",
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingTop: 28,
    paddingLeft: 52,
    paddingRight: 52,
    paddingBottom: 48,
  }
});
export default withNamespaces()(NotificationRequestPopup);