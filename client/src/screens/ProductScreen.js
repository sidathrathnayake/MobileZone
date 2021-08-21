import "../css/cart.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Actions
import { getProductDetails } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";


/**Importing the header */
import Cart_Navigation from '../components/Navigation/Cart_Navigation';
/**Importing the footer */
import Footer from '../components/Footer/Footer';

import image1 from '../components/Category/images/abc.jpg'

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, itemv } = productDetails;

  useEffect(() => {
    if (itemv && match.params.id !== itemv._id) {
      dispatch(getProductDetails(match.params.id));
    }
  }, [dispatch, match, itemv]);

  const addToCartHandler = () => {
    dispatch(addToCart(itemv._id, qty));
    history.push(`/cart`);
  };

    return (
      <div>
        <Cart_Navigation/><br></br><br></br>
      <div className="container product-screen">
      <div className="productscreen">
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <>
          <div className="productscreen__left">
            <div className="left__image">
              <img src={`/uploads/${itemv.itemImage}`} style={{height:"320px",marginLeft:"40%",borderRadius:"7px",width:"50%"}} />
              {/* <img src={product.imageUrl} alt={product.name} /> */}
            </div>
            <div className="left__info">
              <p className="left__name">{itemv.itemName}</p>
              <p className="left__price-description">Price : Rs. {itemv.itemPrice}.00</p>
              <p className="left__price-description">Description : {itemv.description}</p>
            </div>
          </div>
          <div className="productscreen__right">
            <div className="right__info">
              <p>
                Price :
                <span>Rs. {itemv.itemPrice}.00</span>
              </p>
              <p>
                Status :
                <span>
                  {itemv.countInStock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>
              <p>
                Qty : 
                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                  {[...Array(itemv.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </p>
              <p>
                <button type="button" className="add-to-cart" onClick={addToCartHandler}>
                  Add To Cart
                </button>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
    </div><br></br>
    <Footer/>
    </div>
    )
}

export default ProductScreen
