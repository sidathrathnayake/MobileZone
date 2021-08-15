import React, { Component } from 'react'
import '../../css/categoryForms.css'
import NormalNavigation from '../Navigation/Normal_Navigation';
import Footer from '../Footer/Footer';
import axios from 'axios';

const initialState = {
    categoryName: '',
    categoryDescription: '',
    categoryImage: '',
    file:null,
    errors:{},
    errorStatus:true
  }

export default class Category_Insert extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onFileChange=this.onFileChange.bind(this);
        this.state = initialState;
    }
    onFileChange(e) {
        this.setState({ categoryImage: e.target.files[0] });
    }
    
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        this.state.errorStatus=true;
        
        if (this.state.errorStatus === true) {
          let formData = new FormData ();
          formData.append('categoryName',this.state.categoryName);
          formData.append('categoryDescription',this.state.categoryDescription);
          formData.append('categoryImage',this.state.categoryImage);
          const config = {
            headers: {
              'content-type': 'multipart/form-data'
            }
          };
          console.log('DATA TO SEND', formData);
          axios.post('http://localhost:5000/category/insert', formData, config)
          .then(response => {
            //window.location = '/viewWS'
            alert('Data successfully inserted!!!')
          })
          .catch(error => {
            console.log(error.message);
            alert(error.message)
          })
        }  
      }

    render() {
        return (
            <div>
                <NormalNavigation/> <br></br><br></br>
                    {/* <div class="container">
                        <div class="row">
                            <div class="col-lg-3 col-md-2"></div>
                            <div class="col-lg-6 col-md-8 login-box">
                                <div class="col-lg-12 login-key">
                                    <i class="fa fa-key" aria-hidden="true"></i>
                                </div>
                                <div class="col-lg-12 login-title">
                                    Add Category To The System
                                </div>
                                <div class="col-lg-12 login-form">
                                    <div class="col-lg-12 login-form">
                                        <form>
                                            <div class="form-group">
                                                <label class="form-control-label">CATEGORY NAME</label>
                                                <input type="text" class="form-control"/>
                                            </div>
                                            <div class="form-group">
                                                <label class="form-control-label">CATEGORY DESCRIPTION</label>
                                                <input type="password" class="form-control"/>
                                                <textarea class="form-control"></textarea>
                                            </div>
                                            <div class="form-group">
                                                <label class="form-control-label">CATEGORY IMAGE</label>
                                                <input type="password" class="form-control"/>
                                            </div>
                                            <div class="col-lg-12 loginbttm">
                                                <div class="col-lg-6 login-btm login-button">
                                                    <button type="submit" class="btn btn-outline-primary">LOGIN</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div><br></br> */}
                <Footer/>
            </div>
        )
    }
}
