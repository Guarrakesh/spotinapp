import React from 'react';

import SportCard from './SportCard';
import {View, StyleSheet, Dimensions, Image} from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid';
import Images from '../../assets/images';
import PropTypes from 'prop-types';
import Helpers from '../../helpers';


const SportList = (props) => {

    if (props.sports.length <= 0) {
        return null;
    }

    const rows = [...Array(Math.ceil(props.sports.length / 3))];
    const sportRows = rows.map( (row, idx)  => {
        return props.sports.slice(idx * 3, idx * 3 + 3);
    });


    const content = sportRows.map((row, idx) => (
       <Row style={{height:150}} key={idx}>{

           row.map(sport => <Col>
               <SportCard key={sport._id} onPress={() => props.onItemPress(sport)}
                   icon={<Image source={Images.icons.sports[Helpers.sportSlugIconMap(sport.slug)]} style={{width: 72, height: 72}}/>}
                   {...sport}/></Col>)
       }</Row>
    ));


    return (
        <Grid>
            {content}
        </Grid>);

};

SportList.propTypes = {
    onItemPress: PropTypes.func.isRequired,
    sports: PropTypes.array.isRequired
};
const styles = StyleSheet.create({

});

export default SportList;
