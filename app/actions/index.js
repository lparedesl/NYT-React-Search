export const SET_SEARCH_VALUES = 'search_values';

export function setSearchValues(values) {
    return {
        type: SET_SEARCH_VALUES,
        payload: values
    };
}
