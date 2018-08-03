

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
        image_versions

    } = props;
    let imageUrl;
    if (image_versions && image_versions.length > 0) {
        //Prendo la prima versione dell'immagine (fullwidth)
        imageUrl = image_versions[0].url;

    }

    return (
        <TouchableOpacity onPress={props.onPress}>
            <View elevation={1} style={styles.container}>

                <View style={styles.image}>
                        { imageUrl ? <Image resizeMode={'contain'} source={{uri: imageUrl, width: 42, height: 43}}/> : <Icon name="sports-club" size={42}/> }

                </View>
                <View style={styles.info}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.country}>{country}</Text>
                    { week_events.length > 0 && <Text style={styles.extra}>{week_events.length} eventi questa settimana </Text> }

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
        width: 64,
        marginLeft: 16,
        marginRight: 16,
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


