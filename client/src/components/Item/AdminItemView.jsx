import React, {Component} from 'react';
import axios from "axios";
import Sidebar from '../Navigation/Sidebar';
import '../../css/adminItemView.css';
import TableScrollbar from 'react-table-scrollbar';

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
            <div className="wrapper">
            <Sidebar/>
            <div className="adminhome-container">
          <div className="adminnav">
            <h1>
              <a href="/userdetails">
                <i className="fa fa-mobile"></i>  Products
              </a>
            </h1>
            
          </div>
          <div className="reportbutton">
          <div className="table-search">
          <input type="text" className="form-control" style={{width:"300px", height:"40px",float:"left"}} placeholder="Search" name="keyWord"
                    value={this.state.keyWord} onChange={this.onSearchHandler}/>
            </div>
          <button className="btn" onClick={this.goPrint} id="right-panel-btn">
              {" "}
              Report
            </button>
            
          </div>
            <div className="table-container">
                <div >
                    
                    <div >
                        <a href="/add-item" className="btn" style={{width:"150px",height:"40px"}}>Insert item</a>
                    </div>
                </div>
                <TableScrollbar rows={9}>
                <table>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Item Price</th>
                  <th scope="col">Category</th>
                  <th scope="col">Update</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
              {this.state.products.length > 0 && this.state.products.map((item, index)=>(
                  <tr key={index}>
                    <td >{index+1}</td>
                                <td>{item.itemName}</td>
                                <td>Rs. {item.itemPrice}.00</td>
                                <td>{item.itemCategory}</td>
                    <td> <button className="btn btn-primary" id="button-update" onClick={this.btnOnClick}>Update</button> </td>
                    <td> <button className="btn btndlt" id="button-delete" onClick={this.btnOnClick}>Delete</button> </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </TableScrollbar>
            </div>
            </div>
            </div>
        );
    }
}
