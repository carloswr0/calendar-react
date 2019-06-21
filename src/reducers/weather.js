import { WEATHER_UPDATE } from '../actions/actionCreator';

function weather(state = [], action) {
  switch(action.type) {
    case WEATHER_UPDATE:
      const newWeather = {
        city: action.payload.weather.name,
        date: action.payload.date,
        description: action.payload.weather.weather,
      };
      return [...state, newWeather];
   
    default:
      return state;   
  }
}
  
export default weather;