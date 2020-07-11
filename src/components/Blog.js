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
  width: 100%;
  margin-top: 7px;
`;

const Blog = ({ blog, ...props }) => {

  const linkStyle = {
    height: 50,
    backgroundColor: props.color,
    color: '#eee'
  }

  const author = blog.author ? blog.author : 'Anonymous';

  
  return (
    <BlogWrapper>
      <Row>
        <Col className="col-list-flex" style={linkStyle}>
          <Link classname='blog-text' to={`/Blogs/${blog.id}`} style={{paddingLeft: '10px', color: '#2F2F2F', textDecoration: 'underline'}} >{blog.title}</Link>
          <Link to={`/Blogs/${blog.id}`} style={{paddingRight: '10px', color: '#2F2F2F'}} >{author}</Link>
        </Col>
      </Row>

    </BlogWrapper>
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
