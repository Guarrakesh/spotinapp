import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ListController from '../../controllers/ListController';
import {Text, ActivityIndicator, ScrollView, View} from 'react-native';
import CompetitionList from '../../components/SpotComponents/CompetitionList';

import { InteractionManager } from 'react-native';


class CompetitionsScreen extends React.Component {

  constructor() {
    super();
    this.handleItemPress = this.handleItemPress.bind(this);
  }

  handleItemPress(competitionId, name) {

    this.props.navigation.navigate('Events', {competitionId, title: name});
  }


  render() {
    const { sportId } = this.props.navigation.state.params;


    return (
        <ListController
            id={`${sportId}_competition_list`}
            resource="competitions"
            perPage={100}
            filter={{sport: sportId}}
        >
          { controllerProps => <CompetitionList onItemPress={this.handleItemPress} { ...controllerProps}/> }

        </ListController>
    );

  }
}

CompetitionsScreen.propTypes = {
  navigation: PropTypes.object,
};


export default CompetitionsScreen;
