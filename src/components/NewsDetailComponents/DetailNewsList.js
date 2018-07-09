import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import HeaderNewsDet from './HeaderNewsDet';
import NewsDetInfoCard from './NewsDetInfoCard';
import EventNewsCard from '../NewsComponents/EventNewsCard';

//  create components

class DetailNewsList extends Component {
  /*
  state = { albums: [] };

  componentWillMount() {
    axios.get('https://rallycoding.herokuapp.com/api/music_albums')
    .then(response => this.setState({ albums: response.data }));
  }

  renderAlbums() {
    return this.state.albums.map(album =>
      <AlbumDetail key={album.title} album={album} />
    );
  }
*/
render() {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, alignItems: 'center', marginTop: 20}}>
      <HeaderNewsDet />
      <Text style={{color: 'black', fontSize: 20, marginTop: 5,marginLeft: 5, alignSelf: 'flex-start'}}>Informazioni</Text>
      <NewsDetInfoCard />
      <Text style={{color: 'black', fontSize: 20, marginTop: 5, marginLeft: 5, alignSelf: 'flex-start'}}>Eventi in programma</Text>
      <EventNewsCard style={{marginTop: 5}} />
    </ScrollView>
  );
 }
}


// make exportable to other part of the app
export default DetailNewsList;
