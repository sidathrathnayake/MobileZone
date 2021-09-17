import React, { Component } from 'react'
import '../../css/payment.css'
// import '../../css/categoryForms.css'
import Sidebar from '../Navigation/Sidebar';
import axios from 'axios';
import dateformat from 'dateformat';

export default class Admin_View_Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
          orders: []
        }
    }
    
    componentDidMount() {
        axios.get('http://localhost:5000/order/view')
        .then(response => {
          this.setState({ orders: response.data.data })
        })
    }

    search() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("orderSearch");
        filter = input.value.toUpperCase();
        table = document.getElementsByClassName("orderTable");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[0];
            if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
            }       
        }
      }
    
    navigateToUpdateOrderPage(e, orderId) {
        window.location = `/updateOrder/${orderId}`
    }
    
    navigateToDeleteOrderPage(e, orderId) {
      window.location = `/deleteOrder/${orderId}`
    }
    
    render() {
        return (
            <div className="wrapper">
                <Sidebar/>
                <div>
                    <h1><center>Order Details</center></h1><br/>
                    <div class="searchBox adminOrderSearch">
                        <input class="searchInput" type="search" id="orderSearch" onKeyUp={this.search} placeholder="Search by Order ID"/>
                        <button class="searchButton" disabled>
                            <i class="material-icons">
                                search
                            </i>
                        </button> 
                    </div>
                    <table className="orderTable">
                        <thead>
                            <tr>
                                <th>Order ID</th>    
                                <th>User</th>
                                <th>Date</th>
                                <th>Total</th>
                                <th>Payment</th>
                                <th>Delivery</th>
                                <th>Order Update</th>
                                <th>Order Delete</th>    
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.orders.length > 0 && this.state.orders.map((item, index) => (
                                <tr>
                                    <td>
                                        <div>
                                            {item.orderId}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {item.user}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {dateformat(new Date(item.orderDate),"dd-mmm-yyyy")}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {item.totalCharge}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {item.paymentStatus}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {item.deliveryStatus}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <button id="orderBtn">
                                                Update
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <button id="orderBtn">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}     
                        </tbody>
                    </table><br></br>
                </div>
            </div>
        )
    }
}
