import React, {Component} from 'react';
import axios from "axios";
import UserNavigation from "../Navigation/User_Navigation";
import Footer from "../Footer/Footer";
import '../../css/user_item_view.css'

export default class UserViewItemLogged extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allItems:[]
        }
        this.onItemClick = this.onItemClick.bind(this);
    }

    /** Get all the items */
    componentDidMount() {
        axios.get('http://localhost:5000/get-items')
            .then(res=>{
                this.setState({allItems:res.data.data});
                console.log(this.state.allItems);
            })
            .catch(err=>{
                console.error(new Error(err));
            })
    }

    onItemClick(event, itemId){
        window.location = `/view-product-logged/${itemId}`
    }

    render() {
        return (
            <div>

                <UserNavigation/>

                <div className="test-container" id='test-container-id'>
                    <div className='container-fluid' id="middle-content">
                        <div id="item-header">
                            <h1>MobileZone All Products</h1>
                        </div><br/>
                        <div className="grid-container" id="user_view">
                            {this.state.allItems.length > 0 && this.state.allItems.map((item, index)=>(
                                <div key={index} className="grid-item">
                                    <div className='card-middle-content'>
                                        <img className="card-img-top" src={`/itemImages/${item.imageName}`} alt="Card image cap" id="card-image"/>
                                        <div className="card-body">
                                            <div className="card-title-modify">
                                                <h5 className="card-title">{item.itemName}</h5>
                                            </div>
                                            <h6 className="card-text">$ {item.itemPrice}</h6>
                                            <h6 className="card-text">{item.itemDescription}</h6>
                                            <button className="btn btn-primary" id='card-btn' style={{width:"100%"}} onClick={event => this.onItemClick(event,item._id)}>Click here</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

