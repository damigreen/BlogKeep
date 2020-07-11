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
import { Input } from 'antd';
import styled from 'styled-components'
import {
  DeleteOutlined,
  HeartOutlined,
} from '@ant-design/icons';


const Button = styled.button`
  color: white;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  display: inline-block;
  border: 2px solid #242b31;
  background: #242b31;
  float: right;
  width: 8rem;
  
`



function BlogInfo({ blog, ...props }) {
  const comment = useField('text')
  const { TextArea } = Input;
  
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
    <div className='blog-content'>
      <br />
      <br />
      <a href={blog.url} target='_blank'  rel="noopener noreferrer">
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Row>
            <Col style={{fontSize: '24px', fontWeight: '900px'}}><h1>{blog.title}</h1></Col>
          </Row>
          <Divider orientation='center' >Blog info</Divider>
          <div>
            <Row style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <Col><a style={{padding: '5px', fontSize: '16px'}} target='_blank' rel="noopener noreferrer" href={blog.url}>{blog.url}</a></Col>
            </Row>
            <br />
            <Row className='col-list-flex info' >
              <Col>
                <div>
                  <em style={{padding: '5px'}}>{blog.likes}</em><HeartOutlined onClick={addLike} style={{fontSize: '15px', padding: '5px', color: 'grey'}} />
                  <DeleteOutlined style={{fontSize: '15px', padding: '5px', color: 'red'}} onClick={removeBlog} />
                </div>
              </Col>
              <Col className='blog-text-foot'><p>added by {blog.user.name}</p></Col>
            </Row>

          </div>
        </div>
      </a>
        <br />
        <br />
        <br />

        <Divider >COMMENTS</Divider>

        <div className='blog-comment' >
          <Row>
            <Col>
              <form  onSubmit={addComment}>
                <TextArea className='input-form' placeholder='Add a comment...' {...comment.form} row={3} />
                <Button type='submit' >ADD COMMENT</Button>
              </form>
            </Col>
          </Row>

          <List
            className="blog-comment list"
            header={`${data.length} comments`}
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
