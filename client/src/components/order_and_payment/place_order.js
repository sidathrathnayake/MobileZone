import React, { Component} from 'react'
import CheckoutSteps from '../order_and_payment/checkout_steps';
import UserNavigation from '../Navigation/User_Navigation';
import Footer from '../Footer/Footer';


class placeOrder extends Component {
  
  confirmOrder() {
    window.location='/orderSum'
  }
  render (){
    return(
      <div>
        <UserNavigation/>
        <br/><br/><br/><br/>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <div className="row top">
          <div className="col-8">
            <ul>
              <li>
                <div className="card card-body">
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name:</strong> {localStorage.getItem("Shipping_name")} <br />
                    <strong>Address: </strong> {localStorage.getItem("Shipping_address")},
                    {localStorage.getItem("Shipping_country")}
                    ,{localStorage.getItem("Shipping_postalCode")}
                  </p>
                </div>
              </li>
              <li>
                <div className="card card-body">
                  <h2>Payment</h2>
                  <p>
                    <strong>Method:</strong>{localStorage.getItem("payment_type")}
                  </p>
                </div>
              </li>
              <li>
                <div className="card card-body">
                  <h2>Order Items</h2>
                  {/* <ul>
                    {cart.cartItems.map((item) => (
                      <li key={item.product}>
                        <div className="row">
                          <div className="min-30">
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </div>
  
                          <div>
                            {item.qty} x ${item.price} = ${item.qty * item.price}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul> */}
                </div>
              </li>
            </ul>
          </div>
          <div className="col-3">
            <div className="card card-body">
              <ul>
                <li>
                  <h2>Order Summary</h2>
                </li>
                <li>
                  <div className="row">
                    <div>Items Total</div>
                    <div>${localStorage.getItem("order_Total")}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Shipping</div>
                    <div>${localStorage.getItem("Shipping_charge")}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Tax</div>
                    <div>${localStorage.getItem("tax_charge")}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>
                      <strong> Order Total</strong>
                    </div>
                    <div>
                      <strong>${localStorage.getItem("total_charge")}</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={this.confirmOrder}
                    className="primary block"
                    // disabled={cart.cartItems.length === 0}
                  >
                    Place Order
                  </button>
                </li>
                {/* {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant="danger">{error}</MessageBox>} */}
              </ul>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default placeOrder  ;
