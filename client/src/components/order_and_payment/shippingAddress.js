import React, { Component} from 'react'
import axios from 'axios';
import UserNavigation from '../Navigation/User_Navigation';
import Footer from '../Footer/Footer';

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
    localStorage.setItem("Shipping_name", this.state.name);
    localStorage.setItem("Shipping_address", this.state.address);
    localStorage.setItem("Shipping_postalCode", this.state.postalCode);
    localStorage.setItem("Shipping_country", this.state.country);
    localStorage.setItem("Shipping_charge", parseFloat(0.05*localStorage.getItem("order_Total")).toFixed(2));
    localStorage.setItem("tax_charge", parseFloat(0.02*localStorage.getItem("order_Total")).toFixed(2));
    let total = parseFloat(localStorage.getItem("order_Total")) + parseFloat(localStorage.getItem("Shipping_charge"))+parseFloat(localStorage.getItem("tax_charge"));
    localStorage.setItem("total_charge",total.toFixed(2) );
    window.location='/payType'
  }
  render (){
    return(
      <div>
        <UserNavigation/>
        <div className="orderPage">
          <div className="shippingForm">
            <form className="form shipBack" onSubmit={this.onSubmit}>
              <div>
                <h1 className="orderHead">Shipping Details</h1>
              </div>
              <br/>
              <div>
                <label htmlFor="name" class="form-label">Full Name</label>
                <input type="text" id="name" className="form-control orderInput" name="name" placeholder="Enter Your Full Name" value={this.state.name} onChange={this.onChange} required/>
              </div>
              <br/>
              <div>
                <label htmlFor="address" class="form-label">Address</label>
                <input type="text" id="address" className="form-control orderInput" name="address" placeholder="Enter Your Address" value={this.state.address} onChange={this.onChange} required/>
              </div>
              <br/>
              <div>
                <label htmlFor="postalCode" class="form-label">Postal Code</label>
                <input type="text" id="postalCode" className="form-control orderInput" name="postalCode" placeholder="Enter Postal Code" value={this.state.postalCode} onChange={this.onChange} required/>
              </div>
              <br/>
              <div>
                <label htmlFor="country" class="form-label">Country</label>
                <input type="text" id="country" className="form-control orderInput" name="country" placeholder="Enter Your Country" value={this.state.country} onChange={this.onChange} required/>
              </div>
              <br/>
              <div>
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

export default shippingAddress;