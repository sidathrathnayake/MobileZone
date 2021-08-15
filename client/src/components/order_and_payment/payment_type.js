import React, { Component} from 'react'
import CheckoutSteps from '../order_and_payment/checkout_steps';
import UserNavigation from '../Navigation/User_Navigation';
import Footer from '../Footer/Footer';

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
    localStorage.setItem("payment_type", this.state.payType);
    console.log('Payment Method', paymentMethod);
    window.location='/placeOrder'
  }
  render (){
    return(
      <div>
        <UserNavigation/>
        <br/><br/><br/><br/>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className="shippingForm">
          <form className="form shipBack" onSubmit={this.onSubmit}>
            <div>
              <h1 className="orderHead">Payment Method</h1>
            </div>
            <br/>
            <div>
              <label>Payment Type</label>
              <select class="form-select orderInput">
                <option value="PayPal"> PayPal </option>
              </select>
            </div>
            <br/>
            <div>
              <label />
              <button className="nextBtn" type="submit">
                Next
              </button>
            </div>
          </form>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default paymentType  ;
