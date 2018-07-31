import React from 'react';

import { connect } from 'react-redux';
import { Text, View } from 'react-native';

import { getEventsRequest } from '../actions/events';
import EventNewsCard from '../components/NewsComponents/EventNewsCard';

class EventScreen extends React.Component {

    constructor() {
        super();

        this.handleItemPress = this.handleItemPress.bind(this);
    }
    componentDidMount() {

        const { competition } = this.props.navigation.state.params;
        let events = this.props.events;
        if (competition && events.length === 0)
            this.props.dispatch(getEventsRequest(competition._id));

    }

    handleItemPress(item) {
        //this.props.navigation.navigate('Events', {competition: item});

    }
    render() {
        const { competition } = this.props.navigation.state.params;
        const { events, currentlySending } = this.props;

        let filteredEvents = events.filter(event => event.competition._id == competition._id);

        if (!competition || filteredEvents.length === 0)
            return null;

        return (

                <EventNewsCard/>

        )


    }
}

const mapStateToProps = (state) => {
    const { events, currentlySending, error} = state.entities;
    return {
        events, currentlySending, error
    }

};
export default connect(mapStateToProps)(EventScreen);