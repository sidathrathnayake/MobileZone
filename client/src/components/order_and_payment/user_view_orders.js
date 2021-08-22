import React, {Component} from 'react';
import axios from 'axios';
import UserNavigation from '../Navigation/User_Navigation';
import Footer from '../Footer/Footer';
import dateformat from 'dateformat';

class userViewOrders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/order/viewCustOrd/john')
    .then(response => {
      this.setState({ orders: response.data.data })
    })
  }

  search() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
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
        <UserNavigation/>
        <div className="container">
          <h1 id="ConfH">VIEW ORDER DETAILS</h1><br/>

          <input type="text" id="myInput" onkeyup="search()" placeholder="Search for names.." title="Type in a name"/>
          <table className="userOrderTable" id="userOrder">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>Order Date</th>
                <th>Total Charge</th>
                <th>Payment Status</th>
                <th>Delivery Status</th>\
              </tr>
            </thead>
            <tbody>
              {this.state.orders.length > 0 && this.state.orders.map((item, index) => (
              <tr key={index}>
                <td>{item.orderId}</td>
                <td>{item.orderDate}</td>
                <td>{item.totalCharge}</td>
                <td>{item.paymentStatus}</td>
                <td>{item.deliveryStatus}</td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default userViewOrders;