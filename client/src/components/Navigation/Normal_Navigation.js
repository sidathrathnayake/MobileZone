import React, { Component } from "react";
import NormalClassNavigation from "./Normal_Class_Navigation";

class Normal_Navigation extends Component {
  render() {
    return (
      <div>
        <nav>
          <h1 className="nav-home">
            <a href="/">
              Mobile<span>Zone</span>
            </a>
          </h1>
          <ul>
            <NormalClassNavigation />
            <li>
              <a href="/userlogin">Sign in</a>
            </li>
            <li>
              <a href="/adminlogin">Admins</a>
            </li>
            <li>
              <a href="#" className="icon">
                <i className="fa fa-bars"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Normal_Navigation;
