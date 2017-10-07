import React from 'react';

const TextField = ({ label, type = 'type', ...rest }) => (
  <div className="form-group">
    <label>{label}</label>
    <input className="form-control" type={type} {...rest} />
  </div>
);

export default TextField;
