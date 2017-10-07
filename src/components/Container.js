import React from 'react';
import cx from 'classnames';

const Container = ({ fluid, children }) => (
  <div
    className={cx({
      container: !fluid,
      'container-fluid': fluid
    })}>
    {children}
  </div>
);

export default Container;
