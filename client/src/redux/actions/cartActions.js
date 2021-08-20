import * as actionTypes from "../constants/cartConstants";
import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
  
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
  
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  };
  
  export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
      type: actionTypes.REMOVE_FROM_CART,
      payload: id,
    });
  
    localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  };