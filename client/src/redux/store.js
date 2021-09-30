/**Imorting the creatStore,combineReducers,applymiddleware from redux */
import { createStore, combineReducers, applyMiddleware } from "redux";
/**Importing thunk from the redux-thunk */
import thunk from "redux-thunk";
/**Importing the composeWithDecTools from the redux-devtools-extention */
import { composeWithDevTools } from "redux-devtools-extension";
/**Importing the cartReducer method from the cartReducers */
import { cartReducer } from "./reducers/cartReducers";
/**Importing the getProductDetailsReducer method from the productReducers */
import {
getProductDetailsReducer,
} from "./reducers/productReducers";
/**Functional component starts here */
const reducer = combineReducers({
    cart: cartReducer,
    getProductDetails: getProductDetailsReducer,
  });
/**Creating a constant for the middleware */  
const middleware = [thunk];
/**Creating a constant for the cartItemsInLocalStorage */
const cartItemsInLocalStorage = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];
 /**Creating a constant for the intiail state */ 
const INITIAL_STATE = {
  cart: {
    cartItems: cartItemsInLocalStorage,
  },
};
/**Creating a constant for the store */
const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);
/**Exporting the functional component */
export default store;