import React from 'react';
import { connect } from 'react-redux';
import { getAllSports, getFavoriteSports } from '../actions/sports';
import SportList from '../components/SpotComponents/SportList';

import { View, Text } from 'react-native';

class SportScreen extends React.Component {

    componentDidMount() {

        this.props.dispatch(getAllSports());
        this.handleItemPress = this.handleItemPress.bind(this);

    }
    handleItemPress(item) {

        this.props.navigation.navigate('Competitions', { sport: item});
    }
    render() {

        const { sports } = this.props;

        return (
            <View >
                <Text style={{alignSelf: 'center', marginTop:16, marginBottom: 16, fontSize: 20}}>Seleziona lo sport che vuoi seguire</Text>
            <SportList sports={sports} onItemPress={this.handleItemPress} />
            </View>

        )
    }
}





const mapStateToProps = state => {
    return({
        sports: state.entities.sports,
        loggedIn: state.auth.loggedIn
    })
};

export default connect(mapStateToProps)(SportScreen)