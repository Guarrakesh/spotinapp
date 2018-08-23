import React from 'react';

import { connect } from 'react-redux';
import { View, Text, StyleSheet} from 'react-native';
import BusinessList from '../components/SpotComponents/BusinessList';
import { getBusinessRequest } from '../actions/businesses';

import themes from "../styleTheme";

const businesses = [
    {
        _id: 1,
        name: "PizzaHot",
        address: "Via Lago Patria 71, Giugliano (NA)",
        image: "https://file.videopolis.com/D/9dc9f4ba-0b2d-4cbb-979f-fee7be8a4198/8485.11521.brussels.the-hotel-brussels.amenity.restaurant-AD3WAP2L-13000-853x480.jpeg",
        kind: "American Pub",
        distance: "3,4",
        wifi: true,
        seats: 56,
        discount: {
            value: 10,
            absoluteDiscount: true
        },
    },
    {
        _id: 2,
        name: "Add'e Scugnizzi",
        address: "Via Lago Patria 202, Giugliano (NA)",
        image: "data:image/jpeg;base64,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",
        kind: "Pizzeria",
        distance: "4,4",
        wifi: false,
        seats: 30,
        discount: {
            value: 10,
            absoluteDiscount: false
        },
    }
];
class BusinessScreen extends React.Component {

    constructor() {
        super();

        this.handleBusinessPress = this.handleBusinessPress.bind(this);

    }

    static navigationOptions = ({ navigation }) => {
        const { state, setParams, navigate } = navigation;
        const params = state.params || {};
        const { event } = params;

        return {
            /*headerStyle: {
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                height: Dimensions.get('window').width / 3,
                backgroundColor: themes.base.colors.primary.default
            },
            headerTitle: (props) => {
              return (<View>
                  <Text>Serie A</Text>
                  <Text>Juventus ./ Napoli</Text>
              </View>)
            },*/
            headerStyle: {
                shadowOffset: {width: 0, height: 0},
                shadowColor: 'transparent',
                borderBottomWidth: 0,
                backgroundColor: themes.base.colors.primary.default
            },

            title: "Eventi in programma"

        }
    }
    componentDidMount() {

        const {event} = this.props.navigation.state.params;

    }

    handleBusinessPress(business) {
        //this.props.navigation.navigate('Events', {competition: item});

    }

    render() {
        const {event} = this.props.navigation.state.params;
        //let businesses = event.businesses;
        const {currentlySending} = this.props;

        if (!businesses || businesses.length === 0)
            return null;


        let date = new Date(event.start_at);
        let dayString, timeString,weekOfDayString;
        if (date) {

            weekOfDayString = date.toLocaleString('it-IT', {weekday: 'short'}).toString().toLocaleUpperCase();
            dayString = `${date.getDay()} ${date.toLocaleString('it-IT', { month: 'short'}).toString()}`;
            timeString = `${date.getHours()}:${(date.getMinutes()<10?'0':'') + date.getMinutes()}`;

        }

        return (
            <View>

                    <View style={styles.subHeader}>
                        <Text style={styles.competitionName}>{event.competition.name}</Text>
                        <Text style={styles.eventName}>{event.name}</Text>
                        <Text style={styles.date}>{`${weekOfDayString} ${dayString} - ${timeString}`}</Text>
                    </View>

                <BusinessList businesses={businesses} onItemPress={this.handleBusinessPress}/>
            </View>

        )


    }
}
const mapStateToProps = (state) => {
    const { currentlySending, error} = state.entities;
    const { loggedIn } = state.auth;
    return {
        currentlySending, error, loggedIn
    }

}


const styles = StyleSheet.create({
    subHeader: {


        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundColor: themes.base.colors.primary.default,
        paddingBottom: 48,
        paddingTop: 16,
        marginBottom: -32,
        zIndex: 0,
    },
    eventName: {
        fontSize: 18,
        color: themes.base.colors.white.light,
        marginBottom: 8,
        fontWeight: '700',

    },
    competitionName: {
        fontSize: 18,
        fontWeight: '700',
        color: themes.base.colors.white.light,

    },
    date: {
        color: themes.base.colors.text.default,

    }
});
export default connect(mapStateToProps)(BusinessScreen);
