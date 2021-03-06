import React, { Component } from 'react'
/**Importing the css file */
import '../../css/categoryForms.css'
/**Importing the header */
import Sidebar from '../Navigation/Sidebar';
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
            <div className="wrapper">
                    <Sidebar/>
                    <div className="table-container">
                            <h1><center>Available Categories</center></h1><br/>
                            <div style={{display:"flex"}}>
                            
                            <form class="d-flex admin-searchBar" style={{marginRight:"-50px"}}>
                                <input class="form-control bg-none bar" type="search" onKeyUp={this.myFunction} id="searchBar" placeholder="Search by Category Name" aria-label="Search"/>
                            </form>
                            <a href='/create-category' class="btn" style={{width:"200px", height:"40px",float:"right"}}>Add Category</a>
                            </div>
                            <table class="table table-hover" id="myTable" >
                                <thead style={{color:"blue"}} >
                                    <tr class="bg-primary">
                                        <th scope="col"  class="bg-dark">Category Name</th>    
                                        <th scope="col"  class="bg-dark">Category Description</th>
                                        <th scope="col"  class="bg-dark">Image</th>
                                        <th scope="col"  class="bg-dark">Category Update</th>
                                        <th scope="col"  class="bg-dark">Category Delete</th>    
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
                                                <div  style={{position:"relative"}}>
                                                    <button type="button" class="btn edit-btn-category">
                                                        <i class="far fa-edit"></i> &nbsp;
                                                        Update
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <div  style={{position:"relative"}}>
                                                    <button type="button" class="btn delete-btn-category">
                                                        <i class="far fa-trash-alt"></i> &nbsp;
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}     
                                </tbody>
                            </table><br></br>
                        </div>
                        </div>
        )
    }
}
