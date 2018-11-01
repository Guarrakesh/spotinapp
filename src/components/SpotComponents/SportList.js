import React from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {View, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native'
import { withNamespaces } from 'react-i18next';

import { Typography } from '../common';
import SportCard from './SportCard';
import Images from '../../assets/images';
import PropTypes from 'prop-types';
import Helpers from '../../helpers';
import themes from '../../styleTheme';


const SportList = ({
    ids,
    data,
    onItemPress,
    isLoading,
    total,
    version,
    t
}) => {

  if (isLoading) {
    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color={themes.base.colors.accent.default} />
    </View>
  }


  if (ids.length === 0) {
    return null;
  }

  const rows = [...Array(Math.ceil(ids.length / 3))];
  const sportRows = rows.map( (row, idx)  => {
    return ids.slice(idx * 3, idx * 3 + 3);
  });


  const content = sportRows.map((row, idx) => (
      <Row style={{height:150}} key={idx}>{

        row.map(id => <Col>
          {data[id].active ?
            <SportCard key={id} onPress={() => onItemPress(id, data[id].name)}
                     icon={<Image source={Images.icons.sports[Helpers.sportSlugIconMap(data[id].slug)]} style={{width: 72, height: 72}}/>}
                     {...data[id]}/> : null
          }</Col>)
      }</Row>
  ));


  return (
      <ScrollView>
        <Typography
            style={{margin: 8}}
            variant="heading"  gutterBottom>{t("browse.selectSport")}</Typography>
        <Grid>
          {content}
        </Grid>
      </ScrollView>
  );

};

SportList.propTypes = {

  onItemPress: PropTypes.func.isRequired,

  // Controller props
  data: PropTypes.object,
  ids: PropTypes.object,
  isLoading: PropTypes.bool,
  total: PropTypes.number,
  version: PropTypes.number,

};


export default withNamespaces()(SportList);
