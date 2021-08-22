/**Importing the css file */
import "../../css/cart.css";
/**Imrpoting the Link from the react-router-dom */
import { Link } from "react-router-dom";
import image1 from '../../components/Category/images/abc.jpg'

/**Functional component starts here */
const CartItem = ({ item, qtyChangeHandler, removeHandler }) => {
    return (
        <div className="cartitem">
            <div className="cartitem__image">
                {/* <img src={`/uploads/${item.itemImage}`} /> */}
                <img src={image1} style={{height:"50px",marginLeft:"0%",borderRadius:"7px",width:"150%",marginTop:"-30%"}}/>
                {/* <img src={item.imageUrl} alt={item.name} /> */}
            </div>
            <Link to={`/view-product/${item.itemv}`} className="cartItem__name">
                <p><center>{item.itemName}</center></p>
            </Link>
            <p className="cartitem__price">Rs. {item.itemPrice}.00</p>
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
                <i className="fas fa-trash trash-cart"></i>
            </button>    
        </div>
    
    )
}

export default CartItem
