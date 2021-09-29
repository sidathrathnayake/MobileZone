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
    file: null,
    errors: {},
    errorStatus: true
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
                    categoryImage: response.data.categoryImage
                })
            })
            .catch(error => {
                alert(error.message)
            })
    }

    /**This method is to delete a category */
    navigateAfterDeleteCategory(e) {
        e.preventDefault();
        axios.delete(`http://localhost:5000/category/deleteOne/${this.props.match.params.categoryName}`)
            .then(response => {
                if (response.status === 200) {
                    window.location = '/view-category-admin'
                    alert("Category is Deleted!!!")
                }
                else {
                    window.location = '/view-category-admin'
                    alert("Failed to Delete Category!!!")
                }
            })
            .catch(error => {
                alert(error.message)
            })
    }
    /**This method is to navigate to the update category page */
    navigateToViewCategoryPage(e) {
        window.location = '/view-category-admin'
    }

    render() {
        return (
            <div className="wrapper">
                <Sidebar />
                <div className="adminhome-container" style={{ backgroundColor: 'rgba(0,0,0,0.25)'}}>
                <div className="adminnav">
            <h1>
              <a href="#">
                <i className="fa fa-clipboard-list"></i> &nbsp;&nbsp;Delete Category
              </a>
            </h1>
            
          </div>
                    <div>
                        <div className="orderUpdateCont" style={{ marginTop: "25%",marginBottom: "30.7%"  }} >
                            <form style={{ padding: '20px' }}>
                                <div class="form-group row updateOrdRow" style={{ marginBottom: "10px" }}>
                                    <label for="form-control-orderId" class="col-4 form-label updateLabel">Category Name</label>
                                    <div class="col-6">
                                        <input type="text" className="form-control updateInput" id="form-control-orderId" name="categoryName" value={this.state.categoryName} readOnly />
                                    </div>
                                </div><br />
                                <div class="form-group row updateOrdRow" style={{ height: "86px", marginBottom: "10px" }}>
                                    <label for="form-control-shippingAddress" class="col-4 form-label updateLabel">Category Description</label>
                                    <div class="col-6">
                                        <textarea class="form-control category-update-description" name="categoryDescription" value={this.state.categoryDescription} rows="3" readOnly></textarea>
                                    </div>
                                </div><br /><br />
                                {/* <div class="form-group row updateOrdRow">
                                    <label for="form-control-shippingAddress" class="col-4 form-label updateLabel">Category Image</label>
                                    <div class="col-6">
                                        <input type="file" className="form-control updateInput" id="form-control-orderId" name="categoryImage" readOnly/>
                                    </div>
                                </div><br/><br/> */}
                                <div className="row">
                                    <div className="col">
                                        <button type="button" onClick={e => this.navigateToViewCategoryPage(e)} class="dark-btn">Back</button>
                                    </div>
                                    <div className="col">
                                        <button type="submit" class="dark-btn" onClick={e => this.navigateAfterDeleteCategory(e)}>Delete</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
