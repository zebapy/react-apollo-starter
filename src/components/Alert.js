import React from 'react';
import cx from 'classnames';

const Alert = ({ children, color }) => (
  <div
    className={cx('alert', {
      [`alert-${color}`]: color
    })}>
    {children}
  </div>
);

export default Alert;
