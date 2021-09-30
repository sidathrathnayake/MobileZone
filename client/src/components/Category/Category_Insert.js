import React, { Component } from 'react'
/**Importing the css file */
import '../../css/categoryForms.css'
/**Importing the header */
import Sidebar from '../Navigation/Sidebar';
/**Importing the footer */
import Footer from '../Footer/Footer';
/**Importing the axios package */
import axios from 'axios';

/**Initializing the attributes which are to be sent to the database */
const initialState = {
    categoryName: '',
    categoryDescription: '',
    categoryImage: '',
    file:null,
    errors:{},
    errorStatus:true
  }
/**Class component starts */
export default class Category_Insert extends Component {
    /**Initializing the constructor */
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onFileChange=this.onFileChange.bind(this);
        this.state = initialState;
    }
    /**Method to change the state of the file type */
    onFileChange(e) {
        this.setState({ categoryImage: e.target.files[0] });
    }
    /**Method to change the state of all the other attributes */
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    /**Method for sending the data to the database */
    onSubmit(e) {
        e.preventDefault();
        this.state.errorStatus=true;
        /**Using formdata, to pass attributes along with a file type */
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
          /**Http URL */
          axios.post('http://localhost:5000/category/insert', formData, config)
          .then(response => {
            window.location = '/view-category-admin'
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
            <div className="wrapper">
                <Sidebar/> 
                    <div className="table-container"><br/>
                    <h1>Insert Category</h1><br/><br/>
                        <div class="card card-form">
                            
                                <div class="card-body category-form-body" style={{backgroundColor:"#fff"}}>
                                    
                                        <form >
                                            <div class="mb-3">
                                                <label for="exampleInputEmail1" class="form-label label-category">Category Name</label>
                                                <input type="text" class="form-control control-form" id="exampleInputEmail1" name="categoryName" value={this.state.categoryName} onChange={this.onChange} required/>
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleInputEmail1" class="form-label label-category" style={{marginLeft:"-80%"}}>Category Description</label>
                                                <textarea class="form-control control-form-description" name="categoryDescription" value={this.state.categoryDescription} onChange={this.onChange} rows="3" required></textarea>
                                            </div>
                                            <div class="mb-4">
                                                <label for="exampleInputEmail1" class="form-label label-category-image" style={{marginLeft:"0%"}}>Category Image</label>
                                                <input class="form-control category-file" type="file" id="formFile" name="categoryImage" onChange={this.onFileChange} required/>
                                            </div>
                                            <div className="mb-2">
                                                <button type="submit" class="btn btn-insert-category" onClick={this.onSubmit}>Insert Category</button>
                                            </div>
                                        </form>
                                </div>
                        </div>
                    </div>
            </div>
        )
    }
}
