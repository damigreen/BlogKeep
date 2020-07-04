import React, { useState } from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import propTypes from 'prop-types';

import { likeBlog } from '../reducers/blogReducer';
import { deleteBlog }  from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import styled from 'styled-components'
import { Row, Col } from  'antd'

const BlogWrapper = styled.div`
  // border: 1px solid green;
  width: 800px
  `;
  
const BlogLinkTitle = styled.div`
// border: 1px solid green;
  padding: 20px 0 0 5px
`;

const BlogLinkAuthor = styled.div`
  // border: 1px solid red;
  padding: 20px 5px 0 0 
`;



const Blog = ({ blog, ...props }) => {

  const linkStyle = {
    height: 70,
    border: '1 solid blue',
    backgroundColor: props.color,
  }

  
  return (
    <Row>
      <Col span={24} className="col-list" style={linkStyle}>
        <Link to={`/Blogs/${blog.id}`} style={{paddingLeft: '10px'}} >{blog.title}</Link>
        <Link to={`/Blogs/${blog.id}`} style={{paddingRight: '10px'}} >{blog.author}</Link>
      </Col>
    </Row>
  );
};

Blog.propTypes = {
  blogs: propTypes.array.isRequired,
  setBlogs: propTypes.func.isRequired,
  blog: propTypes.object.isRequired,
  user: propTypes.object.isRequired
};

const matchDispatchToProps = {
  likeBlog,
  deleteBlog,
  setNotification
}

export default connect(
  null,
  matchDispatchToProps
)(Blog);
