import React, {Component} from 'react';
import Sidebar from '../Navigation/Sidebar';
import Footer from "../Footer/Footer";
import '../../css/item_form.css';
import Select from "react-select";
import axios from "axios";

const initialState = {
    itemName: "",
    itemPrice: "",
    itemCategory: "",
    countInStock:'',
    itemDescription:"",
    file:''
}

export default class InsertItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allCategories:[],
            option:[],
            itemName:'',
            itemPrice:'',
            itemCategory:'',
            countInStock:'',
            itemDescription:'',
            file:'',
            inputError:''
        }

        this.onCategoryHandler = this.onCategoryHandler.bind(this);
        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onImageHandler = this.onImageHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.resetState = this.resetState.bind(this);
        this.isValid = this.isValid.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/get-category')
        .then(res =>{
            this.setState({allCategories: res.data.data},() =>{
                let data = [];
                this.state.allCategories.map((item, index) =>{
                    let category = {
                        value:item._id,
                        label:item.categoryName
                    }
                    data.push(category);
                });
                this.setState({option:data});
            });
        }).catch(err=>{console.error(err)})
    }

    onCategoryHandler(e){
        this.setState({itemCategory:e.label});
    }

    onChangeHandler(e){
        this.setState({[e.target.name]:e.target.value});
    }

    onImageHandler = (e)=>{
        this.setState({file:e.target.files[0]});
    }

    resetState(){
        this.state = initialState;
        window.location.reload(false);
    }

    isValid(){
       if(this.state.itemName === ""){
           return false;
       }else if(this.state.itemPrice === ""){
           return false;
       }else if(this.state.itemCategory === ""){
           return false;
       }else if(this.state.countInStock === ""){
            return false;
       }else if (this.state.itemDescription === "") {
           return false;
       }else if(this.state.file === ""){
           return false;
       }
    }

    onSubmitHandler(e){
        e.preventDefault();
        if(this.isValid() === false){
            alert("Fill the required fields !");
        }else{
            const item ={
                file:this.state.file,
                itemName:this.state.itemName,
                itemPrice:this.state.itemPrice,
                itemCategory:this.state.itemCategory,
                countInStock:this.state.countInStock,
                itemDescription:this.state.itemDescription,
            }
            const formData = new FormData();
            formData.append('file', this.state.file);
            formData.append('itemName', this.state.itemName);
            formData.append('itemPrice', this.state.itemPrice);
            formData.append('itemCategory', this.state.itemCategory);
            formData.append('countInStock',this.state.countInStock);
            formData.append('itemDescription', this.state.itemDescription);

            console.log(item);

            axios.post('http://localhost:5000/admin/add-item',formData,{
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res =>{
                
                    for (const value of formData.values()) {
                        console.log(value);
                    }
                    this.props.history.push('/admin-get-item');
                }).catch(error =>{
                    console.error(new Error(error));
            })
        }
    }

    render() {
        return (
            <div className="wrapper">
                <Sidebar/>
                <div className="adminhome-container">
                <div className="adminnav">
            <h1>
              <a href="#">
                <i className="fa fa-mobile"></i> Insert Products
              </a>
            </h1>
            
          </div>
                <div className="table-container" >
                    <div >
                        <div>
                           <br/>
                            <form className='container-sm' style={{borderRadius:"15px",alignItems:"flex-start",maxWidth:"48%",padding:"5%"}}>
                                <div className="mb-3">
                                    
                                    <input type="text" class="form-control" style={{width: '64vh'}} id="input-field"  placeholder="Item name" name="itemName"
                                           value={this.state.itemName} onChange={this.onChangeHandler} required/>
                                </div>

                                <div className="mb-3">
                                   
                                    <input type="number" className="form-control " style={{width: '64vh'}}  id="input-field" placeholder="Item price" name="itemPrice"
                                           value={this.state.itemPrice} onChange={this.onChangeHandler} required/>
                                </div>

                                <div className="mb-3" style={{width: '10.65vh'}} >
                                    
                                    <Select   classNamePrefix="select" placeholder="Select category"
                                            options={this.state.option} id="category-select" name="itemCategory" onChange={this.onCategoryHandler} required 
                                    />
                                </div>

                                <div className="mb-3">
                                    
                                    <input type="number" style={{width: '64vh'}}  className="form-control " id="input-field"
                                           placeholder="Item quantity" name="countInStock"
                                           value={this.state.countInStock} onChange={this.onChangeHandler} required/>
                                </div>

                                <div className="mb-3">
                                    
                                    <textarea className="form-control "  id="input-field" placeholder="Enter item description" name="itemDescription" maxLength="200"
                                              style={{width: '64vh', height:'100px'}} 
                                              value={this.state.itemDescription} onChange={this.onChangeHandler} required/>
                                </div>

                                <div className="mb-3">
                                    
                                    <input type='file' className="form-control "  name='file'
                                           onChange={(e) => this.onImageHandler(e)} style={{width:"115%"}}/>
                                </div>

                                <div style={{display:"flex" ,width:'64vh'}}>
                                    <button type="button" className="btn" style={{backgroundColor:"#999", marginLeft:'10%'}} onClick={this.resetState}>Clear</button><br/>
                                    <button type="button" className="btn" style={{ marginLeft:'14%'}} id='btn-submit' onClick={this.onSubmitHandler}>Insert Item</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        );
    }
}
