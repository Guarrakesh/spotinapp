import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'lodash/get';

import { crudGetManyAccumulate as crudGetManyAccumulateAction } from '../actions/accumulateActions';

/**
 * Si occupa di fetchare un record di riferimento data una foreign Key
 * IL riferimento deve essere una delle risorse presenti in entities
 */

export class ReferenceController extends Component {
  componentDidMount() {
    this.fetchReference(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.record.id !== nextProps.record.id) {
      this.fetchReference(nextProps);
    }
  }

  fetchReference(props) {

    const source = get(props.record, props.source);
    if (source !== null && typeof source !== 'undefined') {
      this.props.crudGetManyAccumulate(props.reference, [source]);
    }
  }

  render() {

    const {

        allowEmpty,
        children,
        referenceRecord,

    } = this.props;

    return children({
      isLoading: !referenceRecord && !allowEmpty,
      referenceRecord
    });
  }
}

ReferenceController.propTypes = {
  allowEmpty: PropTypes.bool.isRequired,
  basePath: PropTypes.string.isRequired,
  children: PropTypes.func.isRequired,
  crudGetManyAccumulate: PropTypes.func.isRequired,
  record: PropTypes.string,
  reference: PropTypes.string.isRequired,
  referenceRecord: PropTypes.object,
  resource: PropTypes.string,
  source: PropTypes.string.isRequired
};

ReferenceController.defaultProps = {
  allowEmpty: false,
  referenceRecord: null,
  record: {}
};

const mapStateToProps = (state, props) => ({
  referenceRecord:
      state.entities[props.reference].data[
          get(props.record, props.source)
          ]
});

export default connect(
    mapStateToProps,
    {
      crudGetManyAccumulate: crudGetManyAccumulateAction
    }
)(ReferenceController);