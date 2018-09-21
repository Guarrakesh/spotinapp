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
      }

    }
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      const {businesses} = this.props;


      //Dispatch la richiesta della posizione
      this.props.dispatch(getLocationRequest());
      const { lat, lng } = this.props;

      //Questo if è eseguito dopo la richiesta di posizione quindi in questo momento la richiesta non è ancora finita
      //Devo controllare quindi se lat e lng erano già presenti nello store, se sì allora posso fetchare i business
      //Altrimenti lo farò in componentDidUpdate
      if (lat && lng && (!businesses || businesses.length === 0)) {
        this.props.dispatch(getBusinessRequest({lat, lng}));
      }
    });
  }
  componentDidUpdate(prevProps) {
    //ComponentDidUpdate viene chiamato ogni volta che il componente riceve props aggiornate (es. da Redux)
    //Quindi può essere che in questo ciclo sia stata completata la location request e quindi ho la posizione
    //Se così, allora fetcho i business

    const { lat, lng } = this.props;
    if (prevProps.lat !== lat || prevProps.lng !== lng) {

      //Se la posizione nuova è diversa da quelle precedenti (se ad esempio ora ce l'ho e prima erano null) allora
      //posso fetchare i business
      //E' cambiata la posizione, quindi i business li refetcho a prescindere che ci siano già o no
      this.props.dispatch(getBusinessRequest({lat, lng}));
    }
  }
  handleBusinessPress(business) {
    this.props.navigation.navigate('BusinessProfileScreen', {business: business});

  }


  render() {

    const { businesses } = this.props;
    const { currentlySending } = this.props;

    return (
        <View style={styles.container}>
          <SearchBar
              round={true}
              placeholder='Cerca Locale'
              lightTheme={true}
              clearIcon={{ color: 'white' }}
          />
          <BusinessList businesses={businesses} onItemPress={this.handleBusinessPress}/>
          <ActionButton
              title=''
              position={"right"}
              buttonColor={themes.base.colors.accent.default}
              size={52}
              offsetY={32}
              onPress={() => {this.props.navigation.navigate('BusinessMapInBusiness', {businesses: businesses})}}
              icon={<Icon name="map" size={24}
                          style={{color: themes.base.colors.white.default}}/>}
          />
        </View>

    )


  }
}
const mapStateToProps = (state) => {
  const { currentlySending, error } = state.entities;
  const { latitude: lat, longitude: lng} = state.location;
  const { loggedIn } = state.auth;
  return {
    currentlySending, error, loggedIn, lat, lng,
    businesses: state.entities.businesses
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1
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
