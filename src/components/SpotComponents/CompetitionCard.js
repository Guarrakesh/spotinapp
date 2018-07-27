

import React from 'react';

import View from '../common/View';
import { Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import PropTypes from 'prop-types';
import themes from '../../styleTheme';
import Icon from 'react-native-vector-icons/Entypo';
const CompetitionCard = (props) => {

    const {
        sport_id,
        name,
        country,
        week_events,
        image_url

    } = props;

    return (
        <TouchableOpacity onPress={props.onPress}>
            <View elevation={1} style={styles.container}>

                <View style={styles.image}>
                        { props.image_url ? <Image source={props.image_url}/> : <Icon name="sports-club" size={42}/> }
                        <Text>aasssssssasaa</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.country}>{country}</Text>
                    { week_events.length > 0 ? <Text style={styles.extra}>{week_events.length} eventi questa settimana </Text> : ""}

                </View>


            </View>
        </TouchableOpacity>

    );
};


CompetitionCard.propTypes = {
    onPress: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    week_events: PropTypes.array
};
const styles = StyleSheet.create({

    image: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 20,
        color: themes.base.colors.text.default
    },
    country: {
        fontWeight: '300',
        fontSize: 14,
    },
    extra: {
        fontWeight: '700',
        color: themes.base.colors.accent.default
    },
    info: {
        paddingTop: 25,
        paddingBottom: 25,
        flexDirection: 'column',
        flexGrow: 2,

    },
    container: {
        width: '100%',
        backgroundColor: themes.base.colors.white.default,
        height: 112,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
        borderRadius: themes.base.borderRadius

    }
})

export default CompetitionCard;


