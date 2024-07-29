import React, { useState } from "react";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import styles from "../../css/AccountSetupPage.module.css";
import panCardExample from "../../../../public/assets/img/PanCard.jpg";
import chequeExample from "../../../../public/assets/img/CancelledChequeExample.png";
import ImageUpload from "../../molecules/Show Owners/ImageUpload";

const UploadDocumentsStep = () => {
  const [open, setOpen] = useState(false);
  const [exampleType, setExampleType] = useState("");
  const [PANCardImage, setPanCardImage] = useState(null);
  const [CancelledChequeImage, setCancelledChequeImage] = useState(null);

  const handleClickOpen = (type) => {
    setExampleType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setExampleType("");
  };

  const handleFileChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file && file.size <= 2 * 1024 * 1024 && (file.type === "image/jpeg" || file.type === "application/pdf")) {
      setImage(file);
    } else {
      alert("File must be a clear image in .jpeg or .pdf format and not exceed 2MB.");
    }
  };

  const handleUpload = async () => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;
  
      const formData = new FormData();
    if (PANCardImage) {
      formData.append('PANCardImage', PANCardImage);
    }
    if (CancelledChequeImage) {
      formData.append('CancelledChequeImage', CancelledChequeImage);
    }
  
      try {
        const response = await axios.put(`http://localhost:3000/api/show-owner/documents/${userId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Documents updated successfully!');
      } catch (error) {
        console.error('Error updating documents:', error);
        alert('Failed to update documents. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2 className={styles.subheading}>Upload Documents</h2>
      <p>Please make sure that:</p>
      <li>Upload a clear image in .jpeg or .pdf format only.</li>
      <li>File size should not be greater than 2MB.</li>
      <br />

      <div className="row">
        <div className="col">
          <h5>Upload PAN Card</h5>
          <p
            className={styles.exampleLink}
            onClick={() => handleClickOpen("panCard")}
          >
            View example
          </p>
          <ImageUpload
            cardName="PANCardImage"
            onChange={(e) => handleFileChange(e, setPanCardImage)}
          />
        </div>
        <div className="col">
          <h5>Upload Cancelled Cheque</h5>
          <p
            className={styles.exampleLink}
            onClick={() => handleClickOpen("cheque")}
          >
            View example
          </p>
          <ImageUpload
            cardName="CancelledChequeImage"
            onChange={(e) => handleFileChange(e, setCancelledChequeImage)}
          />
        </div>
      </div>

      <Button onClick={handleUpload} color="primary">
        Upload Documents
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {exampleType === "panCard"
            ? "PAN Card Example"
            : "Cancelled Cheque Example"}
        </DialogTitle>
        <DialogContent>
          {exampleType === "panCard" ? (
            <img
              src={panCardExample}
              alt="PAN Card Example"
              style={{ width: "100%" }}
            />
          ) : (
            <img
              src={chequeExample}
              alt="Cancelled Cheque Example"
              style={{ width: "100%" }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UploadDocumentsStep;
