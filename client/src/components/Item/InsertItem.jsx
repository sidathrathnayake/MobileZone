import React, {Component} from 'react';
import Admin_Navigation from "../Navigation/Admin_Navigation";
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
                window.location.reload(false);
                    for (const value of formData.values()) {
                        console.log(value);
                    }

                }).catch(error =>{
                    console.error(new Error(error));
            })
        }
    }

    render() {
        return (
            <div>
                <Admin_Navigation/><br/><br/><br/><br/><br/>
                <div>
                    <h5 style={{fontSize:"xxx-large",backgroundColor:"white",color:"black",alignItems:"center",display:'flex',justifyContent:'center'}} >Insert item </h5>
                    <div >
                        {/*<h5 className="card-header card-category-heading" style={{fontSize:" x-large",backgroundColor:"#282c34",color:"white"}} >Insert item </h5>*/}
                        <div>
                            {/*<hr style={{color:"white",marginTop:"-2.5%",height:"2px",width:"104%",marginLeft:"-2%"}}></hr>*/}
                            <form className='container-sm' style={{borderStyle:"solid",borderWidth:'1px',borderColor:'black',borderRadius:"5px",alignItems:"flex-start",maxWidth:"40%",padding:"1%"}}>
                                <div className="mb-3">
                                    <label for="exampleFormControlInput1" className="form-label label-category">Item name</label>
                                    <input type="text" class="form-control" id="input-field"  placeholder="item name" name="itemName"
                                           value={this.state.itemName} onChange={this.onChangeHandler} required/>
                                </div>

                                <div className="mb-3">
                                    <label for="exampleFormControlInput1" className="form-label label-category">Item price</label>
                                    <input type="number" className="form-control " id="input-field" placeholder="Item price" name="itemPrice"
                                           value={this.state.itemPrice} onChange={this.onChangeHandler} required/>
                                </div>

                                <div className="mb-3">
                                    <label for="exampleFormControlInput1" className="form-label label-category" id="cat-label">Item category</label>
                                    <Select className="basic-single" id="input-field" classNamePrefix="select" placeholder="Select category"
                                            options={this.state.option} name="itemCategory" onChange={this.onCategoryHandler} required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label label-category">Item quantity</label>
                                    <input type="number" className="form-control " id="input-field"
                                           placeholder="Item quantity" name="countInStock"
                                           value={this.state.countInStock} onChange={this.onChangeHandler} required/>
                                </div>

                                <div className="mb-3">
                                    <label for="exampleFormControlInput1" className="form-label label-category">Item description</label>
                                    <textarea className="form-control " id="input-field" placeholder="Enter item description" name="itemDescription" maxLength="200"
                                              style={{height:"100px"}}
                                              value={this.state.itemDescription} onChange={this.onChangeHandler} required/>
                                </div>

                                <div className="mb-3">
                                    <label for="exampleFormControlInput1" className="form-label label-category-image" style={{marginTop:"0%"}}>Item image</label>
                                    <input type='file' className="form-control "  name='file'
                                           onChange={(e) => this.onImageHandler(e)} />
                                </div>

                                <button type="button" className="btn-change"  onClick={this.resetState}>Clear</button><br/>
                                <button type="button" className="btn-change" id='btn-submit' onClick={this.onSubmitHandler}>Insert Item</button>
                            </form>
                        </div>
                    </div>
                </div><br/><br/><br/><br/>
                <Footer/>
            </div>
        );
    }
}
