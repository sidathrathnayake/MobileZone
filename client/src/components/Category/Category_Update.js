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
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onFileChange=this.onFileChange.bind(this);
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
          axios.put(`http://localhost:5000/category/update/${this.props.match.params.categoryName}`, formData, config)
          .then(response => {
            window.location = '/view-category-admin'
            alert('Data successfully updated!!!')
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
                        <h1>Update Category</h1><br/><br/>
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
                                                <td><img src={`/uploads/${this.state.categoryImage}`} alt="..."style={{width:"10%"}} id="sImage" /></td>
                                                <button type="submit" class="btn btn-insert-category" onClick={this.onSubmit}>Update Category</button>
                                            </div>
                                        </form>
                                </div>
                            </div>
                    </div>
            </div>
        )
    }
}
