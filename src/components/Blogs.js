import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import styled from 'styled-components'
import '../App.css';
import { Row, Col } from 'antd'

const media = {
    /* Extra small devices (phones, 600px and down) */
  mobile: "@media only screen and (max-width: 600px)",

  /* Small devices (portrait tablets and large phones, 600px and up) */
  tablets: "@media only screen and (min-width: 600px)",

  /* Medium devices (landscape tablets, 768px and up) */
  tabletLandscape: "@media only screen and (min-width: 768px)",

  /* Large devices (laptops/desktops, 992px and up) */
  desktops: "@media only screen and (min-width: 992px)",

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  large_desktop: "@media only screen and (min-width: 1200px)",
}

const BlogsDiv = styled.div`
  display: flex;
  align-items: left;  
  flex-direction: column;
  margin: auto;
  width: 50%;
  // position: relative;
  // left: 650px;
  padding: 10px;
  // width: 50;
  // border: 3px solid red;
  
  ${media.mobile} {
    
    width: 100%;
    margin: auto;
    height: auto;
    // marginRigth: 10%;
    // display: flex,
    // flex-flow: row nowrap;
    // justify-content: space-between;
    background-color: yellow;
    position: relative;
    right: 80px
  })
  `;

const HeaderDiv = styled.div`
  border: 1px solid green;
  width: 800px;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #242b31;
  margin: 120px 0 15px 0;

  ${media.mobile} {
    display: flex,
    flex-flow: row nowrap;
    justify-content: space-between;
    background-color: yellow;
  })
`;

const BlogsHeader = styled.h3`
  color: #ffffff;
`;
  
  const AuthorHeader = styled.h3`
  padding-right: 5px;
  color: #ffffff;
`;
const List = styled.div`
  border: 1px solid brown;
  ${media.mobile} {
    display: flex,
    flex-flow: row nowrap;
    justify-content: space-between;
    margin: auto;
    width: 50%
    background-color: yellow;
    border: 1px solid red;
  })
`;

const Blogs = (props) => {
  const blogs = props.blogs
  
  const blogList = blogs
    .sort((a, b) => b.likes - a.likes)
    .map(
      (blog, i) => (
        <Blog
          key={blog.key}
          blog={blog}
          blogs={blogs}
          user={props.user}
          color={ i % 2 ? '#ebebeb' : '#ced4da' }
        />
      )
    )
  

  return (
    <div className="blog-container">
        <Row className="col-list-flex header" >
          <Col><BlogsHeader>BLOGS</BlogsHeader></Col>
          <Col><AuthorHeader>AUTHOR</AuthorHeader></Col>
        </Row>
        <Row>
          <Col>
            {blogList}
          </Col>
        </Row>
    </div>

  )
}

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps,
)(Blogs);
