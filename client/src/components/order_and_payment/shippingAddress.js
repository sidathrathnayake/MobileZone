import React, { Component} from 'react'
import axios from 'axios';
import CheckoutSteps from './checkout_steps';

const initialState = {
  name: '',
  address: '',
  postalCode: 0,
  country: ''
}
class shippingAddress extends Component {
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
    let Shipping = {
      name: this.state.name,
      address: this.state.address,
      postalCode: this.state.postalCode,
      country: this.state.country
    }
    console.log('Shipping Details', Shipping);
    axios.post('http://localhost:5000/shipping/add/', Shipping)
    .then(response => {
      alert('Data successfully inserted!!!')
      window.location='/payType'
    })
    .catch(error => {
      alert(error.message)
    })
  }
  render (){
    return(
      <div>
        <br/>
        <CheckoutSteps step1 step2></CheckoutSteps>
        <form className="form" onSubmit={this.onSubmit}>
          <div>
            <h1>Shipping Address</h1>
          </div>
          <div>
            <label htmlFor="fullName">Full Name</label>
            <input type="text" id="name" placeholder="Enter Full Name" value={this.state.name} onChange={this.onChange} required/>
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input type="text" id="address" placeholder="Enter Address" value={this.state.address} onChange={this.onChange} required/>
          </div>
          <div>
            <label htmlFor="postalCode">Postal Code</label>
            <input type="text" id="postalCode" placeholder="Enter Postal Code" value={this.state.postalCode} onChange={this.onChange} required/>
          </div>
          <div>
            <label htmlFor="country">Country</label>
            <input type="text" id="country" placeholder="Enter Country" value={this.state.country} onChange={this.onChange} required/>
          </div>
          <div>
            <label />
            <button className="primary" type="submit">
              Next
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default shippingAddress;