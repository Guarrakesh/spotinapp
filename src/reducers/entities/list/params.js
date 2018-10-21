import { CRUD_CHANGE_LIST_PARAMS } from '../../../actions/listActions';

const defaultState = {
    sort: "_id",
    order: 1,
    page: 1,
    perPage: 10,
    filter: {},
};


export default   (previousState = defaultState, { type, payload }) => {

    switch (type) {
        case CRUD_CHANGE_LIST_PARAMS:
            return payload;
        default:
            return previousState;
    }
};
