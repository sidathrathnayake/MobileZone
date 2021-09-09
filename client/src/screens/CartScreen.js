/**Importing the css file */
import "../css/cart.css";
/**Importing the useEffect from react */
import { useEffect } from "react";
/**Importing the useSelector & useDispatch from react-redux */
import { useSelector, useDispatch } from "react-redux";
/**Importing the Link from the react-router-dom */
import { Link } from "react-router-dom";
/**Importing the CartItem file*/
import CartItem from "../components/Cart/CartItem";
/**Imorting the addToCart & removerFromCart methods from cartActions */
import { addToCart, removeFromCart, resetCart } from "../redux/actions/cartActions";
/**Importing the header */
import UserNavigation from '../components/Navigation/User_Navigation';
/**Importing the footer */
import Footer from '../components/Footer/Footer';

import { Redirect } from 'react-router-dom'

/**Functional component starts here */
const CartScreen = ({history}) => {
  /**Creating a constant for dispatch */
  const dispatch = useDispatch();
  /**Creating a cart constant to initialize to useSelector */
  const cart = useSelector((state) => state.cart);
  /**Creating a constant for the cartItems */
  const { cartItems } = cart;
  /**Using the useEffect */
  useEffect(() => {}, []);
  /**Creating a constant for changing the quantity */
  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };
  /**Creating a constant for removing items from the cart */
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };
  const resetCartHandle = () => {
    dispatch(resetCart());
  };
  /**Creating a method for getting the cart count */
  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };
  /**Creating a method for getting the subtotal of the cart */
  const getCartSubTotal = () => {
    return cartItems
      .reduce((itemPrice, item) => itemPrice + item.itemPrice * item.qty, 0)
      .toFixed(2);
  };
  
  const abc = () => {
    history.push('/abc')
  }

  const confirmOrder = () => {
    //e.preventDefault();
    localStorage.setItem("order_Total", getCartSubTotal());
    //window.location='/shipping';
    //return <Redirect path ='/shipping'  />
    history.push('/shipping');
  }
    return (
      <div>
        <UserNavigation/><br></br><br></br>
          <>
            <div className="cartscreen">
              <div className="cartscreen__left">
                <h2>Shopping Cart</h2>
                  <div className="container cart-screen-container">
                    {cartItems.length === 0 ? (
                      <div style={{marginLeft:"0%",color:"white"}}>
                        Your Cart Is Empty <Link to="/view-category-customer-logged">Go Back</Link>
                      </div>
                    ) : (
                    cartItems.map((item) => (
                      <CartItem
                        key={item.data}
                        item={item}
                        qtyChangeHandler={qtyChangeHandler}
                        removeHandler={removeFromCartHandler}
                      />
                      ))
                    )}  
                  </div>
              </div>
              <div className="cartscreen__right">
                <div className="cartscreen__info">
                  <p>Subtotal ({getCartCount()}) items</p>  
                  <p>Rs. {getCartSubTotal()}</p>
                </div>
                <div>
                  <button type="button" onClick={confirmOrder}>Proceed To Checkout</button>
                </div>
              </div>
            </div><br></br><br></br>
          </>
        <Footer/>
      </div>
    );
};
/**Exporting the functional component */
export default CartScreen
