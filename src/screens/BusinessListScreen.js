import React from 'react';

import { connect } from 'react-redux';
import { Text, ScrollView, StyleSheet} from 'react-native';

import { getBusinessRequest } from '../actions/businesses';

class BusinessScreen extends React.Component {

  constructor() {
      super();

      this.handleBusinessPress = this.handleBusinessPress.bind(this);

  }
  componentDidMount() {

      const { event } = this.props.navigation.state.params;
      const event

  }

  handleBusinessPress(business) {
      //this.props.navigation.navigate('Events', {competition: item});

  }

  render() {
      const { event } = this.props.navigation.state.params;
      let businesses = event.businesses;
      const { currentlySending } = this.props;

      if (businesses.length === 0)
          return null;

      return (
          <ScrollView>
            <BusinessList businesses={businesses} onItemPress={this.handleBusinessPress}/>
          </ScrollView>

      )


  }

  const mapStateToProps = (state) => {
      const { currentlySending, error} = state.entities;
      const { loggedIn } = state.auth;
      return {
          currentlySending, error, loggedIn
      }

}

export default connect(mapStateToProps)(BusinessScreen);
