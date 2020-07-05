import React from 'react'
import { connect } from 'react-redux'

import useField from '../hooks/index'

import { likeBlog } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { commentBlog }  from '../reducers/blogReducer'
import styled from 'styled-components'
import {
  Row, 
  Col,
  Divider,
  Comment,
  Tooltip,
  List,
} from 'antd'
import moment from 'moment';


const blogListStyle = {
  padding: 0,
  margin: 0,
  listStyle: 'none'
}



function BlogInfo({ blog, ...props }) {
  const comment = useField('text')
  
  if (blog === undefined) {
    return null
  }

  // const data = [
  //   {
  //     actions: [<span key="comment-list-reply-to-0">Reply to</span>],
  //     // author: 'Han Solo',
  //     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  //     content: blog.comments.map(comment => (
  //       <p>{comment}</p>
  //     )),
  //     datetime: (
  //       <Tooltip
  //         title={moment()
  //           .subtract(1, 'days')
  //           .format('YYYY-MM-DD HH:mm:ss')}
  //       >
  //         <span>
  //           {moment()
  //             .subtract(1, 'days')
  //             .fromNow()}
  //         </span>
  //       </Tooltip>
  //     ),
  //   },
  // ]


  const addComment = event => {
    event.preventDefault()
    const newComment = {
      comment: comment.form.value
    }
    props.commentBlog(blog.id, newComment)
    comment.reset()
  }

  const addLike = async (event) => {
    event.preventDefault();
    const changedBlog = { ...blog, likes: blog.likes + 1 };
    props.likeBlog(changedBlog)
  };

  const removeBlog = async (event) => {
    event.preventDefault();
    if (window.confirm(`remove blog ${blog.name} by ${blog.author}`)) {
      props.deleteBlog(blog.id)
      props.setNotification('blog deleted')
    }
  };

  return (
    <div >
        <br />
        <br />
        <br />
      <a href={blog.url} target='_blank'  rel="noopener noreferrer">
        <Row>
          <Col className='col-header'><h2>{blog.title} {blog.author} </h2></Col>
        </Row>

        <Divider orientation='left' >Blog info</Divider>

        <Row>
          <Col className='col-link'><div><a target='_blank' rel="noopener noreferrer" href={blog.url}>{blog.url}</a></div></Col>
        </Row>
      </a>
        <Row>
          <Col className='col-user'><p>added by {blog.user.name}</p></Col>
        </Row>
        <Row>
          <Col className='col-button' style={{display: 'flex', flexDirection: 'row'}}>
            <div>{blog.likes} <button onClick={addLike}>likes</button></div>
            <div><button onClick={removeBlog}>remove</button></div>
          </Col>
        </Row>
        <br />
        <br />
        <br />

        <Divider>Comments</Divider>
        <Row>
          <Col>
            <form onSubmit={addComment}>
              <h4>comments</h4>
              <input {...comment.form} />
              <button type="submit">add comment</button>
              <ul>
                {blog.comments
                  .map(comment => (
                    <li>{comment}</li>
                  )
                  )}
              </ul>
              <br />
              <br />
              
            </form>
          </Col>
        </Row>
        {/* <List
          className="comment-list"
          header={`${data.length} replies`}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
          <li>
            <Comment
              actions={item.actions}
              author={item.author}
              // avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          </li>
           )}
        /> */}
      </div>

  );
};

const matchDispatchToProps = {
  likeBlog,
  deleteBlog,
  commentBlog
}

export default connect(
  null,
  matchDispatchToProps
)(BlogInfo)
