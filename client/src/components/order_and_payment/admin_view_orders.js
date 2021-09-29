import React, { Component } from 'react'
import '../../css/payment.css'
// import '../../css/categoryForms.css'
import Sidebar from '../Navigation/Sidebar';
import axios from 'axios';
import dateformat from 'dateformat';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import logo from '../../image/allcover.png'
import title from '../../image/customerorderspdf.jpg'
import TableScrollbar from 'react-table-scrollbar';

export default class Admin_View_Orders extends Component {
    constructor(props) {
        super(props);
        this.state = {
          orders: [],
          cus_orders: []
        }
    }
    
    componentDidMount() { 
        
        this.customer_order_report();


        axios.get('http://localhost:5000/order/view')
        .then(response => {
          this.setState({ orders: response.data.data })
        })
    }

    search() {
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("orderSearch");
        filter = input.value.toUpperCase();
        table = document.getElementById("orderTable");
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
        window.location = `/adminUpdateOrder/${orderId}`
    }
    
    navigateToDeleteOrderPage(e, orderId) {
      window.location = `/adminDeleteOrder/${orderId}`
    }


    async customer_order_report(){

        await axios.get('http://localhost:5000/category/get-orders-weekly-customer').then((res) => {
    
            if(res.data.success){
                this.setState({
                    cus_orders:res.data.cus_orders
                })
            }
            console.log(this.state.cus_orders);
        })
    
    }
    
    customerOrderPdf = () =>{
        var doc = new jsPDF('portrait', 'px', 'a4', 'false');
        doc.rect(20, 20, doc.internal.pageSize.width - 40, doc.internal.pageSize.height - 40, 'S');
        doc.addFont('ComicSansMS', 'Comic Sans', 'normal');
        doc.setFont('Comic Sans');
        doc.setFontSize(22);
        doc.setTextColor(26, 40, 88);
        doc.addImage(title, 'png', 25,25,395,50)
        
        doc.addImage(logo, 'png', 180,90,100,50)
        doc.autoTable({
            margin: {top: 150},
            styles: {overflow: 'linebreak'},
            html: '#customerOrders',
        })
        doc.save('Weekly Customer Orders.pdf');
    
        this.props.history.push("/adminViewOrder");
    }

    
    render() {
        return (
            <div className="wrapper">
                <Sidebar/>
                <div className="adminhome-container">
          <div className="adminnav">
            <h1>
              <a href="/userdetails">
                <i className="fa fa-coins"></i> Orders
              </a>
            </h1>
            
          </div><div className="reportbutton">
          <div class="table-search">
                        <input class="form-control" type="search" id="orderSearch" onKeyUp={this.search} placeholder="Search by Order ID"/>
                         
                    </div>
          <button style={{height:'60px'}} className="btn" onClick={this.customerOrderPdf} id="right-panel-btn">
              {" "}
              Customer Orders
            </button>
            <button style={{height:'60px'}} className="btn" onClick={this.goPrint} id="right-panel-btn">
              {" "}
              Mata sure na
            </button>
            
          </div>
          <div className="table-container">
          <TableScrollbar rows={8}>
                    <table id="orderTable">
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
                                            <button class="btn edit-btn-category" onClick={e => this.navigateToUpdateOrderPage(e, item.orderId)}>
                                            <i class="far fa-edit"></i> &nbsp; Update
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            <button class="btn delete-btn-category" onClick={e => this.navigateToDeleteOrderPage(e, item.orderId)}>
                                            <i class="far fa-trash-alt"></i> &nbsp; Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}     
                        </tbody>
                    </table>
                    </TableScrollbar>
                    
                    <br></br>
                    </div>
                    <table id="customerOrders" style={{display:"none"}}>
                        <thead>
                            <tr>
                                <th>Order ID</th>    
                                <th>User</th>
                                <th>Date</th>
                                <th>Total</th>  
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.cus_orders.length > 0 && this.state.cus_orders.map((item, index) => (
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
                                    
                                </tr>
                            ))}     
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
