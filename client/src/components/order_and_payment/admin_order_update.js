import React, { Component } from 'react'
import Sidebar from '../Navigation/Sidebar';
import '../../css/payment.css'
import axios from 'axios';
import dateformat from 'dateformat';
import Select from 'react-select';

/**Defining the initial state research paper amount */
const initialState = {
    orders: {},
    shippingAddress:{},
    deliveryStatus:'',
    deliveryOptions:[{value:'Not Delivered',label:'Not Delivered'},
                    {value:'In Progress',label:'In Progress'},
                    {value:'On the Way',label:'On the Way'},
                    {value:'Delivered',label:'Delivered'}]
}

export default class admin_update_orders extends Component {
    /**Constructor for getting the records */
    constructor(props) {
        super(props);
        this.onDeliveryChange = this.onDeliveryChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }
    
    componentDidMount() {
        axios.get(`http://localhost:5000/order/viewOne/${this.props.match.params.orderId}`)
        .then(response => {
            this.setState({ orders: response.data.data })
            this.setState({deliveryStatus: response.data.data.deliveryStatus})
            axios.get(`http://localhost:5000/shipping/viewOne/${this.state.orders.shippingId}`)
            .then(response => {    
                this.setState({shippingAddress: response.data.data})
            })
            .catch(error => {
                alert(error.message)
            })
            console.log(this.state.orders);
        })
        .catch(error => {
          alert(error.message)
        })
    }
    
    onDeliveryChange(e) {
        this.setState({ deliveryStatus: e.value });
    }

    onSubmit(e) {
        e.preventDefault();
        
        let updateOrder = {deliveryStatus:this.state.deliveryStatus}
        console.log('DATA TO SEND', updateOrder);
        axios.put(`http://localhost:5000/order/update/${this.props.match.params.orderId}`, updateOrder)
        .then(response => {
            window.location = '/adminViewOrder'
            alert('Data successfully updated!!!')
        })
        .catch(error => {
            console.log(error.message);
            alert(error.message)
        })
         
      }

    render() {
        return (
            <div className="wrapper">
                <Sidebar/> 
                <div className="adminhome-container" style={{backgroundColor:'rgba(0,0,0,0.25)'}}>
          <div className="adminnav">
            <h1>
              <a href="#">
                <i className="fa fa-coins"></i> &nbsp;&nbsp;Update Orders
              </a>
            </h1>
            
          </div>
                    <div>
                        <div className="orderUpdateCont" style={{ marginTop: "1%",marginBottom: "1%" , overflow:"visible"  }}>
                                    <form style={{padding:'20px'}} onSubmit={this.onSubmit}>
                                        <div class="form-group row updateOrdRow" >
                                            <label for="form-control-orderId" class="col-4 form-label updateLabel">Order Id</label>
                                            <div class="col-6">
                                                <input type="text" className="form-control updateInput" id="form-control-orderId" name="orderId" value={this.state.orders.orderId} readOnly/>
                                            </div>
                                        </div><br/>
                                        <div class="form-group row updateOrdRow" >
                                            <label for="form-control-shippingAddress" class="col-4 form-label updateLabel">Shipping Id</label>
                                            <div class="col-6">
                                                <input type="text" className="form-control updateInput" id="form-control-shippingAddress" name="shippingAddress" value={this.state.shippingAddress.address+', '+this.state.shippingAddress.country+', '+this.state.shippingAddress.postalCode} readOnly/>
                                            </div>
                                        </div><br/>
                                        <div class="form-group row updateOrdRow" >
                                            <label for="form-control-user" class="col-4 form-label updateLabel">User Email</label>
                                            <div class="col-6">
                                                <input type="text" className="form-control updateInput" id="form-control-user" name="user" value={this.state.orders.user} readOnly/>
                                            </div>
                                        </div><br/>
                                        <div class="form-group row updateOrdRow" >
                                            <label for="form-control-orderDate" class="col-4 form-label updateLabel">Order Date</label>
                                            <div class="col-6">
                                                <input type="text" className="form-control updateInput" id="form-control-orderDate" name="orderDate" value={dateformat(this.state.orders.orderDate)} readOnly/>
                                            </div>
                                        </div><br/>
                                        <div class="form-group row updateOrdRow" >
                                            <label for="form-control-totalItemValue" class="col-4 form-label updateLabel">Total Item Value</label>
                                            <div class="col-6">
                                                <input type="text" className="form-control updateInput" id="form-control-totalItemValue" name="totalItemValue" value={"Rs."+this.state.orders.totalItemValue} readOnly/>
                                            </div>
                                        </div><br/>
                                        <div class="form-group row updateOrdRow" >
                                            <label for="form-control-shippingCharge" class="col-4 form-label updateLabel">Shipping Charge</label>
                                            <div class="col-6">
                                                <input type="text" className="form-control updateInput" id="form-control-shippingCharge" name="shippingCharge" value={"Rs."+this.state.orders.shippingCharge} readOnly/>
                                            </div>
                                        </div><br/>
                                        <div class="form-group row updateOrdRow" >
                                            <label for="form-control-taxCharge" class="col-4 form-label updateLabel">Tax Charge</label>
                                            <div class="col-6">
                                                <input type="text" className="form-control updateInput" id="form-control-taxCharge" name="taxCharge" value={"Rs."+this.state.orders.taxCharge} readOnly/>
                                            </div>
                                        </div><br/>
                                        <div class="form-group row updateOrdRow" >
                                            <label for="form-control-totalCharge" class="col-4 form-label updateLabel">Total Charge</label>
                                            <div class="col-6">
                                                <input type="text" className="form-control updateInput" id="form-control-totalCharge" name="totalCharge" value={"Rs."+this.state.orders.totalCharge} readOnly/>
                                            </div>
                                        </div><br/>  
                                        <div class="form-group row updateOrdRow" >
                                            <label for="form-control-paymentStatus" class="col-4 form-label updateLabel">Payment Status</label>
                                            <div class="col-6">
                                                <input type="text" className="form-control updateInput" id="form-control-paymentStatus" name="paymentStatus" value={this.state.orders.paymentStatus} readOnly/>
                                            </div>
                                        </div><br/>
                                        <div class="form-group row updateOrdRow" >
                                            <label for="form-control-deliveryStatus" class="col-4 form-label updateLabel">Delivery Status</label>
                                            <div class="col-6">
                                                <input type="text" className="form-control updateInput" id="form-control-deliveryStatus" name="deliveryStatus" value={this.state.deliveryStatus} readOnly/>
                                            </div>
                                            <Select  options={this.state.deliveryOptions} placeholder='Update Delivery Status' onChange={this.onDeliveryChange} className="basic-single deliverySelect"/>
                                        </div><br/>
                                        <button type="submit" style={{ marginTop: "14.6%", marginBottom: "10%",overflow:"visible" }} class="dark-btn" id="updateBtn">Update</button>
                                    </form>
                                </div>
                            </div>
                    </div>
            </div>
        )
    }
}
