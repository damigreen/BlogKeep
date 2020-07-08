import React from 'react';
import { connect } from 'react-redux'
import useField from '../hooks/index'

import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import '../App.css'
import{ Button } from 'antd';



const NewBlog = ({ setMessage, blogFormRef, ...props }) => {
  const newTitle = useField('text')
  const newAuthor = useField('text')
  const newUrl = useField('text')
  // const [form] = Form.useForm();

  const submitBlog = async (event) => {
    event.preventDefault();
    const newBlog = {
      title: newTitle.form.value,
      author: newAuthor.form.value,
      url: newUrl.form.value
    };
    try {
      props.createBlog(newBlog)
      props.setNotification(`new blog added: ${newBlog.title} by ${newBlog.author}`);
      blogFormRef.current.toggleVisibility()

      newTitle.reset()
      newAuthor.reset()
      newUrl.reset()
    }
    catch (exception) {
      props.setNotification('Validation error: please enter the required filed(s) ');
    }
  };

  return (
    <div className='form-div'>
      <form onSubmit={submitBlog}>
        <h1>CREATE A NEW BLOG</h1>
        <div>
          <label for='title'>Title</label>
          <input className='text' {...newTitle.form} />
        </div>
        <div>
          <label for='author'>Author</label>
          <input className='text' {...newAuthor.form} />
        </div>
        <div>
          <label for='url'>Url</label>
          <input className='text' {...newUrl.form} />
        </div>
        <Button className='submit' htmlType="submit" type='primary'>CREATE</Button>
      </form>
      <br />
      <br />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  createBlog,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
) (NewBlog);
