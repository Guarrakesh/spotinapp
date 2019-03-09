import React from 'react';
import { connect } from 'react-redux';
import {Text, StyleSheet, Platform} from "react-native";

import ListController from '../../controllers/ListController';
import i18n from "../../i18n/i18n";
import FavSportList from '../../components/ProfileComponents/favorites/FavSportList';
import PropTypes from 'prop-types';
import {Touchable} from "../../components/common";
import {setFavorites} from "../../actions/profile";
import themes from "../../styleTheme";
import {Fonts} from "../../components/common/Fonts";

class FavoriteSportsScreen extends React.Component {


  constructor() {
    super();
    this.handleItemPress = this.handleItemPress.bind(this);
    this.state = {
      favSports: [],
      favCompetitors: []
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <Touchable
          style={{backgroundColor: 'transparent', marginRight: Platform.OS === "android" ? null : 16, borderRadius: 50}}
          onPress={() => navigation.getParam('handleDonePress')()}
        >
          <Text style={styles.doneButton}>{i18n.t("profile.settings.favorite.done")}</Text>
        </Touchable>
      ),
      headerLeft: (
        <Touchable
          style={{backgroundColor: 'transparent', marginLeft: Platform.OS === "android" ? null : 16, borderRadius: 50}}
          onPress={() => navigation.getParam("handleCancelPress")()}
        >
          <Text style={styles.cancelButton}>{i18n.t("common.skip")}</Text>
        </Touchable>
      )
    }
  };

  componentDidMount(){
    this.setState({favSports: this.props.favoriteSports, favCompetitors: this.props.favoriteCompetitors});
    this.props.navigation.setParams({
      handleDonePress: this.handleDonePress,
      handleCancelPress: this.handleCancelPress
    });

  }

  componentDidUpdate(prevProps, prevState) {
    const newFavCompetitors = this.props.navigation.state.params.favCompetitors;
    if(prevState.favCompetitors &&
      newFavCompetitors &&
      prevState.favCompetitors !== newFavCompetitors &&
      prevState.favSports === this.state.favSports
    ){
      this.setState({favCompetitors: newFavCompetitors});
      this.props.navigation.state.params.favCompetitors = null; //resetto la navigazione

    }
  }

  handleDonePress = () => {
    const { favSports, favCompetitors } = this.state;
    this.props.setFavorites({userId: this.props.userId, favorite_sports: favSports, favorite_competitors: favCompetitors });
    const { state } = this.props.navigation;
    if (state && state.params && typeof state.params.onDone === "function") {
      state.params.onDone();
    }
  };

  handleCancelPress = () => {
    const { state } = this.props.navigation;
    if (state && state.params && typeof state.params.onCancel === "function") {
      state.params.onCancel();
    }
  };

  addToFav(sportId, sportName){
    const favToAdd = { _id: sportId, name: sportName };
    const newFav = this.state.favSports.concat([favToAdd]);
    this.setState({favSports: newFav});
  }

  deleteFromFav(sportId){
    let filteredSports = this.state.favSports.filter(function(item) {
      return item._id !== sportId
    });
    let filteredCompetitors = this.state.favCompetitors.filter(function(item) {
      return item.sport !== sportId
    });
    this.setState({favSports: filteredSports, favCompetitors: filteredCompetitors});
    //Faccio tutto in un setState per evitare effetti collaterali di due setState
  }


  isFav(sportId){
    for(let sport of this.state.favSports){
      if(sport._id === sportId){
        return true;
      }
    }
    return false;
  }


  handleItemPress(sportId, sportName, sportHasCompetitor) {
    if(this.isFav(sportId)){
      this.deleteFromFav(sportId);
    }
    else if(sportHasCompetitor && !this.isFav(sportId)){
      this.addToFav(sportId, sportName);
      this.props.navigation.navigate('FavoriteCompetitorsScreen', {sportId, title: sportName, favCompetitors: this.state.favCompetitors});
    }
    else if(!sportHasCompetitor && !this.isFav(sportId)){
      this.addToFav(sportId, sportName);
    }

  }

  render() {
    return (
      <ListController
        id="sport_screen_list"
        resource="sports"
        perPage={20}
        sort={{field: '_id', order: 'asc'}}
      >
        { controllerProps =>
          <FavSportList
            onItemPress={this.handleItemPress}
            favCompetitors={this.state.favCompetitors}
            favSports={this.state.favSports}
            {...controllerProps} />}

      </ListController>
    )
  }
}

const styles = StyleSheet.create({
  doneButton: {
    margin: Platform.OS === "android" ? 16 : null,
    color: themes.base.colors.accent.default,
    fontSize: 16,
    fontFamily: Fonts.LatoBold
  },
  cancelButton: {
    margin: Platform.OS === "android" ? 16 : null,
    color: themes.base.colors.text.dark,
    fontSize: 16,
    fontFamily: Fonts.Lato
  }
});

FavoriteSportsScreen.propTypes = {
  navigation: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    userId : state.auth.profile ? state.auth.profile._id : undefined,
    favoriteSports: state.auth.profile.favorite_sports ? state.auth.profile.favorite_sports : [],
    favoriteCompetitors: state.auth.profile.favorite_competitors ? state.auth.profile.favorite_competitors : []
  }
};

export default connect(mapStateToProps, {setFavorites})(FavoriteSportsScreen);
