import React, { Component } from 'react';

class Admin_Navigation extends Component {
    render() {
        return (
            <div >
                <nav>
                    <h1 className="nav-home"><a href="/">U<span>se</span>r</a></h1>
                    <ul>  
                        <li><a href="#">Details<i className="fas fa-caret-down"></i></a>
                            <div className="nav-dropdown">
                                <ul>
                                    <li><a href="/userdetails">Users</a></li>
                                    <li><a href="#">Categories</a></li>
                                    <li><a href="#">Images</a></li>
                                    <li><a href="#">Details<i className="fas fa-caret-right"></i></a>
                                        <div className="nav-dropdown-drop">
                                            <ul>
                                                <li><a href="#">Users</a></li>
                                                <li><a href="#">Categories</a></li>
                                                <li><a href="#">Images</a></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li><a href="#">Users</a></li>
                        <li><a href="#">Categories</a></li>
                        <li><a href="#">Images</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Admin_Navigation;