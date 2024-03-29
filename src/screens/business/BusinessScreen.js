import React from 'react';
import { connect } from 'react-redux';
import {Text, StyleSheet, InteractionManager, Animated} from 'react-native';
import { withNamespaces } from 'react-i18next';

import ActionButton from 'react-native-action-button';

import 'moment/locale/it';

import { View, SearchBar, Button} from '../../components/common';

import BusinessList from '../../components/BusinessComponents/BusinessList';
import Icon  from 'react-native-vector-icons/Feather';

import { entityView } from "../../actions/view";
import themes from "../../styleTheme";
import {Fonts} from "../../components/common/Fonts";
import ListController from "../../controllers/ListController";
import { coordsSelector } from "../../reducers/location";


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
      _listMarginTop: new Animated.Value(0),
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
    requestAnimationFrame(() => {
      Animated.parallel([
        Animated.timing(
          this.state._searchBarY,
          {
            toValue: newState ? 100 : 0,
            duration: 300
          }
        ),
        Animated.timing(
          this.state._listMarginTop,
          {
            toValue: newState ? 50 : 0,
            duration: 300
          }
        )
      ]).start(() => {

        InteractionManager.runAfterInteractions(() => {
          this.props.navigation.setParams({
            searchBar: { open: newState }
          });
          this.setState({searchBar: {open: newState}});
        });
      });
    });
  }


  static navigationOptions = ({ navigation }) => {

    const { state } = navigation;
    const params = state.params || {};



    return {

      headerStyle: {
        shadowOffset: {width: 0, height: 0},
        shadowColor: 'transparent',
        borderBottomWidth: 0,
        //backgroundColor: themes.base.colors.primary.default
      },
      headerRight: <AnimatedIcon
        name={params.searchBar && params.searchBar.open ? "x" : "search"}
        onPress={params.onSearchPress}
        style={{marginRight: 21}}
        color={themes.base.colors.text.default}
        size={21}/>,

      headerTitleStyle: {
        fontFamily: Fonts.LatoBold,
        color: themes.base.colors.accent.default
      },
      headerBackTitle: null

    }
  };


  handleBusinessPress(businessId, distance) {
    this.props.entityView('business', businessId);
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
        perPage="1000"
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
                  backgroundColor: 'red',
                  position: 'absolute',
                  top: -100,
                  width: '100%',
                  zIndex: 90,
                  transform: [{
                    translateY: this.state._searchBarY
                  }]
                }}>
                <SearchBar
                  showLoading={controllerProps.isLoading}
                  onChangeText={(text) => { this.setState({currentSearchValue: text}); controllerProps.setFilters({q: text})}}
                  onClear={() => this.cleanFilter(controllerProps)}
                  value={this.state.currentSearchValue} // non uso controllerProps.currentFilter.q perché su Android da problemi col debounce
                  allowFontScaling={false}
                  placeholder={t("home.searchBusiness")}
                />
              </Animated.View>
              <AnimatedBusinessList
                searchActive={controllerProps.filterValues.q !== undefined }
                style={{
                  marginTop: this.state._listMarginTop, //altrimenti l'ultimo locale della ricerca viene nascosto dalla tab

                  // transform: [{
                  //   translateY: this.state._searchBarY
                  // }]
                }}
                onItemPress={this.handleBusinessPress}
                {...controllerProps}/>
              {
                !controllerProps.isLoading ?
                  <Button
                    disabled={controllerProps.isLoading}
                    variant={"primary"}
                    containerStyle={styles.mapButton}
                    titleStyle={{fontSize: 24}}
                    onPress={() => this.props.navigation.navigate('BusinessMapInBusiness', {
                      data: controllerProps.data,
                      ids: controllerProps.ids
                    })}

                  >
                    <Icon name="map" size={24} style={{color: themes.base.colors.white.default}}/>
                  </Button>
                  : null
              }

            </View>)}}
      </ListController>
    )
  }
}
const mapStateToProps = (state) => {

  // const { latitude, longitude } = state.location.address.position ?
  //   state.location.address.position.coords :
  //   state.location.device.position ? state.location.device.position.coords : {};
  const { latitude, longitude } = coordsSelector(state);


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
  mapButton: {
    position: 'absolute',
    width: 54,
    height: 54,
    right: 32,
    bottom: 16,
    borderRadius: 32,
    justifyContent: 'center'
  }
});
export default connect(mapStateToProps, {
  entityView
})(withNamespaces()(BusinessScreen));
