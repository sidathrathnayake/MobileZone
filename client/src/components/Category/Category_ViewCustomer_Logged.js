import React, { Component } from 'react'
/**Importing the css file */
import '../../css/categoryForms.css'
import img1 from '../Category/images/abc.jpg'
/**Importing the header */
import UserNavigation from '../Navigation/User_Navigation';
/**Importing the footer */
import Footer from '../Footer/Footer';
/**Importing the axios package */
import axios from 'axios';

/**Class component starts here */
export default class Category_ViewCustomer_Logged extends Component {
    /**Initializing the constructor */
    constructor(props){
        super(props)
        /**Initializing the catgeory array */
        this.state = {
            category: []
        }
    }
    /**This method is to retreive the availabe categories */
    componentDidMount() {
        /**Http URL */
        axios.get('http://localhost:5000/category/retrieve')
        .then(response => {
          this.setState({ category: response.data })
        })
    }
    /**This method is to navigate to the ViewOne Pet page */
    navigateToCategory_ViewCustomerPage(e, categoryName) {
        window.location = `/user-get-item-logged/${categoryName}`
    }
    render() {
        return (
            <div>
                <UserNavigation/><br></br><br></br>
                    <div className="container-fluid">
                        <h4 className="category-h4" style={{color:"black"}}>Shop By Category</h4><br/>
                            <div className="container-fluid container-cat">
                                <div className="row" style={{width:"100%", marginLeft:"1%"}}>
                                    {this.state.category.length > 0 && this.state.category.map((item, index) => (
                                        <div className="col-md-3">
                                            <div class="card shadow" style={{width: "20rem"}}>
                                                <div className="inner inner-cat">
                                                    <img class="card-img-top" src={`/uploads/${item.categoryImage}`} style={{height:"300px"}} alt="Card image cap"/>
                                                </div>
                                                <div class="card-body">
                                                    <h5 class="card-title">{item.categoryName}  </h5>
                                                    <p class="card-text">{item.categoryDescription}</p>
                                                    <a class="btn" style={{ marginLeft:'10%',width:'80%', fontSize:'large'}} onClick={e => this.navigateToCategory_ViewCustomerPage(e, item.categoryName)}>View Products</a>
                                                </div>
                                            </div><br></br><br></br>
                                        </div>
                                    ))}
                            </div>
                        </div><br></br><br></br>
                    </div>
                <Footer/>
            </div>
        )
    }
}
