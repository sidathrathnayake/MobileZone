import React, { Component } from 'react'
/**Importing the css file */
import '../../css/categoryForms.css'
import '../../css/payment.css'
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
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
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
    onFileChange(e) {
        this.setState({ categoryImage: e.target.files[0] });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    /**This method denotes the update method to update a category */
    onSubmit(e) {
        e.preventDefault();
        this.state.errorStatus = true;

        if (this.state.errorStatus === true) {
            let formData = new FormData();
            formData.append('categoryName', this.state.categoryName);
            formData.append('categoryDescription', this.state.categoryDescription);
            formData.append('categoryImage', this.state.categoryImage);
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

    /**This method is to navigate to the update category page */
    navigateToViewCategoryPage(e) {
        window.location = '/view-category-admin'
    }

    render() {
        return (
            <div className="wrapper" style={{ backgroundColor: 'rgba(0,0,0,0.25)', height: "788px" }}>
                <Sidebar />
                <div>
                    <h1 className="heading" style={{ marginTop: "10%" }}>Update Category</h1>
                    <div>
                        <div className="orderUpdateCont">
                            <form style={{ padding: '20px' }}>
                                <div class="form-group row updateOrdRow">
                                    <label for="form-control-orderId" class="col-4 form-label updateLabel">Category Name</label>
                                    <div class="col-6">
                                        <input type="text" className="form-control updateInput" id="form-control-orderId" name="categoryName" value={this.state.categoryName} onChange={this.onChange} />
                                    </div>
                                </div><br />
                                <div class="form-group row updateOrdRow" style={{ height: "86px" }}>
                                    <label for="form-control-shippingAddress" class="col-4 form-label updateLabel">Category Description</label>
                                    <div class="col-6">
                                        <textarea class="form-control category-update-description" name="categoryDescription" value={this.state.categoryDescription} onChange={this.onChange} rows="3" ></textarea>
                                    </div>
                                </div><br />
                                <div class="form-group row updateOrdRow">
                                    <label for="form-control-shippingAddress" class="col-4 form-label updateLabel">Category Image</label>
                                    <div class="col-6">
                                        <input type="file" className="form-control updateInput" id="form-control-orderId" name="categoryImage" onChange={this.onFileChange} />
                                    </div>
                                </div><br /><br />
                                <div className="row">
                                    <div className="col">
                                        <button type="button" onClick={e => this.navigateToViewCategoryPage(e)} class="dark-btn">Back</button>
                                    </div>
                                    <div className="col">
                                        <button type="submit" class="dark-btn" onClick={this.onSubmit}>Update</button>
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
