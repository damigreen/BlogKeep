import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';


const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 16,
  },
};


const LoginForm = ({ username, password, handleLogin }) => {
  const [user, setUser] = useState({
    isChecked: false,
    name: '',
    username: '',
  });

  const onCheckClicked = e => {
    setUser({
      isChecked: e.target.checked,
      name: window.localStorage.name,
      username: window.localStorage.username,
    });
  }

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };
  
  return (
    <div>
      <div className="login-page-box" >
          <h1 className='login-page-header'>SIGN IN</h1>
          <Form
            className='login-page-form'
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={handleLogin}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
              >
              <Input {...username} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
              >
              <Input.Password {...password} />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox user={user}>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button style={{backgroundColor: '#242b31', borderColor: '#242b31'}} type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>      
        </div>
      </div>
  );
};

export default LoginForm;
