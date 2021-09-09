import React, {Component} from 'react';
import axios from "axios";
import '../../css/user_item_view.css'
import User_Navigation from "../Navigation/User_Navigation";
import Footer from "../Footer/Footer";

class ItemByCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryItems:[],
            category:this.props.match.params.id
        }
        this.onItemClick = this.onItemClick.bind(this);
    }

    componentDidMount() {
        axios.get(`http://localhost:5000/get-item-By-category/${this.state.category}`)
        .then(res=>{
            this.setState({categoryItems:res.data.data});
            console.log(this.state.categoryItems);
        }).catch(err=>{
            console.log(new Error(err));
        })
    }

    onItemClick(event, itemId){
        window.location = `/get-item/${itemId}`
    }

    render() {
        return (
            <div>
                <User_Navigation/>
                <div className="test-container" id='test-container-id'>
                    <div className='container-fluid' id="middle-content">
                        <div id="item-header">
                            <h1>{this.state.category}</h1>
                        </div>
                        <div className="grid-container" id="user_view">
                            {this.state.categoryItems.length > 0 && this.state.categoryItems.map((item, index)=>(
                                <div key={index} className="grid-item">
                                    <div className='card-middle-content'>
                                        <img className="card-img-top" src={`/itemImages/${item.imageName}`} alt="Card image cap" id="card-image"/>
                                        <div className="card-body">
                                            <div className="card-title-modify">
                                                <h5 className="card-title">{item.itemName}</h5>
                                            </div>
                                            <h6 className="card-text">$ {item.itemPrice}</h6>
                                            <h6 className="card-text">{item.itemDescription}</h6>
                                            <button className="btn btn-primary" id='card-btn' onClick={event => this.onItemClick(event,item._id)}>Click here</button>
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

export default ItemByCategory;