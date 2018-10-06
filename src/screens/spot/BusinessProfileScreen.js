import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, ScrollView, ActivityIndicator, Animated} from 'react-native';
import Modal from "react-native-modal";
import { connect } from 'react-redux';
import themes from '../../styleTheme';
import {Fonts} from "../../components/common/Fonts";

import ShowController from '../../controllers/ShowController';
import { crudCreate } from '../../actions/dataActions';
import BusinessInfoCard from '../../components/BusinessProfileComponents/BusinessInfoCard';
import BroadcastInProfileList from '../../components/BusinessProfileComponents/BroadcastInProfileList';
import ImagesScrollView from '../../components/BusinessProfileComponents/ImagesScrollView';
import ReservationConfirmView from "../../components/BusinessProfileComponents/ReservationConfirmView";
import ListController from "../../controllers/ListController";
import ReferenceManyFieldController from '../../controllers/ReferenceManyFieldController';

const HEADER_HEIGHT = 50;
class BusinessProfileScreen extends React.Component {

  state = {
    modalVisible: false,
    modalData: {},
    broadcasts: [],
    eventLoaded: false,
    currentlySending: true,
    scrollY: new Animated.Value(0)
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

    }
  }

  handleReservePress(broadcast) {
    this.setState({
      modalVisible: true,
      currentBroadcast: broadcast,
      modalData: {
        broadcast
      }
    });
  }
  handleModalDismiss() {
    this.setState({
      modalVisible: false,
    });
  }
  handleConfirm() {
    this.setState({
      modalVisible: false,

    });

    this.props.reserveBroadcast(this.state.currentBroadcast._id);
    this.forceUpdate();
  }

  handleScroll(e) {
    const scrollY= e.nativeEvent.contentOffset.y;
    if (scrollY > 250 ) {
      this.props.navigation.setParams({headerVisible: true});
    } else {
      this.props.navigation.setParams({headerVisible: false});
    }
  }

  render(){

    const {businessId, distance} = this.props.navigation.state.params;
    const { userReservations } = this.props;
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

                  <Animated.ScrollView
                    //  onScroll={this.handleScroll.bind(this)}
                      scrollEventThrottle={16}
                      style={styles.generalContainer}>
                    <ImagesScrollView business={record}/>

                    <View style={styles.cardContainer}>
                      { record && <BusinessInfoCard distance={distance} business={record}/>}
                      <Modal
                          animationIn={'slideInUp'}
                          animationOut="slideOutDown"
                          isVisible={this.state.modalVisible}

                      >
                        <ReservationConfirmView   onConfirmPress={this.handleConfirm.bind(this)}
                                                  onCancelPress={this.handleModalDismiss.bind(this)}
                                                  data={this.state.modalData}/>
                      </Modal>
                      <ReferenceManyFieldController
                          resource="broadcasts"
                          reference="broadcasts"
                          target="business"
                          source="id"
                          record={record}
                      >
                        {controllerProps => <BroadcastInProfileList
                            userReservations={userReservations}
                            {...controllerProps}
                            onReservePress={this.handleReservePress.bind(this)}/>}

                      </ReferenceManyFieldController>

                    </View>
                  </Animated.ScrollView>
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
    marginLeft: 8,
    marginRight: 8,
    marginTop: -20 //TODO: da valutare (si sovrappone alle foto)
  },
});



export default connect((state) => ({
  userReservations: state.auth.profile.reservations || []
}), {
  reserveBroadcast: broadcast => crudCreate('reservations', { broadcast }, '/reservations')

})(BusinessProfileScreen)
