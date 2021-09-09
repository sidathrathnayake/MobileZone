import React, { Component } from 'react';
import axios from "axios";

class User_Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories:[]
        }
        this.onCategoryClick = this.onCategoryClick.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/get-category')
        .then(res=>{
            this.setState({categories:res.data.data})
            console.log(this.state.categories);
        }).catch(err=>{
            console.error(new Error(err));
        })
    }

    onCategoryClick(event,categoryName){
        window.location = `/user-get-item/${categoryName}`
    }

    render() {
        return (
            <div>
                 <nav>
                    <h1 className="nav-home"><a href="/">Mobile<span>Zone</span></a></h1>
                    <ul>  
                        <li><a href="/user-get-item">Devices<i className="fas fa-caret-down"></i></a>
                            <div className="nav-dropdown">
                                <ul>
                                    {this.state.categories.map((items, index)=>(
                                        <li><a href="#" onClick={event => (this.onCategoryClick(event,items.categoryName))}>{items.categoryName}</a></li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                        <li><a href="/userlogin">Sign out</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default User_Navigation;