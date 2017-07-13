import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import promise from 'redux-promise';

import reducers from './reducers';
import Search from './components/search_page';
import Results from './components/results_page';
import Saved from './components/saved_articles_page';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
          <div className="container">
              <Switch>
                  <Route path="/saved" component={Saved}/>
                  <Route path="/results" component={Results}/>
                  <Route path="/" component={Search}/>
              </Switch>
          </div>
      </BrowserRouter>
  </Provider>
  , document.querySelector('#app'));
