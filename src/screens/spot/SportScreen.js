import React from 'react';
import { connect } from 'react-redux';

import ListController from '../../controllers/ListController';

import SportList from '../../components/SpotComponents/SportList';
import PropTypes from 'prop-types';

import { View, Text, ActivityIndicator , InteractionManager } from 'react-native';
import { getLocationRequest } from "../../actions/location";


import themes from '../../styleTheme';

class SportScreen extends React.Component {


  constructor() {
    super();
    this.handleItemPress = this.handleItemPress.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(getLocationRequest());
  }

  handleItemPress(sportId, sportName) {
    this.props.navigation.navigate('Competitions', {sportId, title: sportName});
  }

  render() {
    return (
        <ListController
            resource="sports"
            perPage={20}
            sort={{field: 'order', order: 'asc'}}
        >
          { controllerProps =>  <SportList onItemPress={this.handleItemPress} {...controllerProps} />}

        </ListController>
    )
  }
}

SportScreen.propTypes = {
  navigation: PropTypes.object,
  dispatch: PropTypes.func,
};

const mapStateToProps = state => {
  return({

  })
};

export default connect(null)(SportScreen)