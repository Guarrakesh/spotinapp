import React from 'react';
import BroadcastCardInProfile from './BroadcastCardInProfile';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const BroadcastInProfileList = (props) => {

    const { events } = props;

    const broadcastList = events.map(event =>

        <BroadcastCardInProfile
            key={event._id}
            event={event}
        />

    )

    return (
        <View>
            {broadcastList}
        </View>
    );
};

export default BroadcastInProfileList;