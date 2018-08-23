import React from 'react';
import { TouchableOpacity, Image, Text, Dimensions, StyleSheet} from 'react-native';
import View from '../common/View';
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

        competitorsComponent = competitors.map(comp => {
            console.log(comp)
            return <View style={styles.competitors}>

                { (comp.image_versions && comp.image_versions.length > 0) ? <Image source={{uri: comp.image_versions[0].url, width: 36, height: 36}} resizeMethod={'contain'}/> : <Icon name="sports-club" size={36}/> }

            </View>
        });




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

        <View elevation={1} style={styles.containerStyle}>

            <TouchableOpacity style={styles.favorite} onPress={props.onFavoritePress}>

                {props.isFavorite ?   <Icon name="heart" size={24} color={colors.accent.default}/> :  <Icon name="heart-outlined" size={24} color={colors.accent.default}/>}


            </TouchableOpacity>

            <View style={styles.competitorsLogosContainer}>
                {competitorsComponent}
            </View>
            <TouchableOpacity style={styles.eventInfo} onPress={props.onPress}>


                <View style={styles.detailContainer}>
                    <Text style={{fontSize: 21}}>{props.name}</Text>
                    <Text style={{fontSize: 14, color: colors.accent.default}}># Numero Locali </Text>
                    <Text style={{fontSize: 14, fontWeight: '200'}}>{dayString} - {timeString} </Text>

                </View>
            </TouchableOpacity>
        </View>

    );
}
const styles = {
    containerStyle: {
        marginTop: 10,


        borderRadius: 8,
        borderColor: '#33CC33',

        flexDirection: 'row',
        justifyContent: 'flex-start',
        height: 116,

        backgroundColor: colors.white.default,
        //shadowOpacity: 1
    },
    favorite: {
        borderRightColor: colors.text.light,
        borderRightWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,

        flexGrow: 0,
        flexBasis: 63,
        paddingBottom: 16
    },
    eventInfo: {
        flexGrow: 3,
    },
    competitorsLogosContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        flexGrow: 0,
        flexBasis: 54,
        paddingTop: 16

    },
    competitors: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 8,

    },
    detailContainer: {

        paddingTop: 24,
        paddingLeft: 16,
        //justifyContent: 'center',

        flexDirection: 'column',





    },

};


export default EventCard;
