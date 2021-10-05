import React, { Component} from 'react'
import UserNavigation from '../Navigation/User_Navigation';
import Footer from '../Footer/Footer';


class placeOrder extends Component {
  
  confirmOrder() {
    window.location='/orderSum'
  }
  render (){
    return(
      <div>
        <UserNavigation/>
        <div className="row orderPage">
          <div className="col-8">
                <div className="card card-body orderCard">
                <h2 id="ordSummaryH2">Shipping Details</h2>
                <hr id="hrLine"/>
                  <p className="ordSummary">
                    <strong>Name:</strong>&emsp;&emsp;&ensp;&nbsp;&ensp;&ensp;&nbsp;{localStorage.getItem("Shipping_name")} <br />
                    <strong>Address: </strong>&emsp;&emsp;&nbsp;{localStorage.getItem("Shipping_address")}<br />
                    <strong>Postal Code: </strong>&nbsp;{localStorage.getItem("Shipping_postalCode")}<br />
                    <strong>Country: </strong>&emsp;&emsp;&nbsp;{localStorage.getItem("Shipping_country")}<br />
                  </p>
                </div>
                <br/>
                <div className="card card-body orderCard">
                  <h2 id="ordSummaryH2">Payment Method</h2>
                  <hr id="hrLine"/>
                  <p className="ordSummary">
                    <strong>Method:</strong>&emsp;&emsp;&emsp;{localStorage.getItem("payment_type")}
                  </p>
                </div>
          </div>
          <div className="col-3">
            <div className="card card-body totalBody">
                  <h2 id="ordSummaryH2">Order Summary</h2>
                  <hr id="hrLine"/>
                  <div className="row ordTotal">
                    <div>Items Total:&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp;&nbsp;${localStorage.getItem("order_Total")}</div>
                  </div>
                
               
                  <div className="row ordTotal">
                    <div>Shipping Charge:&emsp;&emsp;&nbsp;&nbsp;&nbsp;${localStorage.getItem("Shipping_charge")}</div>
                    <div></div>
                  </div>
                
                  <div className="row ordTotal">
                    <div>Tax Charge:&emsp;&emsp;&emsp;&emsp;&ensp;&ensp;&nbsp;${localStorage.getItem("tax_charge")}</div>
                    <div></div>
                  </div>
              
                  <div className="row ordTotal">
                    <div>
                      <strong> Order Total:&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${localStorage.getItem("total_charge")}</strong>
                    </div>
                  </div>
                
                  <button type="button" className="btn" id="placeOrderbtn" onClick={this.confirmOrder} >
                    Place Order
                  </button>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default placeOrder  ;
