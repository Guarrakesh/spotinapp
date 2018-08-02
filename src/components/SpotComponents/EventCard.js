import React from 'react';
import { View, TouchableOpacity, Image, Text, Dimensions, StyleSheet} from 'react-native';
import themes from '../../styleTheme';
import Icon from 'react-native-vector-icons/Entypo';
const colors = themes.base.colors
//const screenwidth = Dimensions.get('window').width;
//const screeheight = Dimensions.get('window').height;


/*let eventExample: {

 "_id": "5b340827151128db331b7091",
 "isFavorite": true,
 "sport": {
 "_id": "5b33f4f1e0cc7477e26f795f",
 "name": "Calcio",

 "slug": "football",

 },
 "competition": {
 "_id": "5b340126e0cc7477e26f7d9a",
 "name": "Serie A",
 image_url: "https://upload.wikimedia.org/wikipedia/it/thumb/b/b9/Wimbledon.svg/1024px-Wimbledon.svg.png",
 },

 "name": "Napoli - Juventus",
 "description": "La partita dell'anno",
 "start_at": "2016-05-18T16:00:00.000Z",
 "competitorHasLogo": true,
 "competitors": [
 {
 "name": "Federer",
 "_id": "5b340717151128db331b708f",
 "image_versions": [
 {
 "url": "http://example.com",
 "width" : 780,
 "height": 500
 }
 ]
 },
 {
 "name": "Nadal",
 "_id": "5b3407e4e0cc7477e26f7fbd"
 }
 ]
 }
 */


const EventCard = (props) => {

    let imageUrl;
    let competitors = props.competitors;
    if (!props.competitorHasLogo || props.competitorHasLogo) {
        competitorsComponent =
            <View style={styles.competitors}>
                { competitors[0].image_url ? <Image source={{uri: competitors[0].image_url}}/> : <Icon name="sports-club" size={36}/> }
                { competitors[1].image_url ? <Image source={{uri: competitors[1].image_url}}/> : <Icon name="sports-club" size={36}/> }
            </View>
    } else {
        competitorsComponent =
            <View style={{marginTop: 32}}>
                { props.competition.image_url ? <Image source={{uri: offer.event.competition.image_url}} style={{width: 36, height: 36}}/>
                    : <Icon name="sports-club" size={36}/> }
            </View>
    }
    let date = new Date(props.start_at);
    let dayString, timeString;
    if (date) {

        dayString = `${date.getDay()} ${date.toLocaleString('it-IT', { month: 'short'}).toString().toLocaleUpperCase()}`
        timeString = `${date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}`;
    }

    return (
        <TouchableOpacity onPress={props.onPress}>
            <View style={styles.containerStyle}>
                <View style={styles.favorite}>

                    {props.isFavorite ?   <Icon name="heart" size={24}/> :  <Icon name="heart-outlined" size={24}/>}


                </View>
                <View style={styles.teamLogosContainer}>
                    {competitorsComponent}
                </View>

                <View style={styles.detailContainer}>
                    <Text style={{fontSize: 21}}>{props.name}</Text>
                    <Text style={{fontSize: 14, color: colors.primary.default}}># Numero Locali </Text>
                    <Text style={{fontSize: 16, fontWeight: '100'}}>{timeString}</Text>
                </View>

            </View>
        </TouchableOpacity>
    );
}
const styles = {
    containerStyle: {
        marginTop: 10,
        marginLeft: 8,
        marginRight: 8,
        borderRadius: 8,
        borderColor: '#33CC33',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
        height: 116,
        width: '100%',
        backgroundColor: 'white',
        //shadowOpacity: 1
    },
    favorite: {
        borderRightColor: colors.text.light,
        borderRightWidth: 1,


        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
        width: 62,
        paddingBottom: 16
    },
    competitorsLogosContainer: {
        alignItems: 'center',
        flexDirection: 'column',

    },
    competitors: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        paddingTop: 16,
    },
    detailContainer: {
        paddingTop: 16,
        paddingLeft: 16,
        //justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',

        flexGrow: 2
    },

};


export default EventCard;
