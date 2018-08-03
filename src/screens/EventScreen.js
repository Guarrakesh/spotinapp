import React from 'react';

import { connect } from 'react-redux';
import { Text, ScrollView, StyleSheet} from 'react-native';

import { getEventsRequest } from '../actions/events';
import EventList from '../components/SpotComponents/EventList';

class EventScreen extends React.Component {

    constructor() {
        super();

        this.handleEventPress = this.handleEventPress.bind(this);
        this.handleEventFavoritePress = this.handleEventFavoritePress.bind(this);
    }
    componentDidMount() {

        const { competition } = this.props.navigation.state.params;
        let events = this.props.events.filter(event => event.competition._id == competition._id);

        //Ora events ha solo eventi della competizione attuale
        if (competition && events.length === 0)
            this.props.dispatch(getEventsRequest(competition._id));

    }

    handleEventPress(item) {
        //this.props.navigation.navigate('Events', {competition: item});

    }
    handleEventFavoritePress(event) {
        //Se l'utente non è loggato, rimanda alla schermata login
        if (!this.props.loggedIn)
            this.props.navigation.navigate('Auth');
    }
    render() {
        const { competition } = this.props.navigation.state.params;
        const { events, currentlySending } = this.props;

        let filteredEvents = events.filter(event => event.competition._id == competition._id);

        if (!competition || filteredEvents.length === 0)
            return null;

        return (
            <ScrollView>
              <EventList events={filteredEvents} onItemPress={this.handleEventPress} onFavoritePress={this.handleEventFavoritePress}/>
            </ScrollView>

        )


    }
}

const mapStateToProps = (state) => {
    const { events, currentlySending, error} = state.entities;
    const { loggedIn } = state.auth;
    return {
        events, currentlySending, error, loggedIn
    }

};
export default connect(mapStateToProps)(EventScreen);
