import React from 'react';
import { StyleSheet } from 'react-native';

import  FloatingCard  from '../common/FloatingCard';
import themes from '../../styleTheme';
import {Fonts} from "../common/Fonts";

const SportCard = (props) => {

  return (

    <FloatingCard
      onPress={props.onPress}
      contentStyle={styles.cardContent}
      containerStyle={styles.container}
      footContent={props.name}
      footStyle={styles.cardFooter}
      footTitleStyle={{
        color: themes.base.colors.accent.default,
        fontSize: 16,
        fontFamily: Fonts.LatoBold,
      }}
    >
      {props.icon}

    </FloatingCard>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },

  cardFooter: {
    alignSelf: 'center',
    borderTopWidth: 1,
    borderColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardContent: {
    paddingBottom: 8,
    justifyContent: 'center',
    alignItems:'center'
  }
});

export default SportCard;


