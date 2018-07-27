import React from 'react';

import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import CompetitionList from '../components/SpotComponents/CompetitionList';
import { getSportCompetitionsRequest } from '../actions/sports';

class CompetitionsScreen extends React.Component {

    constructor() {
        super();

        this.handleItemPress = this.handleItemPress.bind(this);
    }
    componentDidMount() {

        const { sport } = this.props.navigation.state.params;

        this.props.dispatch(getSportCompetitionsRequest(sport));
    }

    handleItemPress(item) {
        this.props.navigation.navigate('Events', {competition: item});

    }
    render() {
        const { sport } = this.props.navigation.state.params;

        if (!sport || !sport.competitions)
            return null;

        return (

            <View>
                <Text style={{alignSelf: 'center', marginTop:16, marginBottom: 16, fontSize: 20}}>Seleziona la competizione</Text>
                <CompetitionList competitions={sport.competitions} onItemPress={this.handleItemPress}/>
            </View>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        entities: state.entities
    }
};
export default connect(mapStateToProps)(CompetitionsScreen);