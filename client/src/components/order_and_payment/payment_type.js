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
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <form className="form" onSubmit={this.onSubmit}>
          <div>
            <h1>Payment Method</h1>
          </div>
          <div>
            <div>
              <input type="radio" id="paypal" value="PayPal" name="payType" required checked onChange={this.onChange}/>
              <label htmlFor="paypal">PayPal</label>
            </div>
          </div>
          <div>
            <div>
              <input type="radio" id="stripe" value="Stripe" name="payType" required onChange={this.onChange}/>
              <label htmlFor="stripe">Stripe</label>
            </div>
          </div>
          <div>
            <label />
            <button className="primary" type="submit">
              Continue
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default paymentType  ;
