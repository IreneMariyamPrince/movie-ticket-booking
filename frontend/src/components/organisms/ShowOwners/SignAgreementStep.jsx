import React from "react";
import styles from "../../css/AccountSetupPage.module.css";
import PDFUpload from "../../molecules/Show Owners/PDFUpload";

const SignAgreementStep = () => {
  return (
    <div className="conatiner text-center">
      <h2 className={styles.subheading}>Sign Agreement</h2>
      <p>
        Upload signed agreement, click on 'Download Agreement' to download the
        agreement. Upload a .pdf format only. File size should not be greater
        than 2MB.
      </p>
      <a href="">Download Agreement</a>
      {/* Add your form fields here */}

      <PDFUpload cardName="agreement" />
    </div>
  );
};

export default SignAgreementStep;
