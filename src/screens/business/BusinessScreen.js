import React from 'react';
import { connect } from 'react-redux';
import {Text, StyleSheet, InteractionManager, Animated} from 'react-native';
import { withNamespaces } from 'react-i18next';

import ActionButton from 'react-native-action-button';

import 'moment/locale/it';

import { View, SearchBar} from '../../components/common';

import BusinessList from '../../components/BusinessComponents/BusinessList';
import Icon  from 'react-native-vector-icons/Feather';


import themes from "../../styleTheme";
import {Fonts} from "../../components/common/Fonts";
import ListController from "../../controllers/ListController";


const AnimatedIcon = Animated.createAnimatedComponent(Icon);
const AnimatedSearchBar = Animated.createAnimatedComponent(SearchBar);
const AnimatedBusinessList = Animated.createAnimatedComponent(BusinessList);

const searchBarStyles = themes.base.searchBar;


class BusinessScreen extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      currentSearchValue: "",
      isFirstMount: true,
      _searchBarY: new Animated.Value(0),
      searchBar:{ open: false }

    };
    this.handleBusinessPress = this.handleBusinessPress.bind(this);
    this.handleSearchPress = this.handleSearchPress.bind(this);

  }
  componentWillMount(props) {
    this.props.navigation.setParams({

      onSearchPress: this.handleSearchPress,
      searchBar: this.state.searchBar,
    })
  }


  componentDidMount(){
    this.setState({currentSearchValue: ""});
  }


  handleSearchPress() {

    const newState = !this.state.searchBar.open;
    this.props.navigation.setParams({
      searchBar: { open: newState }
    });
    Animated.timing(
      this.state._searchBarY,
      {
        toValue: newState ? 1 : 0,
        duration: 300
      }
    ).start(() => {
      this.setState({searchBar: {open: newState}});

    });

  }


  static navigationOptions = ({ navigation }) => {

    const { state } = navigation;
    const params = state.params || {};



    return {

      title: "Locali vicini",

      headerStyle: {
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'transparent',
        borderBottomWidth: 0,
        backgroundColor: themes.base.colors.primary.default
      },
      headerRight: <AnimatedIcon
        name={params.searchBar && params.searchBar.open ? "x" : "search"}
        onPress={params.onSearchPress}
        style={{marginRight: 21}}
        color={themes.base.colors.text.default}
        size={21}/>,




      headerTitleStyle: {
        fontFamily: Fonts.LatoBold,
        color: themes.base.colors.text.default
      },
      headerBackTitle: null

    }
  }


  handleBusinessPress(businessId, distance) {
    this.props.navigation.navigate('BusinessProfileScreen', {businessId, distance});

  }

  cleanFilter(controllerProps){
    controllerProps.setFilters({q: undefined});
    this.setState({isFirstMount: false})
  }



  render() {

    const { latitude, longitude, t } = this.props;

    if (!latitude || !longitude) return null;

    const nearPosition = {
      latitude,
      longitude,
      radius: 99999,

    };
    //if (businesses.list.ids.length === 0) return null;


    return (
      <ListController
        id='business_list'
        resource="businesses"
        perPage="100"
        sort={{field: 'dist.calculated', order: 'asc'}}
        nearPosition={nearPosition}
        filterDefaultValues={undefined}
      >
        {controllerProps => {
          {this.state.isFirstMount ? this.cleanFilter(controllerProps) : null}
          return(
            <View style={styles.container}>
              <Animated.View

                style={{
                  backgroundColor: 'white',
                  position: 'absolute',
                  top: -100,
                  width: '100%',
                  zIndex: 90,
                  transform: [{
                    translateY: this.state._searchBarY.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 100]
                    })
                  }]
                }}>
                <AnimatedSearchBar
                  showLoading={controllerProps.isLoading}
                  onChangeText={(text) => { this.setState({currentSearchValue: text}); controllerProps.setFilters({q: text})}}
                  onClear={() => this.clearFilter(controllerProps)}
                  value={this.state.currentSearchValue} // non uso controllerProps.currentFilter.q perché su Android da problemi col debounce

                  placeholder={t("home.searchBusiness")}
                />
              </Animated.View>
              <AnimatedBusinessList
                searchActive={controllerProps.filterValues.q !== undefined }
                style={{
                  transform: [{
                    translateY: this.state._searchBarY.interpolate({
                      inputRange: [0,1],
                      outputRange: [0, 50]
                    })
                  }]
                }}
                onItemPress={this.handleBusinessPress}
                {...controllerProps}/>
              <ActionButton
                title=''
                position={"right"}
                fixNativeFeedbackRadius={true}
                buttonColor={themes.base.colors.accent.default}
                size={52}
                offsetY={32}
                onPress={() => this.props.navigation.navigate('BusinessMapInBusiness', {
                  data: controllerProps.data,
                  ids: controllerProps.ids
                })}
                renderIcon={() => <Icon name="map" size={24} style={{color: themes.base.colors.white.default}}/>}
              />
            </View>)}}
      </ListController>
    )
  }
}
const mapStateToProps = (state) => {

  const { latitude, longitude } = state.location.device.position ? state.location.device.position.coords : {};


  const { loggedIn } = state.auth;
  return {
    loggedIn, latitude, longitude,
  }

};


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
export default connect(mapStateToProps)(withNamespaces()(BusinessScreen));
