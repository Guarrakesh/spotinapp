import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {crudGetList} from '../../actions/dataActions';
import {initList, refreshList} from "../../actions/listActions";
import usePrevious from "./usePrevious";

const equalFn = (state, prevState) => {
  // Re-render solo quando cambia isLoading

  return state.data.fetchedAt === prevState.data.fetchedAt;
}

const getListId = (resource, props = {}) => props.id || `${resource}_list`;

/**
 * Hook Version del ListController semplificato:
 * E' una lista semplice, fetchata e cachata,
 * senza filtri né paginazione con opzione di reload
 * @param props
 * @author Dario Guarracino
 * @date 09/10/2019
 */
const useSimpleListController = (resource, props = {}) => {
  const {
    filter,
    filterDefaultValues,
    pagination,
    perPage,
    sort,
    basePath,
    debounce,
    id,

  } = props;
  const derivedState = useSelector(mapStateToProps({resource, ...props}));
  const dispatch = useDispatch();
  const fetch = (refresh = false) => dispatch(crudGetList(
      resource, getListId(resource, props),
      { page: 0, perPage: 20 },
      {}, null, null,
      null, refresh)
  );
  const refresh = () => {
    fetch(true);
    dispatch(refreshList(resource, getListId(resource, props)));
  };
  useEffect(() => {

    if (!derivedState.list) {
      dispatch(initList(resource, getListId(resource, props)));
      fetch();
    }
  }, []);

  return {
    ids: derivedState.ids,
    data: derivedState.data,
    isLoading: derivedState.isLoading,
    refresh: refresh,
    refreshing: !!derivedState.list ? derivedState.list.refreshing : false,

  };
};



const mapStateToProps = props => (state) => {
  const resourceState = state.entities[props.resource];
  const data = resourceState.data;
  const list = resourceState.list[getListId(props.resource, props)];

  return {
    data,
    isLoading: !!list ? list.isLoading : false,
    ids: !!list ? list.ids : [],
    list,

  };
};

export default useSimpleListController;
