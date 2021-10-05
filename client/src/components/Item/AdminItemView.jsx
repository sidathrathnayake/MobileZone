import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../Navigation/Sidebar";
import Footer from "../Footer/Footer";
import "../../css/adminItemView.css";
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

  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <div className="table-container">
          <h1>Products</h1>
          <br />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: "700px",
            }}
          >
            <input
              type="text"
              className="form-control"
              style={{ width: "300px", height: "40px", float: "left" }}
              placeholder="Search"
              name="keyWord"
              value={this.state.keyWord}
              onChange={this.onSearchHandler}
            />
            <div style={{ paddingLeft: "50px" }}>
              <a
                href="/add-item"
                className="btn"
                style={{ width: "150px", height: "40px" }}
              >
                Insert item
              </a>
            </div>
          </div>

          <table
            className="table table-hover"
            style={{
              borderRadius: "0",
            }}
          >
            <thead
              class="thead-dark"
              id="table-header"
              style={{ color: "#222" }}
            >
              <tr>
                <th scope="col" class="bg-dark">
                  ID
                </th>
                <th scope="col" class="bg-dark">
                  Item Name
                </th>
                <th scope="col" class="bg-dark">
                  Item Price
                </th>
                <th scope="col" class="bg-dark">
                  Category
                </th>
                <th scope="col" class="bg-dark"></th>
                <th scope="col" class="bg-dark"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.products.length > 0 &&
                this.state.products.map((item, index) => (
                  <tr key={index} scope="row">
                    <th style={{ color: "black" }}>{index + 1}</th>
                    <td>{item.itemName}</td>
                    <td>Rs. {item.itemPrice}.00</td>
                    <td>{item.itemCategory}</td>
                    <td>
                      {" "}
                      <button
                        className="btn btn-primary"
                        id="button-update"
                        onClick={(event) => this.btnOnClick(event, item._id)}
                      >
                        Update
                      </button>{" "}
                    </td>
                    <td>
                      <button
                        className="btn btndlt"
                        id="button-delete"
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
        </div>
      </div>
    );
  }
}
