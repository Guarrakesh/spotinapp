import { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { crudGetList as crudGetListAction,
  crudGetNearMany as crudGetManyNearAction} from '../actions/dataActions';


/*
 * Simile a ListController, ma può essere usato come figlio di altri controller (as. ShowController), dato che non si mette
 * in ascolto di state.isLoading e quindi non causa un render loop sui figli
 */
class InlineListController extends Component {

  componentDidMount() {
    this.updateData(this.props);
  }

  shouldComponentUpdate(nextProps) {

    const changesPositionCond = !nextProps.nearPosition ? false
        :
        (nextProps.nearPosition.latitude !== this.props.nearPosition.latitude ||
        nextProps.nearPosition.longitude !== this.props.nearPosition.longitude ||
        nextProps.nearPosition.radius !== this.props.nearPosition.radius);

    if (changesPositionCond ||
        nextProps.resource !== this.props.resource ||
        nextProps.ids !== this.props.ids ) {
      return true;
    }

    return false;

  }
  updateData(props) {

    const { sort, order, numElems = 10, filter } = this.props;
    const pagination = {
      page: 1,
      perPage: parseInt(numElems, 10)
    };
    if (this.props.nearPosition && this.props.nearPosition.latitude
        && this.props.nearPosition.longitude && this.props.nearPosition.radius) {
      this.props.crudGetManyNear(
          this.props.resource,
          this.props.nearPosition,
          pagination,
          { field: sort, order},
          { ...filter}
      )
    } else {
      this.props.crudGetList(
          this.props.resource,
          pagination,
          {field: sort, order},
          { ...filter }
      );
    }

  }

  render() {
    const {
        children,
        data,
        ids,
    } = this.props;

    const isLoading = ids.length === 0;
    return children({
      data,
      ids,
      isLoading
    })

  }
}


InlineListController.propTypes = {
  data: PropTypes.object,
  ids: PropTypes.array,
  nearPosition: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
}
function mapStateToProps(state, props) {
  const resourceState = state.entities[props.resource];
  let data;
  if (props.nearPosition && state.location.near[props.resource]) {
    data = Object.keys(resourceState.data).reduce((acc, id) => ({
      ...acc,
      [id]: {
        ...resourceState.data[id],
        dist: state.location.near[props.resource][id]}

    }), {});
  } else {
    data = resourceState.data;
  }
  const list = resourceState.list[props.id];


  return {
    ids: list ? list.ids : [],
    data
  }
}
export default connect(mapStateToProps,
    {
      crudGetList: crudGetListAction,
      crudGetManyNear: crudGetManyNearAction,

    })(InlineListController);
