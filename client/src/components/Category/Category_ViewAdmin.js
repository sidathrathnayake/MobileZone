import React, { Component } from 'react'
/**Importing the css file */
import '../../css/categoryForms.css'
/**Importing the header */
import NormalNavigation from '../Navigation/Normal_Navigation';
/**Importing the footer */
import Footer from '../Footer/Footer';
/**Importing the axios package */
import axios from 'axios';

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
            <div className="category-table-body">
                <NormalNavigation/>
                    <div class="category-table-content">
                        <div class="container">
                            <h2 class="mb-5 h2" id="category-vieadmin-heading"><center>Available Categories</center></h2>
                            <form className="form-inline row">
                                    <div class="input-group mb-4 border rounded-pill p-1">
                                        <div class="input-group-prepend border-0">
                                        <button type="button" class="btn btn-link text-info"><i class="fa fa-search"></i></button>
                                        <input type="search" placeholder="What're you searching for?" onKeyUp={this.myFunction}  aria-describedby="button-addon4" id="searchBar" class="form-control bg-none border-0"/>
                                        </div>
                                    </div>
                            </form><br/>
                            <div class="table-responsive custom-table-responsive">
                                <table class="table custom-table heading" id="myTable">
                                    <thead>
                                        <tr> 
                                            <th scope="col" >Category Name</th>
                                            <th scope="col">Category Description</th>
                                            <th scope="col">Category Image</th>
                                            <th scope="col">Category Update</th>
                                            <th scope="col">Category Delete</th>
                                        </tr>    
                                    </thead>
                                    <tbody>
                                    {this.state.category.length > 0 && this.state.category.map((item, index) => (
                                        <tr key={index} >              
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
                                            <td width="10%" >
                                                <img src={`/uploads/${item.categoryImage}`} alt="..."style={{width:"90%", borderRadius:"15%"}} id="sImage" />
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-outline-dark edit-btn far fa-edit" onClick={e => this.navigateToUpdateCategoryPage(e, item.categoryName)}>Edit</button>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-outline-dark edit-btn far fa-trash-alt" onClick={e => this.navigateToDeleteCategoryPage(e, item.categoryName)}>Delete</button>
                                            </td>
                                        </tr>  
                                        ))}  
                                    </tbody>
                                </table>
                            </div>
                        </div><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                    </div>
                <Footer/>
            </div>
        )
    }
}
