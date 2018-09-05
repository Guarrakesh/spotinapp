import React from 'react';
import View from '../common/View';
import {Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import themes from '../../styleTheme';
import Images from "../../assets/images";
import Helpers from '../../helpers';

const BroadcastCardInProfile = (props) => {

    let { event } = props;

    let date = new Date(event.start_at);
    let dayString, timeString,weekOfDayString;
    if (date) {

        weekOfDayString = date.toLocaleString('it-IT', {weekday: 'short'}).toString().toLocaleUpperCase();
        dayString = `${date.getDay()} ${date.toLocaleString('it-IT', { month: 'short'}).toString().toUpperCase()}`;
        timeString = `${date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}`;

    }

    return (
        <View style={styles.broadcastInfoView} elevation={2}>
            <View style={styles.eventInfoView}>
                <View style={styles.competitorsLogoView}>
                    { event.competition.competitorsHaveLogo ? <Image source={{uri: event.competitors[0]._id.image_versions[0].url}} style={{width: 37, height: 37}} resizeMode={'contain'}/> : <Image source={{uri: event.competition.image_versions[0].url}} style={{width: 37, height: 37}} resizeMode={'contain'}/> }
                    { event.competition.competitorsHaveLogo ? <Image source={{uri: event.competitors[1]._id.image_versions[0].url}} style={{width: 37, height: 37, marginTop: 8}} resizeMode={'contain'}/> : null }
                </View>
                <View style={{margin: 16, marginTop: 0, justifyContent: 'space-between'}}>
                    <Text style={styles.eventNameText}>{event.name}</Text>
                    <Text style={styles.eventDateText}>{weekOfDayString} {dayString}</Text>
                    <Text style={styles.eventTimeText}>{timeString}</Text>
                </View>
                <View style={styles.sportIconView}>
                    <Image source={Images.icons.sports[Helpers.sportSlugIconMap(event.sport.slug)]} style={styles.sportIcon}/>
                </View>
            </View>
            <View style={styles.offerReservationView}>
                <View style={styles.offerContainer}>
                    <Text style={styles.offerText}>-10% alla cassa</Text>
                </View>
                <TouchableOpacity>
                    <View style={styles.reservationButton}>
                        <Text style={styles.reservationText}>PRENOTA OFFERTA</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    broadcastInfoView: {
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 8,
        flexDirection: 'column',
        backgroundColor: themes.base.colors.white.light,
    },
    eventInfoView: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        marginTop: 16
    },
    competitorsLogoView: {
        margin: 16,
        marginTop: 0,
        marginRight: 0
    },
    eventNameText: {
        fontSize: 18,
        fontWeight: '600'
    },
    eventDateText: {
        fontSize: 14,
        fontWeight: '300',
        marginTop: 5,
        marginBottom: 5
    },
    eventTimeText: {
        fontSize: 20,
        fontWeight: '100'
    },
    sportIconView: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        position: 'absolute',
        right: 16
    },
    sportIcon: {
        width: 60,
        height: 60
    },
    offerReservationView: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    offerContainer: {
        borderWidth: 2,
        borderColor: themes.base.colors.accent.default,
        borderRadius: 100
    },
    offerText: {
        fontSize: 18,
        fontWeight: '600',
        color: themes.base.colors.accent.default,
        margin: 16
    },
    reservationButton: {
        backgroundColor: themes.base.colors.accent.default,
        borderRadius: 100,
        marginTop: 16,
        marginBottom: 16
    },
    reservationText: {
        fontSize: 18,
        fontWeight: '600',
        color: themes.base.colors.white.light,
        margin: 16
    }


})

export default BroadcastCardInProfile;