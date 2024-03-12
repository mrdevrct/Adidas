import { combineReducers } from 'redux';
import openMenuReducer from './reducers/openMenuReducer';
import productsReducer from './reducers/productsReducer';

const rootReducer = combineReducers({
  openMenu: openMenuReducer,
  products: productsReducer,
});

export default rootReducer;
