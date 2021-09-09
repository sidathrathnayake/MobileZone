/**Importing the actionTypes from the cartConstants */
import * as actionTypes from "../constants/cartConstants";
/**Imorting the axios package */
import axios from "axios";
/**Creating and exporting a constant for the addToCart method */
export const addToCart = (id, qty) => async (dispatch, getState) => {
    /**Http URL */
    const { data } = await axios.get(`http://localhost:5000/get-item-by-id/${id}`);
    /**Dispatch */
    dispatch({
      type: actionTypes.ADD_TO_CART,
      payload: {
        data: data.data._id,
        itemName: data.data.itemName,
        itemPrice: data.data.itemPrice,
        imageName: data.data.imageName,
        countInStock: data.data.countInStock,
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
export const resetCart = () => (dispatch,getState) => {
  dispatch({
    type: actionTypes.CART_RESET,
    payload : null,
  });
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
}