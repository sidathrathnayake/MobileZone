import React, { Component } from 'react'
/**Importing the css file */
import '../../css/categoryForms.css'
/**Importing the header */
import Sidebar from '../Navigation/Sidebar';
/**Importing the footer */
import Footer from '../Footer/Footer';
/**Importing the axios package */
import axios from 'axios';

/**Defining the initial state research paper amount */
const initialState = {
    categoryName: '',
    categoryDescription: '',
    categoryImage: '',
    file:null,
    errors:{},
    errorStatus:true
}

export default class Category_Update extends Component {
    /**Constructor for getting the records */
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    /**This method is to retreive the research paper amount */
    componentDidMount() {
        axios.get(`http://localhost:5000/category/retrieveOne/${this.props.match.params.categoryName}`)
        .then(response => {
          this.setState({ 
            categoryName: response.data.categoryName,
            categoryDescription: response.data.categoryDescription,
            categoryImage: response.data.categoryImage})
        })
        .catch(error => {
          alert(error.message)
        })
    }

    navigateAfterDeleteCategory(e) {
        e.preventDefault();
        axios.delete(`http://localhost:5000/category/deleteOne/${this.props.match.params.categoryName}`)
        .then(response => {
          if (response.status === 200){
            window.location = '/view-category-admin'
            alert("Category is Deleted!!!")
          }
          else{
            window.location = '/view-category-admin'
            alert("Failed to Delete Category!!!")
          }
        })
        .catch(error => {
          alert(error.message)
        })
    }

    render() {
        return (
            <div className="wrapper">
                <Sidebar/> 
                    <div className="table-container"><br/>
                        <h1>Delete Category</h1><br/><br/>
                            <div class="card card-form">
                                <div class="card-body category-form-body" style={{backgroundColor:"#fff"}}>
                                        <form >
                                            <div class="mb-3">
                                                <label for="exampleInputEmail1" class="form-label label-category">Category Name</label>
                                                <input type="text" class="form-control control-form" id="exampleInputEmail1" name="categoryName" value={this.state.categoryName} readOnly/>
                                            </div>
                                            <div class="mb-3">
                                                <label for="exampleInputEmail1" class="form-label label-category" style={{marginLeft:"-80%"}}>Category Description</label>
                                                <textarea class="form-control control-form-description" name="categoryDescription" value={this.state.categoryDescription}  rows="3" readOnly></textarea>
                                            </div>
                                            <div class="mb-4">
                                                <label for="exampleInputEmail1" class="form-label label-category-image" style={{marginLeft:"0%"}}>Category Image</label>
                                                <input class="form-control category-file" type="file" id="formFile" name="categoryImage"   readOnly/>
                                            </div>
                                            <div className="mb-2">
                                                <td><img src={`/uploads/${this.state.categoryImage}`} alt="..."style={{width:"10%"}} id="sImage" /></td>
                                                <button type="submit" class="btn btn-insert-category" onClick={e => this.navigateAfterDeleteCategory(e)}>Delete Category</button>
                                            </div>
                                        </form>
                                </div>
                            </div>
                    </div>
            </div>
        )
    }
}
