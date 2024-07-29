import React from "react";

const NextButton = ({ onClick }) => (
    <button type="button" className="btn bg-secondary position-absolute top-50 end-0 translate-middle-y rounded-circle" onClick={onClick}>
        <i className="bi bi-chevron-right text-white"></i>
    </button>
);

export default NextButton;
