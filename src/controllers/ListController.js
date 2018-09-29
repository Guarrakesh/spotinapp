/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { parse, stringify } from 'query-string';
import { isEqual, pickBy, debounce } from 'lodash';

import { crudGetList as crudGetListAction,
  crudGetNearMany as crudGetNearManyAction } from '../actions/dataActions';
import {
  changeListParams as changeListParamsAction,
  setListSelectedIds as setListSelectedIdsAction,
  toggleListItem as toggleListItemAction
} from '../actions/listActions';
import removeEmpty from '../helpers/removeEmpty';
//import removeKey from '../helpers/removeKey';

import queryReducer, {
  SET_SORT,
  SET_PAGE,
  SET_FILTER,
  SET_PER_PAGE,
  SORT_DESC,
} from '../reducers/entities/list/queryReducer';

/**
 * List Controller
 * <ListController> renderizza la lista a cui è associato e fetcha la lista dei record dalle REST API
 **/

export class ListController extends Component {
  state = { isRefreshing: false }; //Per gestire il refresh della lista

  componentDidMount() {

    if (
        !this.props.query.page &&
        !(this.props.ids || []).length &&
        this.props.params.page > 1 &&
        this.props.total > 0
    ) {
      this.setPage(this.props.params.page - 1);
      return;

    }

    this.updateData();
    if (Object.keys(this.props.query).length > 0) {
      this.props.changeListParams(this.props.resource, this.props.query);

    }
  }

  componentWillUnmount() {
    this.setFilters.cancel();

  }

  componentWillReceiveProps(nextProps) {
    if (
        nextProps.resource !== this.props.resource ||
        nextProps.query.sort !== this.props.query.sort ||
        nextProps.query.order !== this.props.query.order ||
        nextProps.query.perPage !== this.props.query.perPage ||
        !isEqual(nextProps.query.filter, this.props.query.filter) ||
        !isEqual(nextProps.filter, this.props.filter) ||
        !isEqual(nextProps.sort, this.props.sort) ||
        !isEqual(nextProps.perPage, this.props.perPage)
    ) {

      this.updateData(
          Object.keys(nextProps.query).length > 0
              ? nextProps.query
              : nextProps.params
      );

    }
    if (!this.props.isLoading) {
      this.setState({ isRefreshing: false });
    }
    //C'è un refresh
    if (nextProps.version !== this.props.version ) {
      this.updateData();
    }

  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
        nextProps.isLoading === this.props.isLoading &&
        nextProps.version === this.props.version &&
        nextState === this.state &&
        nextProps.data === this.props.data &&
        nextProps.selectedIds === this.props.selectedIds &&
        nextProps.total === this.props.total
    ) {
      return false;
    }

    return true;
  }
  getQuery() {
    const query = Object.keys(this.props.query).length > 0
        ? this.props.queryData
        : { ...this.props.params };

    const filterDefaultValues = this.props.filterDefaultValues || {};

    query.filter = { ...filterDefaultValues, ...query.filter };
    if (!query.sort) {
      query.sort = this.props.sort.field;
      query.order = this.props.sort.order;
    }
    if (!query.perPage) {
      query.perPage = this.props.perPage;
    }
    if (!query.page) {
      query.page = 1;
    }
    return query;
  }

  updateData(query) {
    const params = query || this.getQuery();
    const { sort, order, page = 1, perPage, filter } = params;
    const pagination = {
      page: parseInt(page, 10),
      perPage: parseInt(perPage, 10)
    };

    const permanentFilter = this.props.filter;
    // Chiamo l'API
    if (this.props.nearPosition && this.props.nearPosition.latitude
    && this.props.nearPosition.longitude && this.props.nearPosition.radius) {
      this.props.crudGetManyNear(
          this.props.resource,
          this.props.nearPosition,
          pagination,
          { field: sort, order},
          { ...filter, ...permanentFilter}
      )
    } else {
      this.props.crudGetList(
          this.props.resource,
          pagination,
          {field: sort, order},
          {...filter, ...permanentFilter}
      );
    }
  }
  refresh() {
    this.updateData();
    this.setState({ isRefreshing: true });
  }


  setSort = sort => this.changeParams({ type: SET_SORT, payload: sort });

  setPage = page => this.changeParams({ type: SET_PAGE, payload: page });

  setPerPage = perPage =>
      this.changeParams({ type: SET_PER_PAGE, payload: perPage });

  setFilters = debounce(filters => {
    if (isEqual(filters, this.props.filterValues)) {
      return;
    }
    const filtersWithoutEmpty = removeEmpty(filters);
    this.changeParams({ type: SET_FILTER, payload: filtersWithoutEmpty });
  }, this.props.debounce);

  handleSelect = ids => {
    this.props.setSelectedIds(this.props.resource, ids);
  };
  handleUnselectItems = () => {
    this.props.setSelectedIds(this.props.resource, []);
  };
  handleToggleItem = id => {
    this.props.toggleItem(this.props.resource, id);
  };

  changeParams(action) {
    const newParams = queryReducer(this.getQuery(), action);
    this.props.changeListParams(this.props.resource, newParams);

  }

  render() {
    const {
        basePath,
        children,
        resource,
        data,
        ids,
        total,
        isLoading,
        version,
        selectedIds
    } = this.props;

    const query = this.getQuery();
    const queryFilterValues = query.filter || {};

    return children({
      basePath,
      currentSort: {
        field: query.sort,
        order: query.order
      },
      data,
      filterValues: queryFilterValues,
      ids,
      isLoading,
      onSelect: this.handleSelect,
      onToggleItem: this.handleToggleItem,
      onUnselectItems: this.handleUnselectItems,
      refresh: this.updateData.bind(this),
      isRefreshing: this.state.isRefreshing,
      page: parseInt(query.page || 1, 10),
      perPage: parseInt(query.perPage, 10),
      resource,
      selectedIds,
      setFilters: this.setFilters,
      setPage: this.setPage,
      setPerPage: this.setPerPage,
      total,
      version
    });
  }

}

ListController.propTypes = {
  // the props you can change
  children: PropTypes.func.isRequired,
  filter: PropTypes.object,
  filters: PropTypes.element,
  filterDefaultValues: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  pagination: PropTypes.element,
  perPage: PropTypes.number.isRequired,
  sort: PropTypes.shape({
    field: PropTypes.string,
    order: PropTypes.string,
  }),
  resource: PropTypes.string.isRequired,
  nearPosition: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  // the props managed by the system
  authProvider: PropTypes.func,
  basePath: PropTypes.string.isRequired,
  changeListParams: PropTypes.func.isRequired,
  crudGetList: PropTypes.func.isRequired,
  crudGetManyNear: PropTypes.func.isRequired,
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  debounce: PropTypes.number,
  filterValues: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  ids: PropTypes.array,
  selectedIds: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  location: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,

  setSelectedIds: PropTypes.func.isRequired,
  toggleItem: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
  translate: PropTypes.func.isRequired,
  version: PropTypes.number,

};

ListController.defaultProps = {
  debounce: 500,
  filter: {},
  query: {},
  filterValues: {},
  perPage: 10,
  sort: {
    field: 'id',
    order: SORT_DESC
  },
  nearPosition: false,
  parentLoading: false,
};

const injectedProps = [
  'basePath',
  'currentSort',
  'data',
  'defaultTitle',
  'displayedFilters',
  'filterValues',
  'hideFilter',
  'ids',
  'isLoading',
  'onSelect',
  'onToggleItem',
  'onUnselectItems',
  'page',
  'perPage',
  'refresh',
  'resource',
  'selectedIds',
  'setFilters',
  'setPage',
  'setPerPage',
  'setSort',
  'showFilter',
  'total',
  'translate',
  'version',
];

export const getListControllerProps = props =>
    injectedProps.reduce((acc, key) => ({ ...acc, [key]: props[key] }), {});

export const sanitizeListRestProps = props =>
    Object.keys(props)
        .filter(props => !injectedProps.includes(props))
        .reduce((acc, key) => ({ ...acc, [key]: props[key] }), {});

// Da rivedere
/*const selectQuery = createSelector(
 getLocationPath,
 getLocationSearch,
 (path, search) => {
 const query = pickBy(
 parse(search),
 (v, k) => validQueryParams.indexOf(k) !== -1
 );
 if (query.filter && typeof query.filter === 'string') {
 try {
 query.filter = JSON.parse(query.filter);
 } catch (err) {
 delete query.filter;
 }
 }
 return query;
 }
 );*/
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
    //query: selectQuery(props),
    query: {},
    params: resourceState.list.params,
    ids: resourceState.list.ids,
    selectedIds: resourceState.list.selectedIds,
    total: resourceState.list.total,
    data,
    isLoading: state.loading > 0,
    filterValues: resourceState.list.params.filter,
    version: state.ui.viewVersion
  };
}

export default
connect(
    mapStateToProps,
    {
      crudGetList: crudGetListAction,
      crudGetManyNear: crudGetNearManyAction,
      changeListParams: changeListParamsAction,
      setSelectedIds: setListSelectedIdsAction,
      toggleItem: toggleListItemAction,
    }
)(ListController);
