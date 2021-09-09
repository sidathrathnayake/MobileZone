import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Cart_Navigation = ({ click }) => {
    const EMPTY_CART = { cartItems: [] };
    const cart = useSelector((state) => state.cart  || EMPTY_CART);
    const { cartItems } = cart;

    const getCartCount = () => {
        return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };
    return (
        <div>
                <Link to="/cart" className="cart__link">
                    <i className="fas fa-shopping-cart"></i>
                        <span>
                            Cart <span className="cartlogo__badge">{getCartCount()}</span>
                        </span>
                </Link>               
        </div>
    )
}

export default Cart_Navigation
