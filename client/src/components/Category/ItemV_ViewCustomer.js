import React, { Component } from 'react'
/**Importing the css file */
import '../../css/categoryForms.css'
import img1 from '../Category/images/abc.jpg'
/**Importing the header */
import NormalNavigation from '../Navigation/Normal_Navigation';
/**Importing the footer */
import Footer from '../Footer/Footer';
/**Importing the axios package */
import axios from 'axios';

export default class ItemV_ViewCustomer extends Component {
    constructor(props){
        super(props)
        this.state = {
            items: []
        }
    }
    /**This method is to retreive the research paper amount */
    componentDidMount() {
        axios.get(`http://localhost:5000/api/products/category/${this.props.match.params.categoryName}`)
        .then(response => {
          this.setState({ items: response.data })
          
        })
    }
    /**This method is to navigate to the ViewOne Pet page */
    navigateToProductScreenPage(e, id) {
        window.location = `/view-product/${id}`
    }

   
    render() {
        return (
            <div>
                <NormalNavigation/><br></br><br></br>
                <h4 className="category-h4" style={{color:"black"}}>Shop By Item</h4>
                <div className="container container-cat">
               
                    <div className="row justify-content-right card-cat">
                    {this.state.items.length > 0 && this.state.items.map((item, index) => (
                        <div className="col-md-3">
                            <div class="card shadow" style={{width: "20rem"}}>
                                <div className="inner inner-cat">
                                    <img class="card-img-top"  style={{height:"300px"}} alt="Card image cap"/>
                                </div>
                                
                                <div class="card-body">
                                    <h5 class="card-title">{item.itemName}  </h5>
                                    <p class="card-text">{item.description}</p>
                                    <a class="btn btn-outline-success" onClick={e => this.navigateToProductScreenPage(e, item.id)}>View Products</a>
                                </div>
                               
                            </div><br></br><br></br>
                        </div>
                    ))}
                    </div>
 
                </div><br></br><br></br>
                <Footer/>
            </div>
        )
    }
}
