import React, { Component } from "react";
import "./InputItem.css";

const InputItem = ({ label, value, error, type, index, onChange }) => {
    let lbl = 'event' + label;
    return <div className="form-group">
        <label htmlFor={lbl}>{label} <span className="red">*</span></label>
        <input type={type} name={label} className="form-control" id={lbl} value={value} tabIndex={index} onChange={onChange} />
        {error && <span className="error">{error}</span>}
    </div>
}

export default InputItem