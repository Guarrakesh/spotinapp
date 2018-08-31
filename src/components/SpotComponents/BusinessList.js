import React from 'react';

import BusinessCard from './BusinessCard';
import {View, StyleSheet, Dimensions, Image, ScrollView, FlatList} from 'react-native';

import Images from '../../assets/images';
import PropTypes from 'prop-types';
//import broadcasts from "../../api/broadcasts";

const broadcasts = [
    {
        "_id": "5b7f0cf65066dea0081a1c16",
        "business": {
            "_id": "5b7f0c595066dea0081a1bc1",
            "name": "Pizza Hot",
            "address": {
                "_id": "5b817502fa2191347fc80340",
                "location": {
                    "coordinates": [
                        14.0823297,
                        40.8627346
                    ],
                    "_id": "5b86ba8892782b4e1fd62012",
                    "type": "Point"
                },
                "number": "8",
                "city": "Pozzuoli",
                "province": "NA",
                "country": "Italia",
                "zip": 80078,
                "street": "Arturo martini"
            },
            "type": "Pub",
            "wifi": true,
            "seats": "30",
            "tvs": 7,
            "providers": [
                "sky",
                "dazn"
            ],
            "phone": "34604645382",
            "photos": [],
            "target": "Famiglie con Bambini, Tifosi",
            "vat": 23452243,
            "__v": 2,
            "forFamilies": true,
            "tradeName": "Pizza Hot Inc.",
            "spots": 0,
            "image_url": [
                {
                    "url": "https://file.videopolis.com/D/9dc9f4ba-0b2d-4cbb-979f-fee7be8a4198/8485.11521.brussels.the-hotel-brussels.amenity.restaurant-AD3WAP2L-13000-853x480.jpeg",
                    "width": 100,
                    "height": 100
                },
            ],
            "dist": {
                "calculated": 3.328925469089515,
                "location": {
                    "coordinates": [
                        14.0823297,
                        40.8627346
                    ],
                    "_id": "5b86ba8892782b4e1fd62012",
                    "type": "Point"
                }
            }
        },
        "event": null,
        "newsfeed": "0",
        "offer": {
            "title": "Pazza e bibita",
            "type": 0,
            "value": "10"
        },
        "reservations": []
    },
    {
        "_id": "5b7f0cf65066dea0081a1c16",
        "business": {
            "_id": "5b7f0c595066dea0081a1bc1",
            "name": "Adde Scugnizzi",
            "address": {
                "_id": "5b817502fa2191347fc80340",
                "location": {
                    "coordinates": [
                        14.0823297,
                        40.8627346
                    ],
                    "_id": "5b86ba8892782b4e1fd62012",
                    "type": "Point"
                },
                "number": "8",
                "city": "Pozzuoli",
                "province": "NA",
                "country": "Italia",
                "zip": 80078,
                "street": "Arturo martini"
            },
            "type": "Pub",
            "wifi": false,
            "seats": "56",
            "tvs": 7,
            "providers": [
                "sky",
                "dazn"
            ],
            "phone": "34604645382",
            "photos": [],
            "target": "Famiglie con Bambini, Tifosi",
            "vat": 23452243,
            "__v": 2,
            "forFamilies": true,
            "tradeName": "Pizza Hot Inc.",
            "spots": 0,
            "image_url": [
                {
                    "url": "https://file.videopolis.com/D/9dc9f4ba-0b2d-4cbb-979f-fee7be8a4198/8485.11521.brussels.the-hotel-brussels.amenity.restaurant-AD3WAP2L-13000-853x480.jpeg",
                    "width": 100,
                    "height": 100
                },
            ],
            "dist": {
                "calculated": 3.328925469089515,
                "location": {
                    "coordinates": [
                        14.0823297,
                        40.8627346
                    ],
                    "_id": "5b86ba8892782b4e1fd62012",
                    "type": "Point"
                }
            }
        },
        "event": null,
        "newsfeed": "0",
        "offer": {
            "title": "Pazza e bibita",
            "type": "2",
            "value": "10"
        },
        "reservations": []
    }
]

//0 prezzo fisso, 1 sconto percentuale, 2 sconto assoluto

class BusinessList extends React.Component {

    _keyExtractor = (item) => item._id;

    _onItemPress = (id) => {
        //const broadcasts = this.props.businesses.find(bus => bus._id === id);
        const broadcast = broadcasts.find(brod => brod._id === id);
        //cerco tra i businesses quale ha l'id uguale a _id
        this.props.onItemPress(broadcast);
    }

    render(){

        //const { businesses } = this.props;
        console.log(broadcasts);
        if (broadcasts.length <= 0) {
            return null;
        }


        return (
            <FlatList
                data={broadcasts}
                renderItem={({item}) => <BusinessCard
                    onItemPress={this._onItemPress.bind(this)}
                    {...item}/>}

                contentContainerStyle={styles.container}
            />

        );
    }

};

BusinessList.propTypes = {
    onItemPress: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
    container: {


        alignItems: 'stretch',
        padding: 8,
    }
});

export default BusinessList;
