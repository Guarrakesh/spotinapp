import { CRUD_GET_MANY_REFERENCE_SUCCESS } from '../../actions/dataActions'

const initialState = {};

export default (previousState = initialState, { type, payload, meta }) => {
    switch (type) {
        case CRUD_GET_MANY_REFERENCE_SUCCESS:
            return {
                ...previousState,
                [meta.relatedTo]: payload.data.map(record => record.id),
            };
        default:
            return previousState;
    }
};

export const getIds = (state, relatedTo) =>
    state.references.oneToMany[relatedTo];

export const getReferences = (state, reference, relatedTo) => {
    const ids = getIds(state, relatedTo);
    if (typeof ids === 'undefined') return undefined;

    if (!state.entities[reference]) {
        // eslint-disable-next-line no-console
        console.error(
            `Invalid Resource "${reference}"\n` +
                `You are trying to display or edit a field of a resource called "${reference}", ` +
                'but it has not been declared.\n' +
                "Declare this resource in the Admin or check the 'reference' prop of ReferenceArrayField and ReferenceManyField.",
            { ids }
        );
    }

    return ids
        .map(id => {
            const resource = state.entities[reference];

            if (!resource) {
                return;
            }

            return resource.data[id];
        })
        .filter(r => typeof r !== 'undefined')
        .reduce((prev, record) => {
            prev[record.id] = record; // eslint-disable-line no-param-reassign
            return prev;
        }, {});
};

export const getReferencesByIds = (state, reference, ids) => {
    if (ids.length === 0) return {};

    if (!state.entities[reference]) {
        // eslint-disable-next-line no-console
        console.error(
            `Invalid Resource "${reference}"\n` +
                `You are trying to display or edit a field of a resource called "${reference}", ` +
                'but it has not been declared.\n' +
                "Declare this resource in the Admin or check the 'reference' prop of ReferenceArrayField.",
            { ids }
        );
    }

    const references = ids
        .map(id => {
            const resource = state.entities[reference];

            if (!resource) {
                return;
            }

            return resource.data[id];
        })
        .filter(r => typeof r !== 'undefined')
        .reduce((prev, record) => {
            prev[record.id] = record; // eslint-disable-line no-param-reassign
            return prev;
        }, {});

    return Object.keys(references).length > 0 ? references : null;
};

export const nameRelatedTo = (reference, id, resource, target, filter = {}) => {
    const keys = Object.keys(filter);
    if (!keys.length) {
        return `${resource}_${reference}@${target}_${id}`;
    }

    return `${resource}_${reference}@${target}_${id}?${keys
        .map(key => `${key}=${JSON.stringify(filter[key])}`)
        .join('&')}`;
};
