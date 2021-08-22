/**Imorting the actionTypes from the productConstants file */
import * as actionTypes from "../constants/productConstants";
/**Importing the axios package */
import axios from "axios";
/**Exporting and creating a constant for getProductDetails method */
export const getProductDetails = id => async dispatch => {
  try {
    /**Dispatch */
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });
    /**Creating a constant for getting a product detail */
    const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
    /**Dispatch */
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
      payload: data.itemv,
    });
  } catch (error) {
    /**dispatch */
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
/**Exporting and creating a constant for removeProductDetail */
export const removeProductDetails = () => (dispatch) => {
  /**Dispatch */
  dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_RESET });
};