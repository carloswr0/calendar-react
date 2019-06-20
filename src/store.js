import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

// Root Reducers
import rootReducer from './reducers/index';

const defaultstate = {
  reminders: [{
    "reminder": "Recuerda los bollos",
    "date": {
      "date": 17,
      "month": 5,
      "year": 2019
    },
    "time": "16:00",
    "city": "Los Angeles",
    "color": "#ff69b4"
  },
  {
    "reminder": "Nunca te rindas",
    "date": {
      "date": 17,
      "month": 5,
      "year": 2019
    },
    "time": "13:00",
    "city": "California",
    "color": "#807dc7"
  },
  {
    "reminder": "Toma las llaves",
    "date": {
      "date": 17,
      "month": 5,
      "year": 2019
    },
    "time": "14:00",
    "city": "San Diego",
    "color": "#3bdda5"
  }
,{
  "reminder": "Revisa el clima",
  "date": {
    "date": 9,
    "month": 5,
    "year": 2019
  },
  "time": "3:00",
  "city": "Juarez",
  "color": "#afba02"
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