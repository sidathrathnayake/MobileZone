import React, { Component } from 'react';
import UserClassNavigation from './User_Class_Navigation';

class Normal_Navigation extends Component {
    render() {
        return (
            <div>
                 <nav>
                    <h1 className="nav-home"><a href="/">Mobile<span>Zone</span></a></h1>
                    <ul>  
                        <UserClassNavigation/>
                        <li><a href="/userlogin">Sign in</a></li>
                        <li><a href="/adminlogin">Admins</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Normal_Navigation;