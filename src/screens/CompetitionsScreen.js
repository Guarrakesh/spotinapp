import React from 'react';

import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import { getSportCompetitionsRequest } from '../actions/sports';

class CompetitionsScreen extends React.Component {

    componentDidMount() {
        const { sport } = this.props.navigation.state.params;

        this.props.dispatch(getSportCompetitionsRequest(sport));
    }
    render() {
        const { sport } = this.props.navigation.state.params;
        if (!sport.competitions)
            return null;
        return (

            <View style={{marginTop: 100, justifyContent: 'center', alignItems: 'center'}}>
                <Text>
                    `Ci sono {sport.competitions.length} competizioni`
                </Text>
                {

                    sport.competitions.map(comp => <Text>
                            {comp.name}
                        </Text>
                    )


                }
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