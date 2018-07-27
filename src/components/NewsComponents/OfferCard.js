import React from 'react';
import { Dimensions, TouchableOpacity, Image, Text, ImageBackground} from 'react-native';
import View from '../common/View';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
// import HeaderNewsCard from './HeaderNewsCard';
import Themes from '../../styleTheme';
import Images from '../../assets/images';
import EventNewsCard from './EventNewsCard';


import Helpers from '../../helpers';
let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;



let offer = {
    name: "Birra e pizza",
    type: 0, //prezzo fisso
    value: '10',
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac urna elementum, euismod ligula eget, malesuada justo. In elementum lorem ligula, at pulvinar dolor congue a.",
    event: {

        "_id": "5b340827151128db331b7091",

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
                "_id": "5b340717151128db331b708f"
            },
            {
                "name": "Nadal",
                "_id": "5b3407e4e0cc7477e26f7fbd"
            }
        ]
    },
    image_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-noSi8mWboJzpp1oXkaDH539KdqV6raeZUlyN5J-Vd3ovLXta",


};


const OfferCard = () => {
    return (

        <View elevation={1} style={styles.container}>

            <View style={styles.imageStyle}>
                <ImageBackground
                    source={offer.image_url ? {uri: offer.image_url} : require('./newsimages/NewsImageOffer.png')}
                    style={{width: '100%', height: '100%'}}
                    resizeMode={"stretch"}
                >
                    <View style={{flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>

                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end'}}>
                            <Text style={styles.offerName}>{offer.name}</Text>
                            <Text style={styles.offerValue}>
                                {offer.type == 1 ? offer.value + "€" : "-" + offer.value + "%"}
                            </Text>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.infoContainer}>


                <Text style={styles.offerDescription}>{offer.description}</Text>


                <View style={{height: 0.5,width: '100%',backgroundColor: Themes.base.colors.text.default,}}/>

                <OfferEvent />
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <Button
                        title={"Prenota Offerta".toUpperCase()}
                        titleStyle={{
                        fontSize: 14,
                        fontWeight: '500',


                    }}
                        buttonStyle={styles.bookOfferButton}
                    />
                </View>
            </View>
        </View>
    )
};

const OfferEvent = () => {


    let date = new Date(offer.event.start_at);
    let dayString, timeString;
    if (date) {

        dayString = `${date.getDay()} ${date.toLocaleString('it-IT', { month: 'short'}).toString().toLocaleUpperCase()}`
        timeString = `${date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}`;
    }

    let competitors = offer.event.competitors;
    let competitorsComponent;
    if (offer.event.competitorHasLogo) {
        competitorsComponent =
            <View style={styles.competitors}>
                { competitors[0].image_url ? <Image source={{uri: competitors[0].image_url}}/> : <Icon name="sports-club" size={36}/> }
                { competitors[1].image_url ? <Image source={{uri: competitors[1].image_url}}/> : <Icon name="sports-club" size={36}/> }
            </View>
    } else {
        competitorsComponent =
            <View style={{marginTop: 32}}>
                { offer.event.competition.image_url ? <Image source={{uri: offer.event.competition.image_url}} style={{width: 36, height: 36}}/>
                    : <Icon name="sports-club" size={36}/> }
            </View>
    }
    return(
        <View style={{
            flexDirection: 'row',

            alignItems: 'stretch',
            width: '100%'

        }}>
            <View style={{
                flexDirection: 'column',
                alignItems: 'center',

            }}>
                {competitorsComponent}
            </View>
            <View style ={{
                flexGrow: 2,
                flexDirection: 'column',
                paddingTop: 16,
                marginLeft: 15
            }}>
                <Text style={{fontSize: 18, fontWeight: '700'}}>{offer.event.name} </Text>
                <Text style={{fontSize: 14, fontWeight: '200', marginTop: 8}}>{dayString}</Text>
                <Text style={{fontSize: 20, fontWeight: '100'}}>{timeString}</Text>
            </View>
            <View style={{marginLeft: 50}}>
                <Image
                    source={Images.icons.sports[Helpers.sportSlugIconMap(offer.event.sport.slug)]}
                    style={{height: 60, width: 60, marginTop: 16, marginRight: 32 }}
                />
            </View>
        </View>
    )
}

const styles = {
    container:{
        borderRadius: 8,
        borderColor: 'white',
        alignItems: 'center',

        position: 'relative',
        flexDirection: 'column',
        width: '100%',


        height: null,
        backgroundColor: 'white',

    },
    infoContainer: {
        padding: 16,
    },
    bookOfferButton: {
        backgroundColor: Themes.base.colors.accent.default,
        width: 180,
        height: 38,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 50,
        marginTop: 20,
        marginBottom: 15,
        ...Themes.base.elevations.depth2
    },

    imageStyle: {
        borderRadius: 5,
        height: 189,
        width: '100%',
        //justifycontent: 'center',
        alignItems: 'center',

    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
    competitors: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

        paddingTop: 16,
    },
    offerName: {color: 'white', fontSize: 24, marginLeft: 20, marginBottom: 15},
    offerValue: {color: 'white', fontSize: 36,  marginRight: 20, marginBottom: 15, fontWeight: '800'},
    offerDescription: {paddingTop: 16, paddingBottom: 16, color: Themes.base.colors.text.default},

};

export default OfferCard;
