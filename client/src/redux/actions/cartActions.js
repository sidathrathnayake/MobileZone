/**Importing the actionTypes from the cartConstants */
import * as actionTypes from "../constants/cartConstants";
/**Imorting the axios package */
import axios from "axios";
/**Creating and exporting a constant for the addToCart method */
export const addToCart = (id, qty) => async (dispatch, getState) => {
    /**Http URL */
    const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
    /**Dispatch */
    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: {
        itemv: data.itemv._id,
        itemName: data.itemv.itemName,
        itemPrice: data.itemv.itemPrice,
        countInStock: data.itemv.countInStock,
        qty,
      },
    });
  /**Storing the cart items in the local storage */
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
/**Exporting and creating a method for the removeFromCart method */
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });
  /**Strong the availabe cart items */
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};