import {combineReducers} from 'redux';
import products from './addproduct'
import search from './searchproduct'

const myReducer = combineReducers({
    products,
    search,
});

export default myReducer;