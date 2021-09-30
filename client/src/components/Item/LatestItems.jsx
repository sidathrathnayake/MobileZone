/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect } from "react";
import "../../css/user_item_view.css";
import { useState } from "react";
import axios from "axios";

const LatestItems = () => {
  const [allItems, setAllItems] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-items")
      .then((res) => {
        let tempArray1 = [];
        let tempArray2 = [];
        tempArray1 = res.data.data.reverse();
        for (let i = 0; i < 8; i++) {
          tempArray2[i] = tempArray1[i];
        }
        setAllItems(tempArray2);
      })
      .catch((err) => {
        console.error(new Error(err));
      });
  }, []);

  
  return (
    <div>
      <br/>
      <div id="item-header">
        <h1 style={{ textDecoration: "none" }}>Latest Products</h1>
      </div>
    <div className="container-fluid" style={{display: "flex", justifyContent: "center", alignItems:"center"}}>
      
      <div className="grid-container" style={{ width: "100%"}}  id="user_view">
        {allItems.length > 0 &&
          allItems.map((item, index) => (
            <div key={index} className="grid-item">
              <div className="card-middle-content">
                <img
                  className="card-img-top"
                  src={`/itemImages/${item.imageName}`}
                  alt="Card image cap"
                  id="card-image"
                />
                <div className="card-body">
                  <div className="card-title-modify">
                    <h5 className="card-title">{item.itemName}</h5>
                  </div>
                  <h6 className="card-text">$ {item.itemPrice}</h6>
                  <h6 className="card-text">{item.itemDescription}</h6>
                  
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
    </div>
  );
};
export default LatestItems;
