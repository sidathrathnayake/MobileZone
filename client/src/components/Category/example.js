import React, { Component } from 'react'
import Cart_Navigation from '../Navigation/Cart_Navigation'
export default class example extends Component {
    render() {
        return (
            <div>
                
                <nav>
                    <h1 className="nav-home"><a href="/">Mobile<span>Zone</span></a></h1>
                    <ul>  
                        <li><a href="#">Devices<i className="fas fa-caret-down"></i></a>
                            <div className="nav-dropdown">
                                <ul>
                                    <li><a href="#">Apple</a></li>
                                    <li><a href="#">Samsung</a></li>
                                    <li><a href="#">Huawei</a></li>
                                    <li><a href="#">Accessories</a></li>
                                </ul>
                            </div>
                        </li>
                        {/* <li><Cart_Navigation/></li> */}
                        <li><a href="/userlogin">Sign in</a></li>
                    </ul>
                </nav>
            </div>
        )
    }
}
