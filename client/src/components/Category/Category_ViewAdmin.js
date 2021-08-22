import React, { Component } from 'react'
/**Importing the css file */
import '../../css/categoryForms.css'
/**Importing the header */
import Admin_Navigation from '../Navigation/Admin_Navigation';
/**Importing the footer */
import Footer from '../Footer/Footer';
/**Importing the axios package */
import axios from 'axios';

/**Class component starts here */
export default class Category_ViewAdmin extends Component {
    /**Initializing the caonstructor */
    constructor(props) {
        super(props);
        this.state = {
          category: []
        }
    }
    /**Method to retrieveing the data from the database */
    componentDidMount() {
        axios.get('http://localhost:5000/category/retrieve')
        .then(response => {
          this.setState({ category: response.data })
        })
    }
    /**This method is to navigate to the update category page */
    navigateToUpdateCategoryPage(e, categoryName) {
        window.location = `/update-before-category/${categoryName}`
    }
    /**This method is to navigate to the delete category page */
    navigateToDeleteCategoryPage(e, categoryName) {
      window.location = `/delete-before-category/${categoryName}`
    }
    /**This method is implemented for the Search Function by category name */
    myFunction() {
        var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("searchBar");
            filter = input.value.toUpperCase();
            table = document.getElementById("myTable");
            tr = table.getElementsByTagName("tr");
                for (i = 0; i < tr.length; i++) {
                    td = tr[i].getElementsByTagName("td")[0];
                    if (td) {
                        txtValue = td.textContent || td.innerText;
                        if (txtValue.toUpperCase().indexOf(filter) > -1) {
                                tr[i].style.display = "";
                            } else {
                            tr[i].style.display = "none";
                        }
                    }      
                }
    }
    render() {
        return (
            <body className=""> 
                <div className="admin-table-body">
                    <Admin_Navigation/><br></br><br></br>
                        <div>
                            <h2 class="mb-10 h2" id="category-vieadmin-heading"><center>Available Categories</center></h2>
                            <form class="d-flex admin-searchBar">
                                <input class="form-control me-3 bg-none bar" type="search" onKeyUp={this.myFunction} id="searchBar" placeholder="Search by Category Name" aria-label="Search"/>
                            </form>
                            <table class="table table-hover table-dark table-container" id="myTable">
                                <thead style={{backgroundColor:"blue"}}>
                                    <tr>
                                        <th scope="col">Category Name</th>    
                                        <th scope="col">Category Description</th>
                                        <th scope="col">Category Image</th>
                                        <th scope="col">Category Update</th>
                                        <th scope="col">Category Delete</th>    
                                    </tr>
                                </thead>
                                <tbody>
                                {this.state.category.length > 0 && this.state.category.map((item, index) => (
                                        <tr>
                                            <td>
                                                <div style={{position:"relative", top:"30px"}} >
                                                    {item.categoryName}
                                                </div>
                                            </td>
                                            <td>
                                                <div  style={{position:"relative", top:"30px"}}>
                                                    {item.categoryDescription}
                                                </div>
                                            </td>
                                            <td width="10%">
                                                <img src={`/uploads/${item.categoryImage}`} alt="..."style={{width:"90%", borderRadius:"15%"}} id="sImage" />
                                            </td>
                                            <td>
                                                <div  style={{position:"relative", top:"22px"}}>
                                                    <button type="button" class="btn btn-outline-warning">
                                                        <i class="far fa-edit"></i>
                                                        Update
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <div  style={{position:"relative", top:"22px"}}>
                                                    <button type="button" class="btn btn-outline-danger">
                                                        <i class="far fa-trash-alt"></i>
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}     
                                </tbody>
                            </table><br></br>
                        </div>
                    {/* <Footer/> */}
                </div>
            </body>
        )
    }
}
