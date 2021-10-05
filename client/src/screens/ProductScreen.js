/**Importing the css file */
import "../css/cart.css";
/**Importing the useState & useEffect from react */
import { useState, useEffect } from "react";
/**Importing the useSelector & dispatch from react-redux */
import { useSelector, useDispatch } from "react-redux";
/**Importing the getProductDetails method from the productActions file */
import { getProductDetails } from "../redux/actions/productActions";
/**Importing the addToCart method from the cartActions file */
import { addToCart } from "../redux/actions/cartActions";
/**Importing the header */
import User_Navigation from '../components/Navigation/User_Navigation';
/**Importing the footer */
import Footer from '../components/Footer/Footer';

/**Functional components starting here */
const ProductScreen = ({ match, history }) => {
  /**Creating a constants for the qty and setQty */
  const [qty, setQty] = useState(1);
  /**Creating a constant for the dispatch */
  const dispatch = useDispatch();
  /**Creating a constant for the productDetails*/
  const productDetails = useSelector((state) => state.getProductDetails);
  /**Creating a constant for the loading, error & item */
  const { loading, error, data } = productDetails;
  /**useEffect */
  useEffect(() => {
    if (data && match.params.id !== data._id) {
      dispatch(getProductDetails(match.params.id));
    }
  }, [dispatch, match, data]);
  /**Cretaing a constant for the addToCartHandler */
  const addToCartHandler = () => {
    dispatch(addToCart(data._id, qty));
    history.push(`/cart`);
  };

    return (
      <div>
        <User_Navigation/><br></br><br></br>
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
                      <img src={`/itemImages/${data.imageName}`} style={{height:"320px",marginLeft:"40%",borderRadius:"7px",width:"50%"}} />
                      {/* <img src={product.imageUrl} alt={product.name} /> */}
                    </div>
                    <div className="left__info">
                      <p className="left__name">{data.itemName}</p>
                      <p className="left__price-description">Price : Rs. {data.itemPrice}.00</p>
                      <p className="left__price-description">Description : {data.itemDescription}</p>
                    </div>
                  </div>
                  <div className="productscreen__right">
                    <div className="right__info">
                      <p>
                        Price :
                        <span>Rs. {data.itemPrice}.00</span>
                      </p>
                      <p>
                        Status :
                        <span>
                          {data.countInStock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </p>
                      <p>
                        Qty : 
                        <select value={qty} onChange={(e) => setQty(e.target.value)}>
                          {[...Array(data.countInStock).keys()].map((x) => (
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
/**Exporting the functional component */
export default ProductScreen
