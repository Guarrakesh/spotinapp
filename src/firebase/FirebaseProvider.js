import { Component } from "react";
import PropTypes from 'prop-types';

import { FCM_INIT } from "./actions";
class FirebaseProvider extends Component {

  componentDidMount() {
    // Dispatcho l'azione di inizializzazione, il saga farà il resto
    this.props.store && this.props.store.dispatch({type: FCM_INIT });
  }

  render() {
    return this.props.children;
  }
}

FirebaseProvider.propTypes = {
  store: PropTypes.object, // Redux store (per fare il dispatch delle azioni)
  children: PropTypes.node
};

export default FirebaseProvider;


