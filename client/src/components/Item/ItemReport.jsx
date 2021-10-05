import React, { Component } from "react";
import Sidebar from "../Navigation/Sidebar";
import "../../css/item-report.css";
import axios from "axios";
import jsPDF from "jspdf";
import i_title from "./i_title.jpg";
import i_logo from "./i_logo.png";
import "jspdf-autotable";

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      startDate: "",
      endDate: "",
      errorCheck: "",
    };
    this.onDateHandler = this.onDateHandler.bind(this);
    this.getDetailsHandler = this.getDetailsHandler.bind(this);
    this.pdfGenerate = this.pdfGenerate.bind(this);
  }

  getDetailsHandler() {
    console.log(this.state.startDate);
    if (this.state.startDate === "" || this.state.endDate === "") {
      this.setState({ errorCheck: "Empty fields !" });
    } else {
      axios
        .get(
          `http://localhost:5000/get-items-by-date/${this.state.startDate}/${this.state.endDate}`
        )
        .then((response) => {
          this.setState({ products: response.data.data });
          console.log(this.state.products);
        })
        .catch((error) => {
          alert(`Server error !\n${error.message}`);
        });
    }
  }

  onDateHandler(event) {
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ errorCheck: "" });
  }

  pdfGenerate = () => {
    if (this.state.products.length === 0) {
      alert("There are no records can not generate report !");
    } else {
      var doc = new jsPDF("portrait", "px", "a4", "false");
      doc.rect(
        20,
        20,
        doc.internal.pageSize.width - 40,
        doc.internal.pageSize.height - 40,
        "S"
      );
      doc.addFont("ComicSansMS", "Comic Sans", "normal");
      doc.setFont("normal");
      doc.setFontSize(12);
      doc.setTextColor(26, 40, 88);
      doc.addImage(i_title, "png", 25, 25, 395, 50);
      doc.addImage(i_logo, "png", 180, 90, 100, 50);

      doc.autoTable({
        margin: { top: 150 },
        styles: { overflow: "linebreak" },
        html: "#item_report",
      });
      doc.save(`Weekly_added_products${new Date()}.pdf`);
    }
  };

  render() {
    return (
      <div>
        <Sidebar />
        <div className="co" style={{ width: "100%", height: "auto" }}>
          <h1
            style={{
              textAlign: "center",
              textDecoration: "none",
              padding: "30px 0 30px 0",
            }}
          >
            Weekly Added Items
          </h1>
          <div className="row r-middle-content">
            <div className="col-8 r-left-container">
              <div className="report-details">
                <p style={{ color: "black" }}>
                  From : {`${this.state.startDate}`}
                </p>
                <p style={{ color: "black" }}>To : {`${this.state.endDate}`}</p>
                <p
                  style={{
                    color: "red",
                    fontSize: "small",
                    fontWeight: "bold",
                  }}
                >
                  {this.state.errorCheck}
                </p>
                <hr />
                <div className="item-list-container" id="print_table">
                  {this.state.products.length > 0 &&
                    this.state.products.map((item, index) => (
                      <div
                        className="row"
                        key={index}
                        style={{ border: "1px solid lightgray" }}
                      >
                        <div className="col-2">
                          <img
                            src={`/itemImages/${item.imageName}`}
                            style={{ width: "100px", height: "100px" }}
                          />
                        </div>
                        <div className="col-10">
                          <table className="my-tables">
                            <tbody>
                              <tr>
                                <td>Item Name</td>
                                <td>:{item.itemName}</td>
                              </tr>
                              <tr>
                                <td>Item Category</td>
                                <td>:{item.itemCategory}</td>
                              </tr>
                              <tr>
                                <td>Item Price</td>
                                <td>:{item.itemPrice}</td>
                              </tr>
                              <tr>
                                <td>Item Insert Date</td>
                                <td>
                                  :
                                  {new Date(item.insertData)
                                    .toISOString()
                                    .slice(0, 10)}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="col-4 r-right-container">
              <div style={{ width: "70px" }}>
                <p>From : </p>
                <br />
                <p>To : </p>
              </div>
              <div>
                <input
                  type="date"
                  className="form-control"
                  name="startDate"
                  value={this.state.startDate}
                  onChange={this.onDateHandler}
                />
                <br />
                <input
                  type="date"
                  className="form-control"
                  name="endDate"
                  value={this.state.endDate}
                  onChange={this.onDateHandler}
                />
                <button
                  className="btn-secondary r-form-btn"
                  id="btn-get"
                  onClick={this.getDetailsHandler}
                >
                  Get details
                </button>
                <button
                  className="btn-primary r-form-btn"
                  id="btn-save"
                  onClick={this.pdfGenerate}
                >
                  Save as PDF
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="item_report_table">
          <table id="item_report">
            <thead id="table-header">
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
                <th scope="col" class="bg-dark">
                  InsertDate
                </th>
              </tr>
            </thead>
            <tbody>
              {this.state.products.length > 0 &&
                this.state.products.map((item, index) => (
                  <tr key={index} scope="row">
                    <td>{index + 1}</td>
                    <td>{item.itemName}</td>
                    <td>Rs. {item.itemPrice}.00</td>
                    <td>{item.itemCategory}</td>
                    <td>{item.insertData}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
