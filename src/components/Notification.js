import React from 'react';
import { connect } from 'react-redux'
import { Alert } from 'antd'

const Notification = ({ message}) => {

  if (message === null) {
    return null;
  }

  const className = message ? 'error' : 'empty';

  return (
    <div className={className}>
      <Alert message={message} type="success" showIcon />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    message: state.message
  }
}


export default connect(
  mapStateToProps
)(Notification);
