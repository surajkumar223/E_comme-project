const CartReducer = (state, action) => {
  switch (action.type) {
    case "Add":
        return [...state, action.item]
    case "Remove":
         return state.filter(p=>p.product.id !== action.id)
    case "Increase":
      // Increase the quantity of the item (assuming items have a quantity property)
      // return state.map((item) =>
      //   item.id === action.item
      //     ? item.quantity + 1 
      //     : item
      // );
    case "Decrease":
       // Decrease the quantity of the item (if quantity > 1, otherwise remove the item)
      return state.map((item) =>
        item.id === action.item.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0); // Remove item if quantity is 0

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
