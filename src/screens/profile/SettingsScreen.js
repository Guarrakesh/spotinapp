import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Switch,
  Linking,
  Platform,
  WebView,
  Button,
  Alert,

} from 'react-native';
import Modal from "react-native-modal";
import i18n from '../../i18n/i18n';
import { Touchable } from "../../components/common";
import themes from "../../styleTheme";
import connect from "react-redux/es/connect/connect";
import {userCheck, userLogout} from "../../actions/authActions";
import { updateSettings } from "../../actions/profile";


class SettingsScreen extends React.Component {

  constructor(){
    super();

    this.state = {
      notificationDisabled: false,
      modalVisible: false
    }
  }

  componentDidMount(){
    this.setState({notificationDisabled: !this.props.profile.notificationsEnabled})
  }

  handleLogout() {
    Alert.alert(
      `${i18n.t("profile.settings.logoutConfirm")}`,
      '',
      [
        {text: `${i18n.t("profile.settings.no")}`, onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: `${i18n.t("profile.settings.yes")}`, onPress: () => this.props.userLogout()},
      ],
      { cancelable: true }
    )

  }

  handleSwitchChange(){
    if(this.state.notificationDisabled){
      this.setState({notificationDisabled: false});
      this.props.updateSettings({userId: this.props.userId, notificationsEnabled: true});
    }
    else {
      this.setState({notificationDisabled: true});
      this.props.updateSettings({userId: this.props.userId, notificationsEnabled: false});
    }

  }

  ha

  handleRateUs(){
    Linking.openURL(Platform.OS === "android" ? "https://play.google.com/store/apps/details?id=it.spotin" : "https://itunes.apple.com/it/app/spot-in/id1439906179")
  }

  handleTerms() {
    this.setState({modalVisible: true});
  }

  render(){
    return(
      <ScrollView style={{backgroundColor: themes.base.colors.white.light}}>
        <Modal
          animationIn={"slideInUp"}
          animationOut={"slideOutDown"}
          isVisible={this.state.modalVisible}
          style={styles.modalView}
          >
          <WebView
            source={{uri: i18n.language === "it-IT" ? "https://www.iubenda.com/privacy-policy/62969082" : "https://www.iubenda.com/privacy-policy/55322937"}}
          />
          <Touchable style={styles.privacyButton} onPress={() => this.setState({modalVisible: false})}>
            <Text style={styles.privacyButtonText}>OK</Text>
          </Touchable>
        </Modal>
        <View style={styles.sectionView}>
          <Text style={styles.headerText}>{i18n.t("common.Profile").toUpperCase()}</Text>
          <Touchable onPress={() => this.props.navigation.navigate("EditProfileScreen")}>
            <Text style={styles.itemText}>{i18n.t("profile.settings.editProfile")}</Text>
          </Touchable>
        </View>
        <View style={styles.sectionView}>
          <Text style={styles.headerText}>{i18n.t("profile.settings.notification").toUpperCase()}</Text>
          <View style={{flexDirection: "row", paddingRight: 16}}>
            <Text style={styles.itemText}>{i18n.t("profile.settings.disableNotification")}</Text>
            <Switch
              value={this.state.notificationDisabled}
              onValueChange={() => this.handleSwitchChange()}
              thumbTintColor={themes.base.colors.white.divisor}
              onTintColor={themes.base.colors.accent.default}
            />
          </View>
        </View>
        <View style={styles.sectionView}>
          {/*<Text style={styles.headerText}>{i18n.t("profile.settings.support").toUpperCase()}</Text>*/}
          <Touchable onPress={() => this.handleTerms()}>
            <Text style={styles.itemText}>{i18n.t("profile.settings.privacy")}</Text>
          </Touchable>
          <Touchable onPress={() => Linking.openURL("https://spotin.it") }>
            <Text style={styles.itemText}>{i18n.t("profile.settings.visitWebSite")}</Text>
          </Touchable>
      {/*  </View>
        <View style={styles.sectionView}>*/}
          <Touchable onPress={() => this.handleRateUs()}>
            <Text style={styles.itemText}>{i18n.t("profile.settings.rateUs")}</Text>
          </Touchable>
          <Touchable onPress={() => this.handleLogout()}>
            <Text style={[styles.itemText, {color: themes.base.colors.danger.light}]}>{i18n.t("profile.settings.logout")}</Text>
          </Touchable>
        </View>
      </ScrollView>
    )

    //HO FATTO LA SECTION LIST MA PERSONALIZZARLA È NU BURDELL!!

    // return(
    //   <SectionList
    //     style={{backgroundColor: 'white', paddingTop: 16}}
    //     renderItem={({item, index, section}) => (
    //       <Touchable style={styles.itemView} onPress={item.onPress}>
    //         <Text style={styles.itemText} key={index}>{item.text}</Text>
    //         {item.isSwitchable ?
    //           <Switch/> : null
    //         }
    //       </Touchable>
    //     )}
    //     renderSectionHeader={({section: {title}}) => (
    //       <View style={styles.headerView}>
    //         <Text style={styles.headerText}>{title.toUpperCase()}</Text>
    //       </View>
    //     )}
    //     sections={[
    //       {
    //         title: i18n.t("common.Profile"),
    //         data:
    //           [{
    //             text: i18n.t("profile.settings.editProfile"),
    //             onPress: () => this.props.navigation.navigate("EditProfileScreen")
    //           }]
    //       },
    //       {
    //         title: i18n.t("profile.settings.notification"),
    //         data: [{
    //           text: i18n.t("profile.settings.disableNotification"),
    //           isSwitchable: true
    //         }]
    //       },
    //       {
    //         title: i18n.t("profile.settings.support"),
    //         data: [
    //           {text: i18n.t("profile.settings.privacy")},
    //           {text: i18n.t("profile.settings.contactUs")}
    //           ]
    //       },
    //       {
    //         title: "",
    //         data: [
    //           {text: i18n.t("profile.settings.rateUs")},
    //           {text: i18n.t("profile.settings.logout")}
    //         ]
    //       }
    //     ]}
    //     keyExtractor={(item, index) => item + index}
    //   />
    // )
  }

}

const styles = StyleSheet.create({
  sectionView: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 16,
    borderBottomColor: themes.base.colors.white.divisor,
    borderBottomWidth: 1
  },
  headerView: {
    padding: 8,
    paddingTop: 16,
    borderTopColor: themes.base.colors.white.divisor,
    borderTopWidth: 1
  },
  headerText: {
    marginLeft: 16,
    fontSize: 20,
    fontFamily: themes.base.fonts.LatoBold,
    color: themes.base.colors.text.default
  },
  itemView: {
    padding: 8,
    paddingBottom: 16,
    flexDirection: 'row'
  },
  itemText: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 18,
    fontFamily: themes.base.fonts.Lato,
    color: themes.base.colors.text.default
  },
  modalView: {
    borderTopRightRadius: themes.base.borderRadius,
    borderTopLeftRadius: themes.base.borderRadius,
    overflow: "hidden"
  },
  privacyButton: {
    backgroundColor: themes.base.colors.accent.default,
    padding: 16,
    alignItems: "center",
    borderBottomRightRadius: themes.base.borderRadius,
    borderBottomLeftRadius: themes.base.borderRadius
  },
  privacyButtonText: {
    fontSize: 16,
    fontFamily: themes.base.fonts.LatoBold,
    color: themes.base.colors.white.default
  }
});

const mapStateToProps = (state) => {
  return ({
    userId: state.auth.profile ? state.auth.profile._id : undefined,
    profile: state.auth.profile
  });
};

export default connect(mapStateToProps, { userCheck, userLogout, updateSettings})(SettingsScreen);;