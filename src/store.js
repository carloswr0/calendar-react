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
    "city": "Aberdeen",
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
      "city": "Abilene",
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
      "city": "Akron",
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
  },{
    "reminder": "saca la basura",
    "date": {
      "date": 17,
      "month": 5,
      "year": 2019
    },
    "time": "3:00",
    "city": "California",
    "color": "#afba02"
  },{
    "reminder": "haz ejercicio",
    "date": {
      "date": 22,
      "month": 5,
      "year": 2019
    },
    "time": "3:00",
    "city": "San Diego",
    "color": "#afba02"
  },{
    "reminder": "Escribe los unit testing",
    "date": {
      "date": 23,
      "month": 5,
      "year": 2019
    },
    "time": "3:00",
    "city": "Washington",
    "color": "#afba02"
  }],
  weather: [],
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
