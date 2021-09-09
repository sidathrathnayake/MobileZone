/**Importing actionTypes from productConstants */
import * as actionTypes from "../constants/productConstants";
/**Exporting and creating a constant for getProductDetailsReducer */
export const getProductDetailsReducer = (state = { data: {} }, action) => {
  /**Switch case for GET_PRODUCT_DETAILS_REQUEST  */
  switch (action.type) {
    case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
      };
    /**Switch case for GET_PRODUCT_DETAILS_SUCCESS  */
    case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
      return {
        data: action.payload,
        loading: false,
      };
    /**Switch case for GET_PRODUCT_DETAILS_FAIL  */
    case actionTypes.GET_PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    /**Switch case for GET_PRODUCT_DETAILS_RESET  */
    case actionTypes.GET_PRODUCT_DETAILS_RESET:
      return {
        data: {},
      };
    default:
      return state;
  }
};