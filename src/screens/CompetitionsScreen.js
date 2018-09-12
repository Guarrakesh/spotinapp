import React from 'react';
import { connect } from 'react-redux';
import {Text, ActivityIndicator, ScrollView, View} from 'react-native';
import CompetitionList from '../components/SpotComponents/CompetitionList';
import { getSportCompetitionsRequest } from '../actions/sports';
import themes from '../styleTheme';

class CompetitionsScreen extends React.Component {

  constructor() {
    super();

    this.handleItemPress = this.handleItemPress.bind(this);
  }
  componentDidMount() {

    const { sport } = this.props.navigation.state.params;
    if (sport && !sport.competitions)
      this.props.dispatch(getSportCompetitionsRequest(sport));
  }

  handleItemPress(item) {
    this.props.navigation.navigate('Events', {competition: item});

  }
  render() {
    const { sport } = this.props.navigation.state.params;
    const { currentlySending } = this.props;

    while(currentlySending){
      return(
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color={themes.base.colors.accent.default} />
        </View>
      )
    }

    if (!sport.competitions || sport.competitions.length === 0){
      return (
        <Text style={{alignSelf: 'center', marginTop:16, marginBottom: 16, fontSize: 20}}>Non ci sono competizioni</Text>
      )
    }

    return (

      <ScrollView>
        <Text style={{alignSelf: 'center', marginTop:16, marginBottom: 16, fontSize: 20}}>Seleziona la competizione</Text>
        <CompetitionList competitions={sport.competitions} onItemPress={this.handleItemPress}/>
      </ScrollView>
    );

  }
}

const mapStateToProps = (state) => {
  return ({
    entities: state.entities,
    currentlySending: state.entities.currentlySending

  })
};

export default connect(mapStateToProps)(CompetitionsScreen);