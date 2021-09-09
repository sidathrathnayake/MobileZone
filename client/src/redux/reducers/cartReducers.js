/**Importing the actionTypes from the cartConstants */
import * as actionTypes from "../constants/cartConstants";
/**Creating a constant for cart intial state */
const CART_INITIAL_STATE = {
  cartItems: [],
};
/**Exporting and creating a constant for cartReducer */
export const cartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      /**Creating a item constant */
      const item = action.payload;
      /**Creating a constant for the exist item */
      const existItem = state.cartItems.find((x) => x.data === item.data);
      /**Condition for exist item */
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.data === existItem.data ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.data !== action.payload),
      };
    case actionTypes.CART_RESET:
      return {
        ...state,
        error:'',cartItems: []
      };
    default:
      return state;
  }
};