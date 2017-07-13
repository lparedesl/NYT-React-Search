import _ from 'lodash';
import axios from 'axios';

export const SET_SEARCH_VALUES = 'search_values';
export const FETCH_ARTICLES = 'fetch_articles';
export const SAVE_ARTICLE = 'save_article';
export const FETCH_SAVED_ARTICLES = 'fetch_saved_articles';
export const DELETE_ARTICLE = 'delete_article';
const ROOT_URL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const API_KEY = '67ded535ef3743c38b8d47bc94e8b6cd';

export function setSearchValues(values) {
    return {
        type: SET_SEARCH_VALUES,
        payload: values
    };
}

export function fetchArticles(values) {
    const url = `${ROOT_URL}?api-key=${API_KEY}&q=${values.topic}&begin_date=${values.start_year}0101&end_date=${values.end_year}1231`;
    const request = axios.get(url)
                         .then(response => {
                             return axios.post('/api/check-if-saved', response.data.response.docs);
                         })
                         .then(response => {
                             return _.mapKeys(response.data, '_id');
                         })
                         .catch(err => {
                             console.log(err);
                         });

    return {
        type: FETCH_ARTICLES,
        payload: request
    };
}

export function saveArticle(values, cb) {
    const request = axios.post('/api/save-article', values)
                         .then(doc => cb(doc));

    return {
        type: SAVE_ARTICLE,
        payload: request
    };
}

export function fetchSavedArticles() {
    const request = axios.get('/api/saved');

    return {
        type: FETCH_SAVED_ARTICLES,
        payload: request
    };
}

export function deleteArticle(id, cb) {
    const request = axios.post(`/api/delete-article/${id}`)
                         .then(doc => cb(doc));

    return {
        type: DELETE_ARTICLE
    };
}
