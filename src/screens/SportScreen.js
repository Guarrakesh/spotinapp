import React from 'react';
import { connect } from 'react-redux';
import { getAllSports, getFavoriteSports } from '../actions/sports';
import SportList from '../components/SpotComponents/SportList';
import PropTypes from 'prop-types';

import { View, Text } from 'react-native';

class SportScreen extends React.Component {

    constructor() {
        super();
        this.handleItemPress = this.handleItemPress.bind(this);
    }

    componentDidMount() {

        const { sports } = this.props;

        //Chiamata condizionata solo se sport non e' presente nello stato redux

        if(!sports || sports.length === 0){
            this.props.dispatch(getAllSports());
        }



    }
    handleItemPress(item) {

        this.props.navigation.navigate('Competitions', {sport: item});
    }
    render() {

        const { sports } = this.props;


        if(!sports || sports.length === 0) return null;

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