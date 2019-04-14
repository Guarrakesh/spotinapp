import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';


/**
* Componente che fornisce le prop necessarie al rendering della
* home (es eventuali notifiche per l'utente)

*/
export class HomeController extends Component {


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
      position,
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
    position: state.location.device.position ? state.location.device.position.coords : null
  };
};

HomeController.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.func,
};
export default connect(
  mapStateToProps,
  {
    getNearBroadcasts: (position) => crudGetNearMany()

  })(HomeController);
