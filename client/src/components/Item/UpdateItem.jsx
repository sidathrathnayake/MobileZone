import React, { Component } from "react";
import axios from "axios";
import Sidebar from "../Navigation/Sidebar";
import Select from "react-select";

export default class UpdateItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      itemName: "",
      itemPrice: "",
      itemCategory: "",
      itemDescription: "",
      countInStock: "",
      file: "",
      insertData: "",
      inputError: "",
    };
    this.resetState = this.resetState.bind(this);
    this.onCategoryHandler = this.onCategoryHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onImageHandler = this.onImageHandler.bind(this);
    this.isValid = this.isValid.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/get-category")
      .then((response) => {
        const options = [];
        response.data.data.map((item) => {
          let data = {
            value: item._id,
            label: item.categoryName,
          };
          options.push(data);
        });
        this.setState({ categories: options });
      })
      .catch((error) => {
        alert(`Server error !/n${error.message}`);
        console.log(error.message);
      });

    axios
      .get(`http://localhost:5000/get-item-by-id/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({ itemName: response.data.data.itemName });
        this.setState({ itemPrice: response.data.data.itemPrice });
        this.setState({ itemCategory: response.data.data.itemCategory });
        this.setState({ itemDescription: response.data.data.itemDescription });
        this.setState({ countInStock: response.data.data.countInStock });
        this.setState({ insertData: response.data.data.insertData });
      })
      .catch((error) => {
        alert(`Server error Data loading failed !/n${error.message}`);
        console.log(error.message);
      });
  }

  onCategoryHandler(e) {
    this.setState({ itemCategory: e.label });
  }

  onChangeHandler(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onImageHandler = (e) => {
    this.setState({ file: e.target.files[0] });
  };

  resetState() {
    this.setState({ itemName: "" });
    this.setState({ itemPrice: "" });
    this.setState({ itemCategory: "" });
    this.setState({ itemDescription: "" });
    this.setState({ countInStock: "" });
    this.setState({ file: "" });
  }

  isValid() {
    if (this.state.itemName === "") {
      return false;
    } else if (this.state.itemPrice === "") {
      return false;
    } else if (this.state.itemCategory === "") {
      return false;
    } else if (this.state.countInStock === "") {
      return false;
    } else if (this.state.itemDescription === "") {
      return false;
    } else if (this.state.file === "") {
      return false;
    }
  }

  onSubmitHandler(e) {
    e.preventDefault();
    if (this.isValid() === false) {
      alert("Fill the required fields !");
    } else {
      const item = {
        file: this.state.file,
        itemName: this.state.itemName,
        itemPrice: this.state.itemPrice,
        itemCategory: this.state.itemCategory,
        countInStock: this.state.countInStock,
        itemDescription: this.state.itemDescription,
      };
      const formData = new FormData();
      formData.append("file", this.state.file);
      formData.append("itemName", this.state.itemName);
      formData.append("itemPrice", this.state.itemPrice);
      formData.append("itemCategory", this.state.itemCategory);
      formData.append("countInStock", this.state.countInStock);
      formData.append("itemDescription", this.state.itemDescription);
      formData.append("insertData", this.state.insertData);

      console.log(item);

      axios
        .put(
          `http://localhost:5000/update-item/${this.props.match.params.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((res) => {
          alert("Update successful !");
          this.props.history.push("/admin-get-item");
        })
        .catch((error) => {
          console.error(new Error(error));
        });
    }
  }

  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <div className="adminhome-container">
                <div className="adminnav">
            <h1>
              <a href="#">
                <i className="fa fa-mobile"></i> Update Product
              </a>
            </h1>
            
          </div>
        <div className="table-container">
          <br/>
          <div>
            <div>
              <form
                className="container-sm"
                style={{
                  borderRadius: "15px",
                  alignItems: "flex-start",
                  maxWidth: "48%",
                  padding: "5%",
                }}
              >
                <div className="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    style={{ width: "64vh" }}
                    id="input-field"
                    placeholder="Item name"
                    name="itemName"
                    value={this.state.itemName}
                    onChange={this.onChangeHandler}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="number"
                    className="form-control "
                    style={{ width: "64vh" }}
                    id="input-field"
                    placeholder="Item price"
                    name="itemPrice"
                    value={this.state.itemPrice}
                    onChange={this.onChangeHandler}
                    required
                  />
                </div>

                <div className="mb-3" style={{ width: "10.65vh" }}>
                  <Select
                    classNamePrefix="select"
                    placeholder="Select category"
                    value={this.state.categories.find(
                      (x) => x.label === this.state.itemCategory
                    )}
                    options={this.state.categories}
                    id="category-select"
                    name="itemCategory"
                    onChange={this.onCategoryHandler}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="number"
                    style={{ width: "64vh" }}
                    className="form-control "
                    id="input-field"
                    placeholder="Item quantity"
                    name="countInStock"
                    value={this.state.countInStock}
                    onChange={this.onChangeHandler}
                    required
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    className="form-control "
                    id="input-field"
                    placeholder="Enter item description"
                    name="itemDescription"
                    maxLength="200"
                    style={{ width: "64vh", height: "100px" }}
                    value={this.state.itemDescription}
                    onChange={this.onChangeHandler}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="file"
                    className="form-control "
                    name="file"
                    onChange={(e) => this.onImageHandler(e)}
                    style={{ width: "115%" }}
                  />
                </div>

                <div style={{ display: "flex", width: "64vh" }}>
                  <button
                    type="button"
                    className="btn"
                    style={{ backgroundColor: "#999", marginLeft: "10%" }}
                    onClick={this.resetState}
                  >
                    Clear
                  </button>
                  <br />
                  <button
                    type="button"
                    className="btn"
                    style={{ marginLeft: "14%" }}
                    id="btn-submit"
                    onClick={this.onSubmitHandler}
                  >
                    Insert Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        </div>
      </div>
    );
  }
}
