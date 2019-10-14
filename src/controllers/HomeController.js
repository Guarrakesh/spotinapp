import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';
import {coordsSelector} from "../reducers/location";
import { withNavigation } from 'react-navigation';
import compose from 'recompose/compose';
import NavigationService from '../navigators/NavigationService';
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
  componentWillReceiveProps(nextProps: Readonly<P>, nextContext: any): void {
    // TODO: Questo controllo bisognerebbe farlo in un parent più in alto in modo da prendere tutta la navigation
    if (!nextProps.coords) {
      this.props.showLocationScreen();
    }
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
export default compose(
    connect(
        mapStateToProps,
        {
          showLocationScreen: () => NavigationService.navigate('LocationScreen', null, true),
          getNearBroadcasts: (coords) => crudGetNearMany()
        }),
    withNavigation,

)(HomeController);
