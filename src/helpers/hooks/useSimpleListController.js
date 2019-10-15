import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {crudGetList} from '../../actions/dataActions';
import { initList } from "../../actions/listActions";

const equalFn = (state, prevState) => {
  // Re-render solo quando cambia isLoading

  return state.data.fetchedAt === prevState.data.fetchedAt ;
};


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
  const derivedState = useSelector(mapStateToProps({resource, ...props}), equalFn);
  const dispatch = useDispatch();
  const fetch = () => dispatch(crudGetList(resource, getListId(resource, props), { page: 0, perPage: 20 }, {}));
  useEffect(() => {

    if (!derivedState.list) {
      dispatch(initList(resource, getListId(resource, props)));
      fetch();
    }
  }, []);


  return {
    data: derivedState.ids.map(id => derivedState.data[id]),
    isLoading: derivedState.isLoading,
    reload: fetch,

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
