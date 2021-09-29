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

/**Initializing the attributes which are to be sent to the database */
const initialState = {
  categoryName: '',
  categoryDescription: '',
  categoryImage: '',
  file: null,
  errors: {},
  errorStatus: true
}
/**Class component starts */
export default class Category_Insert extends Component {
  /**Initializing the constructor */
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
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
    this.state.errorStatus = true;
    /**Using formdata, to pass attributes along with a file type */
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
        <Sidebar />
        <div className="adminhome-container" style={{ backgroundColor: 'rgba(0,0,0,0.25)'}}>
                <div className="adminnav">
            <h1>
              <a href="#">
                <i className="fa fa-clipboard-list"></i> Insert Category
              </a>
            </h1>
            
          </div>
          <div>
            <div className="orderUpdateCont" style={{ marginTop: "23%",marginBottom: "22.7%"  }} >
              <form style={{ padding: '20px' }}>
                <div class="form-group row updateOrdRow" style={{ marginBottom: "10px" }}>
                  <label for="form-control-orderId" class="col-4 form-label updateLabel">Category Name</label>
                  <div class="col-6">
                    <input type="text" className="form-control updateInput" id="form-control-orderId" name="categoryName" value={this.state.categoryName} onChange={this.onChange} required />
                  </div>
                </div><br />
                <div class="form-group row updateOrdRow" style={{ height: "86px", marginBottom: "30px"  }}>
                  <label for="form-control-shippingAddress" class="col-4 form-label updateLabel">Category Description</label>
                  <div class="col-6">
                    <textarea class="form-control category-update-description" name="categoryDescription" value={this.state.categoryDescription} onChange={this.onChange} rows="3" required></textarea>
                  </div>
                </div><br />
                <div class="form-group row updateOrdRow" style={{ marginBottom: "10px" }}>
                  <label for="form-control-shippingAddress" class="col-4 form-label updateLabel">Category Image</label>
                  <div class="col-6">
                    <input type="file" className="form-control updateInput" id="form-control-orderId" name="categoryImage" onChange={this.onFileChange} required />
                  </div>
                </div><br /><br />
                <div className="row">
                  <div className="col">
                    <button type="submit" class="dark-btn" onClick={this.onSubmit}>Insert Category</button>
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
