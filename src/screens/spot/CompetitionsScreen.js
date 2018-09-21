import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import {Text, ActivityIndicator, ScrollView, View} from 'react-native';
import CompetitionList from '../../components/SpotComponents/CompetitionList';
import { getSportCompetitionsRequest } from '../../actions/sports';
import themes from '../../styleTheme';
import { InteractionManager } from 'react-native';


class CompetitionsScreen extends React.Component {

  state = { didFinishTransition: false };

  constructor() {
    super();

    this.handleItemPress = this.handleItemPress.bind(this);
  }

  componentDidMount() {

    InteractionManager.runAfterInteractions(() => {

      const { sport } = this.props.navigation.state.params;
      this.setState({didFinishTransition: true});

      if (sport && !sport.competitions)
        this.props.getCompetitions(sport);
    });

  }

  handleItemPress(item) {
    InteractionManager.runAfterInteractions(() => {
      this.props.navigation.navigate('Events', {competition: item});
    });
  }

  render() {
    const { sport } = this.props.navigation.state.params;
    const { currentlySending, getCompetitions } = this.props;

    if (currentlySending){
      return(
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={themes.base.colors.accent.default} />
        </View>
      )
    }

    if (!sport.competitions || sport.competitions.length === 0){
      return (
        <Text style={{alignSelf: 'center', marginTop:16, marginBottom: 16, fontSize: 20}}>Non ci sono competizioni al momento</Text>
      )
    }

    return (

      <View>

        <CompetitionList
          onRefresh={() => getCompetitions(sport)}
          refreshing={currentlySending}
          competitions={sport.competitions} onItemPress={this.handleItemPress}/>
      </View>
    );

  }
}

CompetitionsScreen.propTypes = {
  entities: PropTypes.object,
  currentlySending: PropTypes.bool,
  getCompetitions: PropTypes.func
};
const mapStateToProps = (state) => {
  return ({
    entities: state.entities,
    currentlySending: state.entities.currentlySending

  })
};

export default connect(mapStateToProps, { getCompetitions: getSportCompetitionsRequest })
(CompetitionsScreen);