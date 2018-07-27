import React from 'react';

import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import { getSportCompetitionsRequest } from '../actions/sports';

class EventScreen extends React.Component {

    constructor() {
        super();

        this.handleItemPress = this.handleItemPress.bind(this);
    }
    componentDidMount() {

        //const { sport } = this.props.navigation.state.params;
     //   if (sport && !sport.competitions)
           // this.props.dispatch(getSportCompetitionsRequest(sport));
    }

    handleItemPress(item) {
        //this.props.navigation.navigate('Events', {competition: item});

    }
    render() {
        // const { sport } = this.props.navigation.state.params;
        //
        // if (!sport || !sport.competitions)
        //     return null;
        //
        // return (
        //
        //     <View>
        //         <Text style={{alignSelf: 'center', marginTop:16, marginBottom: 16, fontSize: 20}}>Seleziona la competizione</Text>
        //         <CompetitionList competitions={sport.competitions} onItemPress={this.handleItemPress}/>
        //     </View>
        // );

     return <Text>ciao nana'</Text>
    }
}

const mapStateToProps = (state) => {
    return {
        entities: state.entities
    }
};
export default connect(mapStateToProps)(EventScreen);