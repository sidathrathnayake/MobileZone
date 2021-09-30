import React, { useEffect, useState } from "react";
import "../../css/delete-item-modal.css";
import axios from "axios";

const DeleteItemModal = ({ handleClose, show, itemID, itemName }) => {
  const ClassNameShow = show ? "modal display-block" : "modal display-none";

  const [confirmName, setConfirmName] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    if (!confirmName) {
      alert("Item name is empty !");
    } else if (confirmName != itemName) {
      alert("Item name does not match !");
    } else if (confirmName === itemName) {
      axios
        .delete(`http://localhost:5000/delete-item/${itemID}`)
        .then((response) => {
          alert(`Item delete successfully !`);
          handleClose();
        })
        .catch((error) => {
          alert(`Server error !/n${error.message}`);
        });
    }
  };

  useEffect(() => {
    setConfirmName("");
  }, []);

  return (
    <div className={ClassNameShow}>
      <section className="modal-main">
        <div className="inner-modal-main">
          <h2 className="dis-header">Delete Item {itemName}</h2>
          <div class="alert alert-danger" role="alert">
            To Delete{" "}
            <span style={{ background: "inherit", fontWeight: "bold" }}>
              {itemName}
            </span>{" "}
            enter Item Name
          </div>

          <div className="form-group ts-1">
            <input
              type="text"
              className="form-control input-field"
              id="form-field"
              aria-describedby="emailHelp"
              placeholder="Enter item name"
              name="divisionNumber"
              value={confirmName}
              onChange={(event) => {
                setConfirmName(event.target.value);
              }}
            />
          </div>

          <div className="button-container">
            <button
              type="button"
              className="btn-secondary btn-Style-close"
              onClick={handleClose}
            >
              Close
            </button>

            <button
              type="button"
              className="btn-add btn-Style-confirm"
              onClick={submitHandler}
            >
              Confirm
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
export default DeleteItemModal;
