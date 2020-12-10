import * as types from './../constants/ActionType'

export const addProduct =(total,cartlist,totalCart) =>{
    return {
        type: types.ADD_PRODUCT,
        total,
        cartlist,
        totalCart
    }
}