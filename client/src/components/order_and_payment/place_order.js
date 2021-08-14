import React, { Component} from 'react'
import CheckoutSteps from '../order_and_payment/checkout_steps';

const initialState = {
  payType: ''
}
class paymentType extends Component {
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
        <br/>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <div className="row top">
          <div className="col-2">
            <ul>
              <li>
                <div className="card card-body">
                  <h2>Shipping</h2>
                  <p>
                    <strong>Name:</strong> get fullName <br />
                    <strong>Address: </strong> get address,
                     get postalCode
                    ,get country
                  </p>
                </div>
              </li>
              <li>
                <div className="card card-body">
                  <h2>Payment</h2>
                  <p>
                    <strong>Method:</strong> get paymentMethod
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
          <div className="col-1">
            <div className="card card-body">
              <ul>
                <li>
                  <h2>Order Summary</h2>
                </li>
                <li>
                  <div className="row">
                    <div>Items</div>
                    <div>$get price</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Shipping</div>
                    <div>$calculate shipping charge</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Tax</div>
                    <div>$calculate tax</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>
                      <strong> Order Total</strong>
                    </div>
                    <div>
                      <strong>$calculate total</strong>
                    </div>
                  </div>
                </li>
                <li>
                  <button
                    type="button"
                    // onClick={placeOrderHandler}
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
      </div>
    );
  }
}

export default paymentType  ;
