import React, { Component} from 'react'
import CheckoutSteps from '../order_and_payment/checkout_steps';
import { PayPalButton } from "react-paypal-button-v2";
import UserNavigation from '../Navigation/Normal_Navigation';
import Footer from '../Footer/Footer';

const initialState = {
  payType: ''
}
class orderSummary extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = initialState;
  }
  
  onChange(e) {
   this.setState({ [e.target.name]: e.target.value })
  }
  
  onSubmit(e) {
    e.preventDefault();
    let paymentMethod = this.state.payType;
    console.log('Payment Method', paymentMethod);
    window.location=''
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
                    <strong>Method:</strong> {localStorage.getItem("payment_type")}
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
                <PayPalButton
                  amount={localStorage.getItem("total_charge")}
                  shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                  onSuccess={(details, data) => {
                    alert(details.payer.name.given_name+", Your Payment is successful");

                    // OPTIONAL: Call your server to save the transaction
                    return fetch("/paypal-transaction-complete", {
                      method: "post",
                      body: JSON.stringify({
                        orderID: data.orderID
                      })
                    });
                  }}
                  catchError={(error)=>{
                    alert(" Your Payment is Failed");
                  }}
                  options={{
                    clientId:
                      "AWdumZE2qLSTNAvgafaXJjYYAerDtMNtpOINp2-E6R6ZTs9g9jhMge0d9a83LWJO7yTLdt-wk_eBBpUC"
                  }}
                />
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

export default orderSummary  ;
