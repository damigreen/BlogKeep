import React, { useState, useImperativeHandle } from 'react';
import { Button } from 'antd'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const showWhenVisible = { display: visible ? 'none' : '' };
  const hideWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({
    toggleVisibility,
  }));

  return (
    <div>
      <div style={showWhenVisible}>
        <Button onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={hideWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility}>CANCEL</Button>
      </div>
    </div>
  );
});

export default Togglable;
