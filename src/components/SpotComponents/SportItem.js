

import React from 'react';

import  FloatingCard  from '../common/FloatingCard';
import { Text, StyleSheet } from 'react-native';
import themes from '../../styleTheme';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const SportItem = (props) => {

    return (

       <FloatingCard
            contentStyle={styles.cardContent}
            footContent={props.name}
            footStyle={styles.cardFooter}
            footTitleStyle={{
                color: themes.base.colors.white.default,
                fontWeight: 'bold',
                }}
       >
           <Icon name={props.iconName}
                 size={64} color={themes.base.colors.text.default}
                 style={{padding:3}}

           />
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

export default SportItem;


