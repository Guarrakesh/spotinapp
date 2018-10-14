import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

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

  shouldComponentUpdate(nextProps) {
    if (nextProps.isLoggedIn !== this.props.isLoggedIn ||
        !isEqual(nextProps.position, this.props.position)) {
      return true;
    }
    return false;
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
    isLoggedIn: state.auth.isLoggedIn,
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
