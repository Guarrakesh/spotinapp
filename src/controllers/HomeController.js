import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import {coordsSelector} from "../reducers/location";


/**
* Componente che fornisce le prop necessarie al rendering della
* home (es eventuali notifiche per l'utente)

*/
export class HomeController extends Component {


  shouldComponentUpdate(nextProps) {
    if (nextProps.isLoggedIn !== this.props.isLoggedIn ||
        !isEqual(nextProps.coords, this.props.coords)) {
      return true;
    }
    return false;
  }
  render() {

    const {
      children,
      isLoading,
      coords,
    } = this.props;

    return children({
      isLoading,
      coords,
    });
  }
}

const mapStateToProps = (state) => {

  return {
    isLoggedIn: state.auth.isLoggedIn,
    isLoading: state.loading > 0,
    coords: coordsSelector(state),
  };
};

HomeController.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.func,
};
export default connect(
  mapStateToProps,
  {
    getNearBroadcasts: (coords) => crudGetNearMany()

  })(HomeController);
