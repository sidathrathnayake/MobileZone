import React, { Component } from 'react'
import '../../css/categoryForms.css'
import NormalNavigation from '../Navigation/Normal_Navigation';
import Footer from '../Footer/Footer';
import axios from 'axios';

import image1 from '../Category/images/abc.jpg'

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
                    <div className="container container-category-form">
                        <div class="card card-form">
                            <h5 class="card-header card-category-heading" style={{fontSize:" x-large"}}>Insert Category</h5>
                                <div class="card-body">
                                    <form >
                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" class="form-label label-category">Category Name</label>
                                            <input type="text" class="form-control control-form" id="exampleInputEmail1" name="categoryName" value={this.state.categoryName} onChange={this.onChange} required/>
                                        </div>
                                        <div class="mb-3">
                                            <label for="exampleInputEmail1" class="form-label label-category" style={{marginLeft:"-127%"}}>Category Description</label>
                                            <textarea class="form-control control-form-description" name="categoryDescription" value={this.state.categoryDescription} onChange={this.onChange} rows="3" required></textarea>
                                        </div>
                                        <div class="mb-4">
                                            <label for="exampleInputEmail1" class="form-label label-category-image" style={{marginTop:"0%"}}>Category Image</label>
                                            <input class="form-control category-file" type="file" id="formFile" name="categoryImage" onChange={this.onFileChange} required/>
                                        </div>
                                        <div className="mb-2">
                                            <button type="submit" class="btn btn-primary btn-insert-category" onClick={this.onSubmit}>Insert Category</button>
                                        </div>
                                    </form>
                                </div>
                        </div>
                    </div><br></br><br></br>
                <Footer/>
            </div>
        )
    }
}
