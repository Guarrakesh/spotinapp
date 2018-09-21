import React from 'react';
import { connect } from 'react-redux';
import View from '../../components/common/View';
import {Text, StyleSheet, ActivityIndicator, InteractionManager, Button, Platform} from 'react-native';
import ActionButton from 'react-native-action-button';
import moment from 'moment';
import 'moment/locale/it';

import BroadcastsList from '../../components/SpotComponents/BroadcastsList';
import Icon from 'react-native-vector-icons/Feather';
import {Fonts} from "../../components/common/Fonts";
import { getBroadcastsRequest } from '../../actions/broadcasts';

import themes from "../../styleTheme";


class BroadcastsScreen extends React.Component {

  constructor() {
    super();

    this.handleBusinessPress = this.handleBusinessPress.bind(this);

  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    const params = state.params || {};
    const { event } = params;

    return {
      title: "Locali vicini",
      headerTitleStyle: {
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1,
        marginRight: Platform.OS === 'android' ? 75 : null,
      },
      headerStyle: {
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'transparent',
        elevation: 0,
        borderBottomWidth: 0,
        backgroundColor: themes.base.colors.primary.default
      },
    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      const {event} = this.props.navigation.state.params;
      const position = {
        lat: this.props.latitude,
        lng: this.props.longitude
      };

      if (!event.broadcasts) {
        this.props.dispatch(getBroadcastsRequest(event._id, position));
      }
    });


  }

  handleBusinessPress(broadcast) {
    this.props.navigation.navigate('BusinessProfileScreen', {business: broadcast.business});

  }


  bottomView = (broadcasts) => {
    if(!broadcasts || broadcasts.length === 0){
      return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{marginBottom: 16, fontFamily: Fonts.LatoMedium, fontSize: 16}}>Non ci sono locali che trasmettono questo evento</Text>
          <Button title={"Contattaci"}/>
        </View>
      )
    }
    else {
      return (
        <View style={{flex: 1}}>
          <BroadcastsList broadcasts={broadcasts} onItemPress={this.handleBusinessPress}/>
          <ActionButton
            title=''
            position={"right"}
            buttonColor={themes.base.colors.accent.default}
            size={52}
            offsetY={32}
            onPress={() => {this.props.navigation.navigate('BusinessMapInSpot', {broadcasts: broadcasts})}}
            icon={<Icon name="map" size={24}
                        style={{color: themes.base.colors.white.default}}/>}
          />
        </View>
      )
    }
  };

  render() {

    const {event} = this.props.navigation.state.params;
    let broadcasts = event.broadcasts;
    const {currentlySending} = this.props;

    let date = moment(event.start_at).locale('it').format('D MMM - hh:mm').toUpperCase();

    if(currentlySending){
      return(
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={themes.base.colors.accent.default} />
        </View>
      )
    }


    return (
      <View style={styles.container}>
        <View style={styles.subHeader}>
          <Text style={styles.competitionName}>{event.competition.name}</Text>
          <Text style={styles.eventName}>{event.name}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        {this.bottomView(broadcasts)}
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  const { currentlySending, error} = state.entities;
  const { latitude, longitude } = state.location;
  const { loggedIn } = state.auth;
  return {
    currentlySending, error, loggedIn, latitude, longitude,
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  subHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: themes.base.colors.primary.default,
    paddingBottom: 48,
    paddingTop: 16,
    marginBottom: -32,
    zIndex: 0,
  },
  eventName: {
    fontSize: 18,
    color: themes.base.colors.text.default,
    marginBottom: 8,
    fontWeight: '700',

  },
  competitionName: {
    fontSize: 18,
    fontWeight: '700',
    color: themes.base.colors.text.default,

  },
  date: {
    color: themes.base.colors.text.default,

  },
  mapIcon: {

  }
});
export default connect(mapStateToProps)(BroadcastsScreen);
