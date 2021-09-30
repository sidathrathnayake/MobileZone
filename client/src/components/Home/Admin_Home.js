import React, { Component } from 'react';
import Sidebar from '../Navigation/Sidebar';
import usercard from '../../image/usercard.png';
import itemcard from '../../image/itemcard.png';
import categorycard from '../../image/categorycard.png';
import ordercard from '../../image/ordercard.png';

class Admin_Home extends Component {
    render() {
        return ( 
            <div className="wrapper">
                <Sidebar/>
                
                <div className="adminhome-container">

                    <div className="admincards">

                        <a href="/userdetails">
                        <div className="admincard">
                            <div className="admincard-container">
                                <img className="admincard-image" src={usercard} alt="Card" />
                            </div>
                            <div className="admincard-details">
                                <h3>Customers</h3>
                                <p>Handle customer details.</p>
                            </div>
                        </div>
                        </a>

                        <a href="/admin-get-item">
                        <div className="admincard">
                            <div className="admincard-container">
                                <img className="admincard-image" src={itemcard} alt="Card" />
                            </div>
                            <div className="admincard-details">
                                <h3>Items</h3>
                                <p>Handle Items details.</p>
                            </div>
                        </div>
                        </a>

                        <a href="/view-category-admin">
                        <div className="admincard">
                            <div className="admincard-container">
                                <img className="admincard-image" src={categorycard} alt="Card" />
                            </div>
                            <div className="admincard-details">
                                <h3>Categories</h3>
                                <p>Handle Category details.</p>
                            </div>
                        </div>
                        </a>

                        <a href="#">
                        <div className="admincard">
                            <div className="admincard-container">
                                <img className="admincard-image" src={ordercard} alt="Card" />
                            </div>
                            <div className="admincard-details">
                                <h3>Orders</h3>
                                <p>Handle Order details.</p>
                            </div>
                        </div>
                        </a>

                    </div>

                </div>


            </div>
        );
    }
}

export default Admin_Home;