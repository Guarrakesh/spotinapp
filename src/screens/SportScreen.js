import React from 'react';
import { connect } from 'react-redux';
import { getAllSports, getFavoriteSports } from '../actions/sports';
import SportList from '../components/SpotComponents/SportList';
import PropTypes from 'prop-types';

import { View, Text, ActivityIndicator , InteractionManager } from 'react-native';
import { getLocationRequest } from "../actions/location";


import themes from '../styleTheme';

class SportScreen extends React.Component {

  state = { didFinishTransition: false };

  constructor() {
    super();
    this.handleItemPress = this.handleItemPress.bind(this);
  }

  componentDidMount() {

    InteractionManager.runAfterInteractions(() => {

      const { sports } = this.props;
      this.setState({didFinishTransition: true});
      //Chiamata condizionata solo se sport non e' presente nello stato redux

      if(!sports || sports.length === 0){
        this.props.dispatch(getAllSports());
      }

      this.props.dispatch(getLocationRequest());
    });


  }

  handleItemPress(item) {

    InteractionManager.runAfterInteractions(() => {
      this.props.navigation.navigate('Competitions', {sport: item});
    });

  }

  render() {

    const { sports } = this.props;
    const { currentlySending } = this.props;


    if(currentlySending){
      return(
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={themes.base.colors.accent.default} />
        </View>
      )
    }

    if(!sports || sports.length === 0){
      return (
        <Text style={{alignSelf: 'center', marginTop:16, marginBottom: 16, fontSize: 20}}>Non ci sono sport al momento</Text>
      )
    }

    return (
      <View >
        <Text style={{alignSelf: 'center', marginTop:16, marginBottom: 16, fontSize: 20}}>Seleziona lo sport che vuoi seguire</Text>
        <SportList sports={sports} onItemPress={this.handleItemPress}/>
      </View>

    )
  }
}

SportScreen.propTypes = {
  currentlySending: PropTypes.bool,
  sports: PropTypes.array.isRequired,
  loggedIn: PropTypes.bool
};

const mapStateToProps = state => {
  return({
    currentlySending: state.entities.currentlySending,
    sports: state.entities.sports,
    loggedIn: state.auth.loggedIn
  })
}

export default connect(mapStateToProps)(SportScreen)