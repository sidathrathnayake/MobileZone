import React, {Component} from 'react';
import axios from 'axios';
import UserNavigation from '../Navigation/User_Navigation';
import dateformat from 'dateformat';

class userViewOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    }
  }
  componentDidMount() {
    axios.get(`http://localhost:5000/order/viewCustOrd/${localStorage.getItem("userEmail")}`)
    .then(response => {
      this.setState({ orders: response.data.data })
    })
  }
  search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("orderSearch");
    filter = input.value.toUpperCase();
    table = document.getElementById("userOrder");
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

  render() {
    return (
      <div>
        <div className="reportbutton">
        <div className="table-search">
            <input className="form-control"type="search" id="orderSearch" onKeyUp={this.search} placeholder="Search by Order ID"/>
          </div>
            
          </div>
          
          <table id="userOrder">
            <thead>
              <tr>
                <th class="bg-dark">Order Id</th>
                <th class="bg-dark">Order Date</th>
                <th class="bg-dark">Total Charge</th>
                <th class="bg-dark">Payment Status</th>
                <th class="bg-dark">Delivery Status</th>
              </tr>
            </thead>
            <tbody>
              {this.state.orders.length > 0 && this.state.orders.map((item, index) => (
              <tr key={index}>
                <td>{item.orderId}</td>
                <td>{dateformat(new Date(item.orderDate),"dddd-dS-mmm-yyyy")}</td>
                <td>{item.totalCharge}</td>
                <td>{item.paymentStatus}</td>
                <td>{item.deliveryStatus}</td>
              </tr>
              ))}
            </tbody>
          </table>
      </div>
    )
  }
}

export default userViewOrders;