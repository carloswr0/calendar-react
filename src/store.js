import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

// Root Reducers
import rootReducer from './reducers/index';

const defaultstate = {
  reminders: [{
    "reminder": "Recuerda",
    "date": {
      "date": 7,
      "month": 5,
      "year": 2019
    },
    "time": "13:00",
    "city": "Los Angeles",
    "color": "#ff69b4"
  }],
};

// Creates the store with our reducers and default state
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer, 
  defaultstate,
  composeEnhancers(
    applyMiddleware(thunkMiddleware)
  )
); 

export default store;