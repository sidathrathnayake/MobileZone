import React, {useState, useEffect, Component } from 'react';
import axios from 'axios';
import {Redirect, withRouter} from 'react-router-dom';

class User_Class_Navigation extends Component {
constructor(props) {
    super(props);
    this.state = {
        category:[]
    }
    this.onCategoryClick = this.onCategoryClick.bind(this);
}

componentDidMount() {
    axios.get('http://localhost:5000/get-category')
    .then(res=>{
        this.setState({category:res.data.data})
        console.log(this.state.category);
    }).catch(err=>{
        console.error(new Error(err));
    });

}

onCategoryClick(event,categoryName){
    console.log(categoryName)
    window.location = `/user-get-item/${categoryName}`

}

render() {
    return (
        <div> 
                    <li><a href="/view-category-customer">Devices<i className="fas fa-caret-down"></i></a>
                        <div className="nav-dropdown">
                            <ul>
                                {this.state.category.map((items, index)=>(
                                    <li><a href="#" onClick={event => (this.onCategoryClick(event,items.categoryName))}>{items.categoryName}</a></li>
                                ))}
                            </ul>
                        </div>
                    </li>

        </div>
    );

}
}

export default withRouter(User_Class_Navigation);