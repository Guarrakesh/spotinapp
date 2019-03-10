import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  InteractionManager,
  ScrollView,
  Animated,
  //RefreshControl,
  Button
} from 'react-native';
import Modal from "react-native-modal";
import { connect } from 'react-redux';

import themes from '../../styleTheme';
import {Fonts} from "../../components/common/Fonts";

import ShowController from '../../controllers/ShowController';
import { reserveBroadcast, startReservation, undoReservation } from '../../actions/reservation';
import BusinessInfoCard from '../../components/BusinessProfileComponents/BusinessInfoCard';
import BroadcastInProfileList from '../../components/BusinessProfileComponents/BroadcastInProfileList';
import ImagesScrollView from '../../components/BusinessProfileComponents/ImagesScrollView';
import ReservationConfirmView from "../../components/BusinessProfileComponents/ReservationConfirmView";

import ReferenceManyFieldController from '../../controllers/ReferenceManyFieldController';
import { refreshList as refreshListAction } from '../../actions/listActions';

const HEADER_HEIGHT = 50;

class BusinessProfileScreen extends React.Component {

  state = {
    modalVisible: false,
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
        backgroundColor: themes.base.colors.primary.default
      },
      headerTitleStyle: {
        fontFamily: Fonts.LatoBold,
        color: themes.base.colors.text.default
      },
      headerBackTitle: null

    }
  };

  componentDidMount(){
    const { broadcastId } = this.props.navigation.state.params;
    this.scrollTimeout = setTimeout(() => {this.scroller.scrollTo({x: 0, y: broadcastId ? themes.base.deviceDimensions.height/4 : 0, animated: true})}, 1000); //dopo 1 secondo fa lo scroll centrando il broadcast selezionato, se c'è
  }

  componentWillUnmount(): void {
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

  handleConfirm() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        modalVisible: false,
      });
    });

    this.props.reserveBroadcast(this.state.currentBroadcast._id, this.props.userId, ({payload, requestPayload}) => {
      //A prenotazione effettuata, aggiungo questo broadcast a quelli prenotati nello state, così che possa cambiare comparire
      //il flag PRENOTATO
      this.setState({ reservedBroadcasts: [...this.state.reservedBroadcasts, requestPayload.data.broadcast]})
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

 /* handleScroll(e) {
    const scrollY= e.nativeEvent.contentOffset.y;
    if (scrollY > 250 ) {
      this.props.navigation.setParams({headerVisible: true});
    } else {
      this.props.navigation.setParams({headerVisible: false});
    }
  }*/

  /*handleRefresh(){
    console.log(this.amen);
    this.amen.fetchReferences();
  }*/

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
                //  onScroll={this.handleScroll.bind(this)}
                scrollEventThrottle={16}
                bounces={false}
                style={styles.generalContainer}
                ref={(ref) => {
                  this.scroller = ref
                }}
                //contentOffset={{x: 0, y: broadcastId ? themes.base.deviceDimensions.height/4 : 0}}
              >
                <ImagesScrollView business={record}/>

                <View style={styles.cardContainer}>
                  { record && <BusinessInfoCard distance={distance} business={record}/>}
                  <Modal
                    animationIn={'slideInUp'}
                    animationOut={"slideOutDown"}
                    isVisible={this.state.modalVisible}

                  >
                    <ReservationConfirmView   onConfirmPress={this.handleConfirm.bind(this)}
                                              onLoginPress={this.handleLogin.bind(this)}
                                              onCancelPress={this.handleModalDismiss.bind(this)}
                                              isAuth={this.props.userId}
                                              data={this.state.modalData}/>
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

};

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
});



export default connect((state) => ({
  userId: state.auth.profile._id
}), {
  reserveBroadcast,
  startReservation,
  undoReservation
})(BusinessProfileScreen)
