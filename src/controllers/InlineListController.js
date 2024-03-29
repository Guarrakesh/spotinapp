import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  crudGetList as crudGetListAction,
  crudGetNearMany as crudGetManyNearAction } from '../actions/dataActions';
import { initList as initListAction } from "../actions/listActions";

/*
 * Simile a ListController, ma può essere usato come figlio di altri controller (as. ShowController), dato che non si mette
 * in ascolto di state.isLoading e quindi non causa un render loop sui figli
 */
class InlineListController extends Component {

  componentDidMount() {
    if (!this.props.initialised) {
      this.props.initList(this.props.resource, this.props.id);
    } else {
      this.updateData(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialised !== this.props.initialised) {
      this.updateData(nextProps)
    }
    if (nextProps.version !== this.props.version) {
      this.updateData(nextProps);
    }
  }
  shouldComponentUpdate(nextProps) {

    const changesPositionCond = !nextProps.nearPosition ? false
        :
        (nextProps.nearPosition.latitude !== this.props.nearPosition.latitude ||
        nextProps.nearPosition.longitude !== this.props.nearPosition.longitude ||
        nextProps.nearPosition.radius !== this.props.nearPosition.radius);
    if (changesPositionCond ||
        nextProps.initialised !== this.props.initialised ||
        nextProps.resource !== this.props.resource ||
        nextProps.isLoading !== this.props.isLoading ||
        nextProps.ids !== this.props.ids ||
        this.props.awareData && (nextProps.data !== this.props.data)) {
      return true;
    }

    return false;

  }

  updateData(props) {

    const { sort, order, numElems = 20, filter } = props;
    const pagination = {
      page: 1,
      perPage: parseInt(numElems, 20)
    };
    if (props.nearPosition && props.nearPosition.latitude
        && props.nearPosition.longitude && props.nearPosition.radius) {
      this.props.crudGetManyNear(
          props.resource,
          props.id,
          props.nearPosition,
          pagination,
          { field: sort, order},
          { ...filter},
          props.basePath,
      )
    } else {
      this.props.crudGetList(
          props.resource,
          props.id,
          pagination,
          {field: sort, order},
          { ...filter },
          props.basePath,
      );
    }

  }

  refresh(){
    this.updateData();
  }

  render() {
    const {
        children,
        data,
        ids,
        id,
        isLoading,
        initialised
    } = this.props;

    return children({
      data,
      initialised,
      ids,
      isLoading,
      listId: id,
      refresh: this.updateData.bind(this)
    })

  }
}


InlineListController.propTypes = {
  data: PropTypes.object,
  ids: PropTypes.array,
  nearPosition: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  basePath: PropTypes.string,
  resource: PropTypes.string,
  id: PropTypes.string.isRequired,
  version: PropTypes.number,
};
InlineListController.defaultProps = {
  initialised: false,
  version: 0,
};
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
    isLoading: list && list.isLoading,
    initialised: !!list,
    ids: !!list ? list.ids : [],
    version: !!list ? list.version : 0,
    data,
  }
}
export default connect(mapStateToProps,
    {

      initList: initListAction,
      crudGetList: crudGetListAction,
      crudGetManyNear: crudGetManyNearAction,

    })(InlineListController);
