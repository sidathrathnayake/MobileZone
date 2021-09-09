import React, { Component } from 'react'
import UserNavigation from '../Navigation/User_Navigation';
import UserCard from '../Profile/User_Card';
import Footer from '../Footer/Footer';
import UserOrders from '../order_and_payment/user_view_orders'

export default class User_Profile extends Component {
    render() {
        return (
            <div>
                <UserNavigation/>
                <div className="wrapper">
                    <UserCard/>
                    <div className="user-container">
                    <h1 id="ordH">VIEW ORDER DETAILS</h1><br/>
                        <UserOrders/>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}
