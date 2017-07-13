import _ from 'lodash';
import moment from 'moment';
import {FETCH_ARTICLES} from '../actions';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_ARTICLES:
            _.map(action.payload, article => {
                article.pub_date = moment(article.pub_date, "YYYY-MM-DDThh:mm:ss+0000").format("MMM DD, YYYY");
            });

            return action.payload;
    }

    return state;
}