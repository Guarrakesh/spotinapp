import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {crudGetList} from '../../actions/dataActions';


function equalFn(state, prevState) {
  // Re-render solo quando cambia isLoading
  return state.isLoading === prevState.isLoading;
}

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
  const fetch = () => dispatch(crudGetList(resource, null, { page: 0, perPage: 20 }, {}));

  useEffect(() => {
    fetch();
  }, []);


  return {
    data: derivedState.data,
    isLoading: derivedState.isLoading,
    reload: fetch,
  };
};



const mapStateToProps = props => (state) => {
  const resourceState = state.entities[props.resource];
  const data = resourceState.data;

  return {
    data: Object.values(data),
    isLoading: state.loading > 0,

  };
};

export default useSimpleListController;
