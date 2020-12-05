import * as types from './../constants/ActionType'

export const addProduct =(product) =>{
    return {
        type: types.ADD_PRODUCT,
        product
    }
}