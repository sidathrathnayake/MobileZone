import React, { Component} from 'react';
import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";
/**Importing the header */
import User_Navigation from '../../components/Navigation/User_Navigation';
import Footer from '../Footer/Footer';

const dtotal = localStorage.getItem("total_charge")/200;

class orderSummary extends Component {
  
  onPay(details) {
    let Shipping = {
      fullName:localStorage.getItem("Shipping_name"),
      address:localStorage.getItem("Shipping_address"),
      postalCode:localStorage.getItem("Shipping_postalCode"),
      country:localStorage.getItem("Shipping_country")
    }
    
    axios.post('http://localhost:5000/shipping/add', Shipping)
    .then(response => {
      let Order = {
        shippingId: response.data.data.shippingId,
        user:localStorage.getItem("userEmail"),
        totalItemValue:localStorage.getItem("order_Total"),
        shippingCharge:localStorage.getItem("Shipping_charge"),
        taxCharge:localStorage.getItem("tax_charge"),
        totalCharge:localStorage.getItem("total_charge"),
        paymentStatus:'Paid'
      }
      axios.post('http://localhost:5000/order/add', Order)
      .then(response => {
        alert(details.payer.name.given_name+", Your Payment is successful");
        window.location='/userprofile'
        localStorage.removeItem("cart");
      })
      .catch(error => {
        alert(error.message)
      })
    })
    .catch(error => {
      alert(error.message)
    })
    // 
  }
  
  render (){

    
    
    return(

     

      <div>
        <User_Navigation/>
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
                    <div>Items Total:&emsp;&emsp;&emsp;&emsp;&ensp;&nbsp;&nbsp;Rs.{localStorage.getItem("order_Total")}</div>
                  </div>
                
               
                  <div className="row ordTotal">
                    <div>Shipping Charge:&emsp;&emsp;&nbsp;&nbsp;&nbsp;Rs.{localStorage.getItem("Shipping_charge")}</div>
                    <div></div>
                  </div>
                
                  <div className="row ordTotal">
                    <div>Tax Charge:&emsp;&emsp;&emsp;&emsp;&ensp;&ensp;&nbsp;Rs.{localStorage.getItem("tax_charge")}</div>
                    <div></div>
                  </div>
              
                  <div className="row ordTotal">
                    <div>
                      <strong> Order Total:&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Rs.{localStorage.getItem("total_charge")}</strong>
                    </div>
                  </div>
                
                <PayPalButton
                  amount= {dtotal}
                  shippingPreference="NO_SHIPPING"
                  onSuccess={(details) => {
                    this.onPay(details);
                    
                  }}
                  catchError={(error)=>{
                    alert(" Your Payment is Failed" + error);
                  }}
                  options={{
                    clientId:
                      "AWdumZE2qLSTNAvgafaXJjYYAerDtMNtpOINp2-E6R6ZTs9g9jhMge0d9a83LWJO7yTLdt-wk_eBBpUC"
                  }}
                />
                </div>
            </div>
          </div>
        <Footer/>
      </div>
    );
  }
}



export default orderSummary  ;
