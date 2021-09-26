import React, {useState, useEffect, Component } from 'react';
import axios from 'axios';
import {Redirect, withRouter} from 'react-router-dom';

const Sidebar = ({ history}) => { 

    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    useEffect(() => {
        if(!localStorage.getItem("adminToken")){
            history.push('/');
        }
    

    const fetchPrivateData = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("adminToken")}`
            }
        }

        try {
            const {data} = await axios.get("http://localhost:5000/admin", config);
            
        } catch (error) {
            localStorage.removeItem("adminToken");
            history.push('/');
        }
    }

    fetchPrivateData();
}, [ history ]);   

const adminLogoutHandler = () =>{
    localStorage.removeItem("adminToken");
    history.push('/');
}
   
   
        return (
            error ? <span>{error}</span> : <>
            <div >
            {privateData}
            <div className="sidebar">
	            <h1><a href="/adminhome" style={{color:"#fff"}}>MobileZone</a></h1>	
    
                <br/>
                    <ul>
                        <li><a href="/adminhome"><i className="fa fa-home"></i>Home</a></li>
                        <li><a href="/userdetails"><i className="fa fa-users-cog"></i>Customers</a></li>
                        <li><a href="/admin-get-item"><i className="fa fa-mobile"></i>Products</a></li>
                        <li><a href="/view-category-admin"><i className="fa fa-clipboard-list"></i>Categories</a></li>
                        <li><a href="/adminViewOrder"><i className="fa fa-coins"></i>Orders</a></li>
                        <li><a href="#"  onClick={adminLogoutHandler} ><i className="fa fa-power-off"></i>Sign Out</a></li>
                    </ul>
	        </div>
            </div>
             </>
        );  
}

export default withRouter(Sidebar);