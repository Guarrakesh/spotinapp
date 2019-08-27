import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ListController from '../../controllers/ListController';
import CompetitionList from '../../components/SpotComponents/CompetitionList';
import { entityView } from "../../actions/view";

import {InteractionManager, Linking} from 'react-native';


class CompetitionsScreen extends React.Component {

  constructor() {
    super();
    this.handleItemPress = this.handleItemPress.bind(this);
    this.handleContactUsPress = this.handleContactUsPress.bind(this);
  }

  handleItemPress(competitionId, name) {
  this.props.entityView('competition', competitionId);
    this.props.navigation.navigate('Events', {competitionId, title: name});
  }

  handleContactUsPress() {
    const sportName = this.props.navigation.state.params.title;
    Linking.openURL(`https://wa.me/+393512486394?text=Ciao,%20non%20riesco%20a%20trovare%20un%20evento%20di%20${sportName},%20potete%20aiutarmi?`);
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
        { controllerProps => <CompetitionList onContactUsPress={this.handleContactUsPress} onItemPress={this.handleItemPress} { ...controllerProps}/> }

      </ListController>
    );

  }
}

CompetitionsScreen.propTypes = {
  navigation: PropTypes.object,
};


export default connect(null, {
  entityView
})(CompetitionsScreen);

