import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import InlineListController from './InlineListController';
import { getLocationRequest } from "../actions/location";


/**
* Componente che fornisce le prop necessarie al rendering della
* home (es eventuali notifiche per l'utente)

*/
export class HomeController extends Component {
  componentDidMount() {
    this.props.getLocation();

  }
  render() {
    const {
      children,
      isLoading,
      position
    } = this.props;

    return children({
      isLoading,
      position,
    });
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.loading > 0,
    position: state.location.coordinates,
  };
};

HomeController.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.func,
};
export default connect(
  mapStateToProps,
  {
    getLocation: getLocationRequest,
    getNearBroadcasts: (position) => crudGetNearMany()

  })(HomeController);
