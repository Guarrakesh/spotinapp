import { Component } from 'react';
import { connect } from 'react-redux';
import { crudGetList as crudGetListAction, crudGetNearMany as crudGetManyNearAction} from '../actions/dataActions';


/*
* Simile a ListController, ma può essere usato come figlio di altri controller (as. ShowController), dato che non si mette
* in ascolto di state.isLoading e quindi non causa un render loop sui figli
 */
class InlineListController extends Component {

  componentDidMount() {
    this.updateData(this.props);
  }

  updateData(props) {

    const { sort, order, numElems = 10, filter } = this.props;
    const pagination = {
      page: 1,
      perPage: parseInt(numElems, 10)
    };
    this.props.crudGetList(
        this.props.resource,
        pagination,
        {field: sort, order},
        { ...filter }
    )
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

  return {
    ids: resourceState.list.ids,
    data
  }
}
export default connect(mapStateToProps,
    {
      crudGetList: crudGetListAction,
      crudGetNearMany: crudGetManyNearAction,

    })(InlineListController);
