import React from "react";

const PrevButton = ({ onClick }) => (
    <button type="button" className="btn bg-secondary position-absolute top-50 start-0 translate-middle-y rounded-circle" onClick={onClick}>
        <i className="bi bi-chevron-left text-white"></i>
    </button>
);

export default PrevButton;
