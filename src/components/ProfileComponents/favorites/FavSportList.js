import React from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {View, ScrollView, Image, ActivityIndicator } from 'react-native'
import { withNamespaces } from 'react-i18next';

import { Typography } from '../../common';
import FavSportCard from './FavSportCard';
import Images from '../../../assets/images';
import PropTypes from 'prop-types';
import Helpers from '../../../helpers';
import themes from '../../../styleTheme';
import * as Animatable from 'react-native-animatable';

const FavSportList = ({
                        ids,
                        data,
                        onItemPress,
                        favCompetitors,
                        favSports,
                        isLoading,
                        total,
                        version,
                        t
                      }) => {

  if (isLoading) {
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={themes.base.colors.activityIndicator.default} />
      </View>
    );
  }


  if (ids.length === 0) {
    return null;
  }

  const rows = [...Array(Math.ceil(ids.length / 3))];
  const sportRows = rows.map( (row, idx)  => {
    return ids.slice(idx * 3, idx * 3 + 3);
  });

  const isSelected = (sportId) => {
    for(let sport of favSports){
      if(sport._id === sportId){
        return true;
      }
    }
    return false;
  };

  const content = sportRows.map((row, idx) => (
    <Row style={{height:150}} key={idx}>{

      row.map((id, index) => <Col>
        {data[id].active ?
          <FavSportCard
              index={index + idx*index}
              key={id} onPress={() => onItemPress(id, data[id].name, data[id].has_competitors)}
                        isSelected={isSelected(data[id]._id)}
                        icon={<Image source={Images.icons.sports[Helpers.sportSlugIconMap(data[id].slug)]} style={{width: 72, height: 72}}/>}
                        {...data[id]}/> : null
        }</Col>)
    }</Row>
  ));


  return (
    <ScrollView>
      <Typography
        style={{margin: 8, color: '000',fontWeight: '900'}}
        align="center"
        uppercase
         gutterBottom>{t("profile.settings.favorite.selectFavoriteSports")}
      </Typography>
      <Grid>
        {content}
      </Grid>
    </ScrollView>
  );

};

FavSportList.propTypes = {

  onItemPress: PropTypes.func.isRequired,

  // Controller props
  data: PropTypes.object,
  ids: PropTypes.object,
  isLoading: PropTypes.bool,
  total: PropTypes.number,
  version: PropTypes.number,

};


export default withNamespaces()(FavSportList);
