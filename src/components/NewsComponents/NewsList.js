import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import NewsCard from './OfferCard';

//  create components

class NewsList extends Component {
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
      <NewsCard />
    </ScrollView>
  );
 }
}


// make exportable to other part of the app
export default NewsList;
