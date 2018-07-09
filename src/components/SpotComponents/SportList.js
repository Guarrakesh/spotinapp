import React from 'react';

import SportItem from './SportItem';
import {View, StyleSheet, Dimensions} from 'react-native'
import { Col, Row, Grid } from 'react-native-easy-grid';


const sportSlugIconMap = (slug) => {
    const map = {
        'football': 'soccer',
        'tennis': 'tennis',
        'basket': 'basket',
        'baseball': 'baseball',
        'swimming': 'pool',
        'american-football': 'football-helmet'
    };

    return map[slug] || null;

};
const SportList = (props) => {

    const rows = [...Array(Math.ceil(props.sports.length / 3))];
    const sportRows = rows.map( (row, idx) => {
        return props.sports.slice(idx * 3, idx * 3 + 3);
    });

    const content = sportRows.map((row, idx) => (
       <Row style={{height:150}} key={idx}>{
           row.map(sport => <Col>
               <SportItem key={sport._id}
                   iconName={sportSlugIconMap(sport.slug)}
                   {...sport}/></Col>)
       }</Row>
    ));


    return (
        <Grid>
            {content}
        </Grid>);

};


const styles = StyleSheet.create({

});

export default SportList;
