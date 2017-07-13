import {SET_SEARCH_VALUES} from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case SET_SEARCH_VALUES:
            return action.payload;
    }

    return state;
}