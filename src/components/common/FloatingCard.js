import React from 'react';

import {Card as NativeCard} from 'react-native-elements';
import View from '../common/View';
import { Text, TouchableOpacity } from 'react-native';
import themes from '../../styleTheme';

const FloatingCard = (props) => {
    return (

        <TouchableOpacity style={[
            styles.card,
            props.containerStyle && props.containerStyle
            ]}
                          onPress={props.onPress}
        >
            <View style={[
                styles.contentStyle,
                props.contentStyle && props.contentStyle
            ]}>
                {props.children}
            </View>


            <View style={[
                styles.footStyle,
                props.footStyle && props.footStyle]}
            >
                <Text style={[
                    styles.footTitleStyle,
                    props.footTitleStyle && props.footTitleStyle]}
                >
                    {props.footContent}
                </Text>
            </View>
        </TouchableOpacity>

    )
}

const styles = {
    card: {
        margin: 8,

        backgroundColor: '#fff',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.1,
        borderWidth: 0,
        borderRadius: 4,
        flex: 1,

    },
    footStyle: {
        flexGrow: 2 ,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        width: '100%',
        alignItems: 'stretch'
    },
    contentStyle: {
        paddingTop: 15, paddingLeft: 15, paddingRight: 15,
        flexGrow: 1,
    }

}



export default FloatingCard;
