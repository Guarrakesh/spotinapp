import React from 'react';
import {Typography, View} from '../common';
import {StyleSheet} from 'react-native';
import i18n from "../../i18n/i18n";
import themes from "../../styleTheme";

const BusinessIsOpenView = (props) => {

  const { business, isOpen } = props;

  return (
    <View style={styles.container} elevation={2}>
      <Typography variant={"body"} uppercase={true} color={themes.base.colors.accent.default} style={styles.isOpenText}>
        {isOpen ? i18n.t("browse.businessProfile.open").toUpperCase() : i18n.t("browse.businessProfile.closed").toUpperCase()}
        <Typography variant={"body"} uppercase={true}>
          {` ${i18n.t("browse.businessProfile.now")}`}
        </Typography>
      </Typography>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: themes.base.colors.white.light,
    marginRight: 8,
    marginLeft: 8,
    borderRadius: 8,
    padding: 8,
    alignItems: "center"
  },
  isOpenText: {
    color: themes.base.colors.accent.default
  }
});

export default BusinessIsOpenView;