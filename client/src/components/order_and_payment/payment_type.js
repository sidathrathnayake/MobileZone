import React, { Component} from 'react'
import CheckoutSteps from '../order_and_payment/checkout_steps';
import UserNavigation from '../Navigation/User_Navigation';
import Footer from '../Footer/Footer';
import Select from 'react-select';

const initialState = {
  payType: ''
}
const options = [
  { value: 'PayPal', label: 'PayPal' },
]
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
    localStorage.setItem("payment_type", "PayPal");
    window.location='/placeOrder'
  }
  render (){
    return(
      <div>
        <UserNavigation/>
       <div className="orderPage">
        <div className="shippingForm">
            <form className="form shipBack" onSubmit={this.onSubmit}>
              <div>
                <h1 className="orderHead">Payment Method</h1>
              </div>
              <br/><br/>
              <div class="form-group selectArea">
                <label>Payment Type</label>
                <Select label="Single select" className="orderSelect" options={options} />
              </div>
              <br/>
              <div>
                <label />
                <button className="btn btn-outline-light nxtBtn" type="submit">
                  Next
                </button>
              </div>
            </form>
          </div>
       </div>
        <Footer/>
      </div>
    );
  }
}

export default paymentType  ;
