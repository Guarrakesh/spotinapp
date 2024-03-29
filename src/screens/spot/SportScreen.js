import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ListController from '../../controllers/ListController';

import SportList from '../../components/SpotComponents/SportList';
import { entityView } from "../../actions/view";

class SportScreen extends React.Component {


  constructor() {
    super();
    this.handleItemPress = this.handleItemPress.bind(this);
  }


  handleItemPress(sportId, sportName) {
    this.props.entityView('sport', sportId);
    this.props.navigation.navigate('Competitions', {sportId, title: sportName});
  }

  render() {
    return (
        <ListController
            id="sport_screen_list"
            resource="sports"
            perPage={20}
            sort={{field: '_id', order: 'asc'}}
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

export default connect(null, {
  entityView
})(SportScreen);
