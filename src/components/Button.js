import React from 'react';
import cx from 'classnames';

const Button = ({ children, type, disabled, color }) => (
  <button
    type={type}
    disabled={disabled}
    className={cx('btn', {
      [`btn-${color}`]: color
    })}>
    {children}
  </button>
);

export default Button;
