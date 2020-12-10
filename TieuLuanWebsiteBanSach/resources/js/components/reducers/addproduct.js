import * as types from '../constants/ActionType'

var data = JSON.parse(localStorage.getItem('tasks'))
var initialState = {
    total: 0,
    cartlist: [],
    totalCart: 0
}
var myReducer = (state = initialState, action) =>{
    switch (action.type) {
        case types.ADD_PRODUCT:
            console.log("action: ",action.product);
            return action;
        default: 
            return state
    }
}
export default myReducer;