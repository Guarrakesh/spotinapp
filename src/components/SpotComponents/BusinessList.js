import React from 'react';

import BusinessCard from './BusinessCard';
import {View, StyleSheet, Dimensions, Image, ScrollView} from 'react-native';

import Images from '../../assets/images';
import PropTypes from 'prop-types';


const BusinessList = (props) => {


    const { businesses } = props;

    if (businesses.length <= 0) {
        return null;
    }

    const businessList = businesses.map((bus) =>

        <BusinessCard
            key={bus._id}
            onPress={() => props.onItemPress(bus)}
            {...bus}
        />

    );

    return (
        <ScrollView>
            <View style={styles.container}>
                {businessList}
            </View>
        </ScrollView>
    );

};

BusinessList.propTypes = {
    onItemPress: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
    container: {


        alignItems: 'stretch',
        padding: 8,
    }
});

export default BusinessList;
