import React, { Component } from 'react'
import Sidebar from '../Navigation/Sidebar';
import '../../css/payment.css'
import axios from 'axios';
import dateformat from 'dateformat';

/**Defining the initial state research paper amount */
const initialState = {
    orders: {},
    shippingAddress:{}
}

export default class admin_delete_orders extends Component {
    /**Constructor for getting the records */
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = initialState;
    }
    
    componentDidMount() {
        axios.get(`http://localhost:5000/order/viewOne/${this.props.match.params.orderId}`)
        .then(response => {
            this.setState({ orders: response.data.data })
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
    

    onSubmit(e) {
        e.preventDefault();
        
        axios.delete(`http://localhost:5000/order/delete/${this.props.match.params.orderId}`)
        .then(response => {
            window.location = '/adminViewOrder'
            alert('Data successfully Deleted!!!')
        })
        .catch(error => {
            console.log(error.message);
            alert(error.message)
        })
         
      }

    render() {
        return (
            <div className="wrapper" >
                <Sidebar/> 
                <div className="adminhome-container" style={{backgroundColor:'rgba(0,0,0,0.25)'}}>
          <div className="adminnav">
            <h1>
              <a href="#">
                <i className="fa fa-coins"></i> &nbsp;&nbsp;Delete Orders
              </a>
            </h1>
            
          </div>
                    <div>
                        <div className="orderUpdateCont" style={{ marginTop: "15%",marginBottom: "16.6%"  }}>
                            <form style={{padding:'20px'}} onSubmit={this.onSubmit}>
                                <div class="form-group row updateOrdRow" style={{ marginBottom: "5px" }}>
                                    <label for="form-control-orderId" class="col-4 form-label updateLabel">Order Id</label>
                                    <div class="col-6">
                                        <input type="text" className="form-control updateInput" id="form-control-orderId" name="orderId" value={this.state.orders.orderId} readOnly/>
                                    </div>
                                </div><br/>
                                <div class="form-group row updateOrdRow" style={{ marginBottom: "5px" }}>
                                    <label for="form-control-shippingAddress" class="col-4 form-label updateLabel">Shipping Id</label>
                                    <div class="col-6">
                                        <input type="text" className="form-control updateInput" id="form-control-shippingAddress" name="shippingAddress" value={this.state.shippingAddress.address+', '+this.state.shippingAddress.country+', '+this.state.shippingAddress.postalCode} readOnly/>
                                    </div>
                                </div><br/>
                                <div class="form-group row updateOrdRow" style={{ marginBottom: "5px" }}>
                                    <label for="form-control-user" class="col-4 form-label updateLabel">User Email</label>
                                    <div class="col-6">
                                        <input type="text" className="form-control updateInput" id="form-control-user" name="user" value={this.state.orders.user} readOnly/>
                                    </div>
                                </div><br/>
                                <div class="form-group row updateOrdRow" style={{ marginBottom: "5px" }}>
                                    <label for="form-control-orderDate" class="col-4 form-label updateLabel">Order Date</label>
                                    <div class="col-6">
                                        <input type="text" className="form-control updateInput" id="form-control-orderDate" name="orderDate" value={dateformat(this.state.orders.orderDate)} readOnly/>
                                    </div>
                                </div><br/>
                                <div class="form-group row updateOrdRow" style={{ marginBottom: "5px" }}>
                                    <label for="form-control-totalCharge" class="col-4 form-label updateLabel">Total Charge</label>
                                    <div class="col-6">
                                        <input type="text" className="form-control updateInput" id="form-control-totalCharge" name="totalCharge" value={"Rs."+this.state.orders.totalCharge} readOnly/>
                                    </div>
                                </div><br/>  
                                <div class="form-group row updateOrdRow" style={{ marginBottom: "5px" }}>
                                    <label for="form-control-paymentStatus" class="col-4 form-label updateLabel">Payment Status</label>
                                    <div class="col-6">
                                        <input type="text" className="form-control updateInput" id="form-control-paymentStatus" name="paymentStatus" value={this.state.orders.paymentStatus} readOnly/>
                                    </div>
                                </div><br/>
                                <div class="form-group row updateOrdRow" style={{ marginBottom: "5px" }}>
                                    <label for="form-control-deliveryStatus" class="col-4 form-label updateLabel">Delivery Status</label>
                                    <div class="col-6">
                                        <input type="text" className="form-control updateInput" id="form-control-deliveryStatus" name="deliveryStatus" value={this.state.orders.deliveryStatus} readOnly/>
                                    </div>
                                </div><br/>
                                <button type="submit" class="dark-btn">Delete</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
