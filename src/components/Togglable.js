import React, { useState, useImperativeHandle } from 'react';
import { Button } from 'antd'

const toggleButton = {
  // color:
  // fontFamily: 'Georgia, "Times New Roman", Times, serif',
  fontWeight: '123px',
  backgroundColor: '#242b31',
  color: '#ffffff',
  border: '2px solid #242b31',
  margin: '5px'

}

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
    <div className='toggle' >
      <div style={showWhenVisible}>
        <Button style={toggleButton} onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={hideWhenVisible}>
        {props.children}
        <Button style={toggleButton} onClick={toggleVisibility}>CANCEL</Button>
      </div>
    </div>
  );
});

export default Togglable;
