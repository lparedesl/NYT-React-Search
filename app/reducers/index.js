import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import SearchValues from './search';
import ArticlesReducer from './article';
import SavedArticlesReducer from './saved_article';

const rootReducer = combineReducers({
    search_values: SearchValues,
    articles: ArticlesReducer,
    savedArticles: SavedArticlesReducer,
    form: formReducer
});

export default rootReducer;
