import React, {Component} from 'react';
import axios from "axios";
import Sidebar from '../Navigation/Sidebar';
import '../../css/adminItemView.css';
import TableScrollbar from 'react-table-scrollbar';
import DeleteItemModal from "./DeleteItemModal";

export default class AdminItemView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: false,
      products: [],
      keyWord: "",
      selectedID: "",
      selectedName: "",
    };

    this.btnOnClick = this.btnOnClick.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
    this.showHandler = this.showHandler.bind(this);
    this.closeHandler = this.closeHandler.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/get-items")
      .then((res) => {
        this.setState({ products: res.data.data });
      })
      .catch((err) => {
        console.error(new Error(err));
      });
  }

  btnOnClick(event, id) {
    this.props.history.push(`/user-update-item-logged/${id}`);
  }

  onSearchHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
    axios
      .post("http://localhost:5000/search-items", {
        keyWord: this.state.keyWord,
      })
      .then((res) => {
        this.setState({ products: res.data.data });
      })
      .catch((err) => {
        console.error(new Error(err));
      });
    console.log(this.state.keyWord);
  }

  showHandler(event, id, itemName) {
    this.setState({ showDelete: true });
    this.setState({ selectedID: id });
    this.setState({ selectedName: itemName });
  }

  closeHandler() {
    this.setState({ showDelete: false });
  }
  goPrint = () => {
    this.props.history.push("/item-report");
  };
  
    render() {
        return (
            <div className="wrapper">
            <Sidebar/>
            <div className="adminhome-container">
          <div className="adminnav">
            <h1>
              <a href="/userdetails">
                <i className="fa fa-mobile"></i>  &nbsp;&nbsp;Products
              </a>
            </h1>
            
          </div>
          <div className="reportbutton">
          <div className="table-search">
          <input type="text" className="form-control" style={{width:"300px", height:"40px",float:"left"}} placeholder="Search" name="keyWord"
                    value={this.state.keyWord} onChange={this.onSearchHandler}/>
            </div>
          <button className="btn" onClick={this.goPrint} id="right-panel-btn">
              {" "}
              Report
            </button>
            
          </div>
            <div className="table-container">
                <div >
                    
                    <div >
                        <a href="/add-item" className="btn" style={{width:"150px",height:"40px"}}>Insert item</a>
                    </div>
                </div>
                <TableScrollbar rows={9}>
                <table>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Item Name</th>
                  <th scope="col">Item Price</th>
                  <th scope="col">Category</th>
                  <th scope="col">Update</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
              {this.state.products.length > 0 && this.state.products.map((item, index)=>(
                  <tr key={index}>
                    <td >{index+1}</td>
                                <td>{item.itemName}</td>
                                <td>Rs. {item.itemPrice}.00</td>
                                <td>{item.itemCategory}</td>
                   
                    <td>
                      {" "}
                      <button
                        className="btn edit-btn-category"
                        onClick={(event) => this.btnOnClick(event, item._id)}
                      >
                        Update
                      </button>{" "}
                    </td>
                    <td>
                      <button
                        className="btn delete-btn-category"
                        onClick={(event) =>
                          this.showHandler(event, item._id, item.itemName)
                        }
                      >
                        Delete
                      </button>
                      <DeleteItemModal
                        handleClose={this.closeHandler}
                        show={this.state.showDelete}
                        itemID={this.state.selectedID}
                        itemName={this.state.selectedName}
                      />
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
            </TableScrollbar>
            </div>
            </div>
            </div>
        );
    }
}
