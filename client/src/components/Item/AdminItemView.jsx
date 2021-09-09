import React, {Component} from 'react';
import axios from "axios";
import Admin_Navigation from "../Navigation/Admin_Navigation";
import Footer from "../Footer/Footer";
import '../../css/adminItemView.css';

export default class AdminItemView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products:[],
            keyWord:''
        }

        this.btnOnClick = this.btnOnClick.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/get-items')
        .then(res => {
            this.setState({products:res.data.data});
            console.log(this.state.products);
        }).catch(err=>{
            console.error(new Error(err));
        })
    }

    btnOnClick(){
        alert("Function not implemented !");
    }

    onSearchHandler(e){
        this.setState({[e.target.name]:e.target.value})
        axios.post('http://localhost:5000/search-items',{keyWord:this.state.keyWord})
        .then(res=>{
            this.setState({products:res.data.data});
        }).catch(err=>{
            console.error(new Error(err));
        })
        console.log(this.state.keyWord);
    }

    render() {
        return (
            <body className="page-body">
            <Admin_Navigation/> <br/><br/><br/><br/><br/>
            <div className="container" >
                <div className="admin-table">
                    <h1>Products</h1>
                    <br/>
                    <div style={{display:"flex",paddingLeft:"700px"}}>
                        <input type="text" className="form-control" style={{width:"300px",float:"left"}} placeholder="Search" name="keyWord"
                        value={this.state.keyWord} onChange={this.onSearchHandler}/>
                        <div style={{paddingLeft:"50px"}}>
                            <button type="submit" className="btn-add-item" style={{width:"100px",height:"40px"}}>Insert item</button>
                        </div>
                    </div>

                    <br/><br/>
                    <table className="table" style={{borderRadius:"0"}}>
                        <thead class="thead-dark"  id="table-header" style={{color:'#222'}}>
                        <tr>
                            <th scope="col" class="bg-dark">ID</th>
                            <th scope="col" class="bg-dark">Item Name</th>
                            <th scope="col" class="bg-dark">Item Price</th>
                            <th scope="col" class="bg-dark">Category</th>
                            <th scope="col" class="bg-dark"></th>
                            <th scope="col" class="bg-dark"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.products.length > 0 && this.state.products.map((item, index)=>(
                            <tr key={index} scope="row">
                                <th>{index+1}</th>
                                <td>{item.itemName}</td>
                                <td>$ {item.itemPrice}</td>
                                <td>{item.itemCategory}</td>
                                <td> <button className="btn btn-primary" id="button-update" onClick={this.btnOnClick}>Update</button> </td>
                                <td> <button className="btn btn-secondary" id="button-delete" onClick={this.btnOnClick}>Delete</button> </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer/>
            </body>
        );
    }
}
