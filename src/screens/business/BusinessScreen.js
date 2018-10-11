import React from 'react';
import { connect } from 'react-redux';
import View from '../../components/common/View';
import {Text, StyleSheet, InteractionManager} from 'react-native';
import { SearchBar } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import moment from 'moment';
import 'moment/locale/it';

import BusinessList from '../../components/BusinessComponents/BusinessList';
import Icon from 'react-native-vector-icons/Feather';
import { getBusinessRequest } from '../../actions/businesses';
import { getLocationRequest } from "../../actions/location";

import themes from "../../styleTheme";
import {Fonts} from "../../components/common/Fonts";
import ListController from "../../controllers/ListController";


class BusinessScreen extends React.Component {

  constructor() {
    super();

    this.handleBusinessPress = this.handleBusinessPress.bind(this);

  }

  static navigationOptions = ({ navigation }) => {
    const { state, setParams, navigate } = navigation;
    const params = state.params || {};
    const { businesses } = params;

    return {

      title: "Locali vicini",

      headerStyle: {
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'transparent',
        borderBottomWidth: 0,
        backgroundColor: themes.base.colors.primary.default
      },
      headerTitleStyle: {
        fontFamily: Fonts.LatoBold,
        color: themes.base.colors.text.default
      },
      headerBackTitle: null

    }
  }

  componentDidMount() {

      const {businesses} = this.props;


      //Dispatch la richiesta della posizione
      this.props.dispatch(getLocationRequest());



  }

  handleBusinessPress(businessId, distance) {
    this.props.navigation.navigate('BusinessProfileScreen', {businessId, distance});

  }


  render() {

    const { latitude, longitude } = this.props;

    if (!latitude || !longitude) return null;

    const nearPosition = {
      latitude,
      longitude,
      radius: 50,

    };
    //if (businesses.list.ids.length === 0) return null;

    return (
      <ListController
        id='business_list'
        perPage="20"
        resource="businesses"
        sort={{field: 'dist.calculated', order: 'asc'}}
        nearPosition={nearPosition}
      >
        {controllerProps =>
          <View style={styles.container}>
          <SearchBar
              // round={true}
              // placeholder='Cerca Locale'
               lightTheme={true}
              // clearIcon={{ color: 'white' }}
          />
          <BusinessList onItemPress={this.handleBusinessPress} {...controllerProps}/>
          <ActionButton
              title=''
              position={"right"}
              buttonColor={themes.base.colors.accent.default}
              size={52}
              offsetY={32}
              onPress={() => this.props.navigation.navigate('BusinessMapInBusiness', {
                data: controllerProps.data,
                ids: controllerProps.ids
              })}
              renderIcon={() => <Icon name="map" size={24} style={{color: themes.base.colors.white.default}}/>}
          />
        </View>}
      </ListController>
    )
  }
}
const mapStateToProps = (state) => {

  const { latitude, longitude } = state.location.coordinates;
  const { loggedIn } = state.auth;
  return {
    loggedIn, latitude, longitude,
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.base.colors.white.default
    // top: 0,
    // bottom: 0,
    // right: 0,
    // left: 0,
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
export default connect(mapStateToProps)(BusinessScreen);
