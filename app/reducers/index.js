import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import SearchValues from './search';
import ArticlesReducer from './article';

const rootReducer = combineReducers({
    search_values: SearchValues,
    articles: ArticlesReducer,
    form: formReducer
});

export default rootReducer;
