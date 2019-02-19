import React from "react";
import {View} from "react-native";
import CompetitorsList from "../../components/ProfileComponents/favorites/CompetitorsList";
import connect from "react-redux/es/connect/connect";
import ListController from "../../controllers/ListController";
import {SearchBar} from "../../components/common";
import i18n from "../../i18n/i18n";

class FavoriteCompetitorsScreen extends React.Component {

  constructor(){
    super();
    this.handleItemPress = this.handleItemPress.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);

    this.state = {
      currentSport: "",
      isFirstMount: true,
      currentSearchValue: "",
      favCompetitors: []
    }
  }

  componentDidMount(){
    const { sportId, favCompetitors } = this.props.navigation.state.params;
    this.setState({currentSport: sportId, favCompetitors: favCompetitors});
  }

  competitorIsFav(competitorId){  //Controlla se un competitor è gia' tra i preferiti
    for(let compId of this.state.favCompetitors){
      if( compId._id === competitorId ){
        return true
      }
    }
    return false
  }

  deleteFromFav(competitorId){  //Elimina un competitor dai preferiti
    let filteredCompetitors = this.state.favCompetitors.filter(function(item) {
      return item._id !== competitorId
    });
    this.setState({favCompetitors: filteredCompetitors});
  }

  addToFav(competitorId, competitorName){
    const favToAdd = { _id: competitorId, name: competitorName, sport: this.state.currentSport };
    const newFav = this.state.favCompetitors.concat([favToAdd]);
    this.setState({favCompetitors: newFav});
  }

  handleItemPress(competitorId, competitorName) {

    if(this.competitorIsFav(competitorId)){
      //Eliminalo
      this.deleteFromFav(competitorId);
    }
    else{
      //Aggiungilo
      this.addToFav(competitorId, competitorName);
    }
  }

  handleConfirm() {

    this.props.navigation.navigate("FavoriteSportsScreen", { favCompetitors: this.state.favCompetitors });

  }


  cleanFilter(controllerProps){
    controllerProps.setFilters({q: undefined});
    this.setState({isFirstMount: false})
  }

  render(){
    const { sportId } = this.props.navigation.state.params;

    return(

      <ListController
        unauthorized
        id={`${sportId}_favorite_list`}
        resource={"competitors"}
        perPage={15}
        filter={{isPerson: false, sport: sportId}}
        sort={{field: 'appealValue', order: 'asc'}}
      >
        {controllerProps => {
          {this.state.isFirstMount ? this.cleanFilter(controllerProps) : null}
          return(
            <View style={{flex:1}}>
              <SearchBar
                placeholder={i18n.t("profile.settings.favorite.searchTeam")}
                showLoading={controllerProps.isLoading}
                onChangeText={(text) => { this.setState({currentSearchValue: text}); controllerProps.setFilters({q: text})}}
                onClear={() => this.cleanFilter(controllerProps)}
                value={this.state.currentSearchValue}
                allowFontScaling={false}
              />
              <CompetitorsList
                onItemPress={this.handleItemPress}
                currentSport={this.state.currentSport}
                selectedComp={this.state.favCompetitors}
                onConfirmPress={this.handleConfirm}
                {...controllerProps}/>
            </View>
          )
        }}
      </ListController>

    )
  }
}

const mapStateToProps = (state) => {
  return ({
    //favoriteSports: state.auth.profile ? state.auth.profile.favorite_sports : undefined,
    //favoriteCompetitors: state.auth.profile ? state.auth.profile.favorite_competitors : undefined
  });
};

export default connect(mapStateToProps)(FavoriteCompetitorsScreen);