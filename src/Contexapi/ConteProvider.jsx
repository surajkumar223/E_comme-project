
import React, { createContext, useReducer } from 'react'
import CartReducer from './CartReducer';
 
export const CartContext = createContext();

function  ConteProvider({children}) {       //in main.jsx file i hava pass <app.jsx> in conteProvider as a children
 const [cart, dispatch] = useReducer(CartReducer, []);//card => state means data
                                                      //dispatch=> invoke(produce) reducer action
                                                      //CardReducer: This is a function (the "reducer") that defines how the state should change based on different actions.
                                                      //[], you're saying, "This list starts off empty, but we will update it later using the dispatch function when actions 
                                                      //occur (like adding, removing, or modifying items in the list)."
                                           
  return (
    <CartContext.Provider value={{cart , dispatch}}>
        {children}
    </CartContext.Provider>
  )
}

export default ConteProvider


  








// import { createSlice } from '@reduxjs/toolkit'

// const initialState = [];

// export const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         addToCart(state, action) {
//             state.push(action.payload)
//         },
//         deleteFromCart(state, action) {
//             return state.filter(item => item.id != action.payload.id);
//         },
//         incrementQuantity: (state, action) => {
//             state = state.map(item => {
//                 if (item.id === action.payload) {
//                     item.quantity++;
//                 }
//                 return item;
//             });
//         },
//         decrementQuantity: (state, action) => {
//             state = state.map(item => {
//                 if (item.quantity !== 1) {
//                     if (item.id === action.payload) {
//                         item.quantity--;
//                     }
//                 }
//                 return item;

//             })
//         },
//     },
// })

// // Action creators are generated for each case reducer function
// export const { addToCart, deleteFromCart, incrementQuantity, decrementQuantity } = cartSlice.actions

// export default cartSlice.reducer