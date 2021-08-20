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
                 <nav>
                    <h1 className="nav-home"><a href="/">Mobile<span>Zone</span></a></h1>
                    <ul>  
                        <li>
                        <Link to="/cart" className="cart__link">
                            <i className="fas fa-shopping-cart"></i>
                                <span>
                                Cart <span className="cartlogo__badge">{getCartCount()}</span>
                                </span>
                        </Link>
                        </li>
                        <li><a href="/userlogin">Sign out</a></li>
                    </ul>
                </nav>
        </div>
    )
}

export default Cart_Navigation
