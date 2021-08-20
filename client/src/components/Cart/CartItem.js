import "../../css/cart.css";
import { Link } from "react-router-dom";

const CartItem = ({ item, qtyChangeHandler, removeHandler }) => {
    return (
    <div className="cartitem">
        <div className="cartitem__image">
            {/* <img src={item.imageUrl} alt={item.name} /> */}
        </div>
        <Link to={`/itemv/${item.itemv}`} className="cartItem__name">
            <p>{item.itemName}</p>
        </Link>
        <p className="cartitem__price">${item.itemPrice}</p>
        <select
            value={item.qty}
            onChange={(e) => qtyChangeHandler(item.itemv, e.target.value)}
            className="cartItem__select"
        >
            {[...Array(item.countInStock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
                {x + 1}
            </option>
            ))}
        </select>
        <button
            className="cartItem__deleteBtn"
            onClick={() => removeHandler(item.itemv)}
        >
            <i className="fas fa-trash"></i>
        </button>
    </div>
    )
}

export default CartItem
