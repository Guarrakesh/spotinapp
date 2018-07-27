import React from 'react';
import {View, Dimensions, TouchableOpacity, Image, Text} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
// import HeaderNewsCard from './HeaderNewsCard';
import Themes from '../../styleTheme';
import Images from '../../assets/images';
import EventNewsCard from './EventNewsCard';
import NewsDescription from './NewsDescription';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

const NewsCard = () => {
    return (
        <View style={styles.containerStyle}>
            <NewsDescription />
            <View style={{
                height: 0.5,
                width: deviceWidth - 50,
                backgroundColor: Themes.base.colors.text.default,
            }}/>
            <EventInNews />
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button
                    title="PRENOTA OFFERTA"
                    buttonStyle={{
                        backgroundColor: Themes.base.colors.accent.default,
                        width: 180,
                        height: 38,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 20,
                        marginTop: 20,
                        marginBottom: 15
                    }}
                />
            </View>
        </View>
    )
};

const EventInNews = () => {
    return(
        <View style={{
            flexDirection: 'row',
            marginTop: 10,
            width: '100%'

        }}>
            <View style={{
                flexDirection: 'column',
                alignItems: 'center',
                marginLeft: 13
            }}>
                <Image
                    source={require('./eventicons/napoliicon.png')}
                    style={{height: 45, width: 45}}
                />
                <Image
                    source={require('./eventicons/juveicon.png')}
                    style={{height: 45, width: 25, marginTop: 8}}
                />
            </View>
            <View style ={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                marginLeft: 15
            }}>
                <Text style={{fontSize: 18, fontWeight: 'bold'}}>Napoli - Juventus</Text>
                <Text style={{fontSize: 14, fontWeight: '200'}}>13Gen</Text>
                <Text style={{fontSize: 20, fontWeight: '100'}}>15:30</Text>
            </View>
            <View style={{
                flexDirection: 'column',
                justifyContent: 'space-around',
                marginLeft: 50
            }}>
                <Image
                    source={Images.icons.sports.soccer}
                    style={{height: 60, width: 60 }}
                />
            </View>
        </View>
    )
}

const styles = {
    containerStyle:{
        borderRadius: 8,
        borderColor: 'white',
        alignItems: 'center',
        paddingTop: 0,
        position: 'relative',
        flexDirection: 'column',
        width: deviceWidth-16,
        marginLeft: 8,
        marginRight: 8,
        marginTop: 10,
        height: null,
        backgroundColor: 'white',
        shadowOffset: Themes.base.elevations.depth1.shadowOffset,
        shadowRadius: Themes.base.elevations.depth1.shadowRadius,
        shadowOpacity: Themes.base.elevations.depth1.shadowOpacity
    }
};

export default NewsCard;
