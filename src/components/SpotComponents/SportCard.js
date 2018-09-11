

import React from 'react';

import  FloatingCard  from '../common/FloatingCard';
import { Text, StyleSheet } from 'react-native';
import themes from '../../styleTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Fonts} from "../common/Fonts";

const SportCard = (props) => {

  return (

    <FloatingCard
      onPress={props.onPress}
      contentStyle={styles.cardContent}
      footContent={props.name}
      footStyle={styles.cardFooter}
      footTitleStyle={{
        color: themes.base.colors.white.default,
        fontSize: 18,
        fontFamily: Fonts.LatoBold,
      }}
    >
      {props.icon}

    </FloatingCard>
  );
};

const styles = StyleSheet.create({

  cardFooter: {

    backgroundColor: themes.base.colors.accent.default,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {

    justifyContent: 'center',
    alignItems:'center'
  }
})

export default SportCard;


