const CartReducer = (state, action) => {
  switch (action.type) {
    case "Add":
        return [...state, action.item]
    case "Remove":
    case "Increase":
    case "Decrease":

    default:
      state;
  } 
};

export default CartReducer;

// import { configureStore } from '@reduxjs/toolkit'
// import { cartSlice } from './cartSlice'

// export const store = configureStore({
//   reducer: {
//     cart : cartSlice
//   },
// })
