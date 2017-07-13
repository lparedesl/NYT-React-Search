import _ from 'lodash';
import moment from 'moment';
import {FETCH_SAVED_ARTICLES} from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_SAVED_ARTICLES:
            _.map(action.payload.data, article => {
                const newDate = String(article.date).split('T');
                article.date = moment(newDate[0], "YYYY-MM-DD").format("MMM DD, YYYY");
            });

            return _.mapKeys(action.payload.data, '_id');
    }

    return state;
}