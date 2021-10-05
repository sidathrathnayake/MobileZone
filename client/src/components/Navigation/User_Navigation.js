import React, {useState, useEffect, Component } from 'react';
import axios from 'axios';
import {Redirect, withRouter} from 'react-router-dom';
import CartNavigation from './Cart_Navigation';
import UserClassNavigation from './User_Class_Navigation';

const User_Navigation = ({ history}) => {

    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    useEffect(() => {
        if(!localStorage.getItem("userToken")){
            history.push('/');
        }


        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }

            try {
                const {data} = await axios.get("http://localhost:5000/user", config);

            } catch (error) {
                localStorage.removeItem("userToken");
                history.push('/');
            }
        }

        fetchPrivateData();
    }, [ history ]);

    const userLogoutHandler = () =>{
        localStorage.removeItem("userToken");
        history.push('/');
    }

    return (
        <div>
            <nav>
                <h1 className="nav-home"><a href="/userhome">Mobile<span>Zone</span></a></h1>
                <ul>
                    <UserClassNavigation/>
                    <li><CartNavigation/></li>
                    <li><a href="/userprofile">Profile</a></li>
                    <li><a href="/" onClick={userLogoutHandler} >Sign Out</a></li>
                </ul>
            </nav>
        </div>
    );

}

export default withRouter(User_Navigation);