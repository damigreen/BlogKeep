import React from 'react'
import { connect } from 'react-redux'

import useField from '../hooks/index'

import { likeBlog } from '../reducers/blogReducer'
import { deleteBlog } from '../reducers/blogReducer'
import { commentBlog }  from '../reducers/blogReducer'
import {
  Row, 
  Col,
  Divider,
  Comment,
  Tooltip,
  List,
} from 'antd'
import moment from 'moment';


function BlogInfo({ blog, ...props }) {
  console.log(blog)
  const comment = useField('text')
  
  if (blog === undefined) {
    return null
  }

  const data = blog.comments
    .map(comment => ({
      // actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: blog.user.name,
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: <p>{comment}</p>,
      datetime: (
        <Tooltip
          title={moment()
            .subtract(1, 'days')
            .format('YYYY-MM-DD HH:mm:ss')}
        >
          <span>
            {moment()
              .subtract(1, 'days')
              .fromNow()}
          </span>
        </Tooltip>
      ),
    }))


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
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <br />
          <br />
            <Row>
              <Col className='col-header'><h2>{blog.title} by {blog.author} </h2></Col>
            </Row>
            <Divider orientation='center' >Blog info</Divider>
        <div>
          <Row>
            <Col className='col-link'><a target='_blank' rel="noopener noreferrer" href={blog.url}>{blog.url}</a></Col>
          </Row>
          <br />
          <Row>
            <Col>
              <div>{blog.likes} <button onClick={addLike}>likes</button></div>
            </Col>
            <Col>
              <div><button onClick={removeBlog}>remove</button></div>
            </Col>
            <Col offset={6} className='col-user'><p>added by {blog.user.name}</p></Col>
          </Row>

      </div>
      </div>
      </a>
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
            </form>
          </Col>
        </Row>
        <List
          className="comment-list"
          header={`${data.length} replies`}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
          <li>
            <Comment
              // actions={item.actions}
              author={item.author}
              avatar={item.avatar}
              content={item.content}
              datetime={item.datetime}
            />
          </li>
           )}
        />
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
