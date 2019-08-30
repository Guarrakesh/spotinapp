import React from 'react';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  Animated,
  InteractionManager,
  ScrollView,
  StyleSheet,
  Text,
  WebView,
  Platform
} from 'react-native';
import Modal from "react-native-modal";
import {connect} from 'react-redux';
import i18n from "../../i18n/i18n";
import themes from '../../styleTheme';
import {Fonts} from "../../components/common/Fonts";

import ShowController from '../../controllers/ShowController';
import {reserveBroadcast, startReservation, undoReservation} from '../../actions/reservation';
import BusinessIsOpenView from "../../components/BusinessProfileComponents/BusinessIsOpenView";
import BusinessInfoCard from '../../components/BusinessProfileComponents/BusinessInfoCard';
import BroadcastInProfileList from '../../components/BusinessProfileComponents/BroadcastInProfileList';
import ImagesScrollView from '../../components/BusinessProfileComponents/ImagesScrollView';
import ReservationConfirmView from "../../components/BusinessProfileComponents/ReservationConfirmView";
import ReferenceManyFieldController from '../../controllers/ReferenceManyFieldController';
import {Touchable, View} from "../../components/common";

/*Firebase*/
import firebase from 'react-native-firebase';
import type { Notification, NotificationOpen } from 'react-native-firebase';

class BusinessProfileScreen extends React.Component {


  state = {
    modalVisible: false,
    quickerModalVisible: false,
    loadingSpinner: true,
    modalData: {},
    broadcasts: [],
    eventLoaded: false,
    currentlySending: true,
    scrollY: new Animated.Value(0),

    //Broadcast prenotati durante questa sessione
    reservedBroadcasts: [],
  };

  static navigationOptions = ({navigation}) => {
    //  const headerVisible = navigation.state.params.headerVisible;
    return {
      title: navigation.getParam('title'),

      /* headerTransparent: false

       headerStyle: {
         shadowColor: 'transparent',
         borderBottomWidth: 1,

       },*/
      headerStyle: {
        //backgroundColor: themes.base.colors.primary.default
      },
      headerTitleStyle: {
        fontFamily: Fonts.LatoBold,
        color: themes.base.colors.accent.default
      },
      headerBackTitle: null

    }
  };

  componentDidMount(){
    const { broadcastId } = this.props.navigation.state.params;
    this.scrollTimeout = setTimeout(() => {this.scroller.scrollTo({x: 0, y: broadcastId ? themes.base.deviceDimensions.height/3.5 : 0, animated: true})}, 1000); //dopo 1 secondo fa lo scroll centrando il broadcast selezionato, se c'è
  }



  componentWillUnmount() {
    clearTimeout(this.scrollTimeout);
  }

  handleReservePress(broadcast) {

    InteractionManager.runAfterInteractions(() => {
      this.setState({
        modalVisible: true,
        currentBroadcast: broadcast,
        modalData: {
          broadcast
        }
      });
    });
    this.props.startReservation(this.props.userId, broadcast.id); //Dispatch azione per tracking
  }

  handleModalDismiss() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        modalVisible: false,
      });
    });
    this.props.undoReservation(this.props.userId, this.state.currentBroadcast._id);
  }

  handleConfirm(numPeople, cheerFor, previousCheers) {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        modalVisible: false,
      });
    });

    this.props.reserveBroadcast(
      this.state.currentBroadcast._id,
      this.props.userId,
      numPeople,
      cheerFor,
      previousCheers,
      ({payload, requestPayload}) => {
      //A prenotazione effettuata, aggiungo questo broadcast a quelli prenotati nello state, così che possa cambiare comparire
      //il flag PRENOTATO
      this.setState({ reservedBroadcasts: [...this.state.reservedBroadcasts, requestPayload.data.broadcast]});
    });

    this.forceUpdate();
  }


  handleLogin() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        modalVisible: false,
      });
      this.props.navigation.navigate("Auth");
    });

  }

  hideSpinner() {
    this.setState({ loadingSpinner: false });
  }

  isOpen(business) {
    const today = new Date();
    let day = today.getDay();
    if (business.business_hours && business.business_hours[day]) {

      const currentDay = business.business_hours[day];
      const minutes = today.getHours() * 60 + today.getMinutes();
      return !!currentDay.openings.find(o =>
        (minutes > o.open && minutes < o.close) ||
        (currentDay.crossing_day_close && minutes > o.open && minutes < 1440 + currentDay.crossing_day_close))
    }
    return false;
  };

  render(){

    const {businessId, distance, broadcastId} = this.props.navigation.state.params;

    return (
      <ShowController resource="businesses"
                      id={businessId}
                      navigation={this.props.navigation}
                      navigationTitle={(record) => record.name}
                      basePath="/businesses">
        { ({record, isLoading}) => {

          if (isLoading || !record) return null;


          return (
            <View style={styles.scrollView}
                  contentContainerStyle={{alignItems: 'center', justifyContent: 'flex-start', flex:1}}>

              <ScrollView
                scrollEventThrottle={16}
                bounces={false}
                style={styles.generalContainer}
                ref={(ref) => {
                  this.scroller = ref
                }}
              >
                <ImagesScrollView business={record}/>

                <View style={styles.cardContainer}>
                  {record &&
                  <BusinessInfoCard hasQuicker={!!record.quickerMenuURL}
                                    onQuickerPress={() => this.setState({quickerModalVisible: true})}
                                    distance={distance} business={record}/>
                  }
                  {
                    record.business_hours &&
                    <BusinessIsOpenView business={record} isOpen={this.isOpen(record)}/>
                  }
                  <Modal
                    animationIn={'slideInUp'}
                    animationOut={"slideOutDown"}
                    isVisible={this.state.modalVisible}

                  >
                    <ReservationConfirmView
                      onConfirmPress={this.handleConfirm.bind(this)}
                      onLoginPress={this.handleLogin.bind(this)}
                      onCancelPress={this.handleModalDismiss.bind(this)}
                      isAuth={this.props.userId}
                      data={this.state.modalData}/>
                  </Modal>
                  <Modal
                    animationIn={"slideInUp"}
                    animationOut={"slideOutDown"}
                    isVisible={this.state.quickerModalVisible}
                    style={styles.modalView}
                  >
                    <WebView
                      source={{uri: record.quickerMenuURL}}
                      onLoad={() => this.hideSpinner()}
                    />
                    {this.state.loadingSpinner && (
                      <ActivityIndicator
                        style={{ position: "absolute", alignSelf: "center"}}
                        color={themes.base.colors.accent.default}
                        size="large"
                      />
                    )}
                    <Touchable style={styles.privacyButton} onPress={() => this.setState({quickerModalVisible: false, loadingSpinner: true})}>
                      <Text style={styles.privacyButtonText}>OK</Text>
                    </Touchable>
                  </Modal>
                  <ReferenceManyFieldController
                    resource="broadcasts"
                    reference="broadcasts"
                    target="business"
                    source="id"
                    focusedId={0}
                    sort={{field: "broadcast.event.start_at"}}
                    record={record}
                  >
                    {controllerProps => <BroadcastInProfileList
                      {...controllerProps}
                      business={record}
                      selectedBroadcast={broadcastId}
                      reservedBroadcasts={this.state.reservedBroadcasts}
                      onReservePress={this.handleReservePress.bind(this)}
                    />}

                  </ReferenceManyFieldController>

                </View>
              </ScrollView>
            </View>

          )}
        }
      </ShowController>
    );
  }

}

BusinessProfileScreen.propTypes = {
  reserveBroadcast: PropTypes.func,
};

const styles = StyleSheet.create({

  scrollView: {
    //  flexDirection: 'column',
    flex: 1
  },
  generalContainer: {
    flex: 1,
    backgroundColor: themes.base.colors.white.default
  },
  cardContainer: {
    marginTop: -20 //TODO: da valutare (si sovrappone alle foto)
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



export default connect((state) => ({
  userId: state.auth.profile._id
}), {
  reserveBroadcast,
  startReservation,
  undoReservation
})(BusinessProfileScreen)
