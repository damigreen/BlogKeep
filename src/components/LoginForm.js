import React from 'react';

const LoginForm = ({ username, password, handleLogin }) => {

  return (
    <div className="login-page-center">
      <h1 className='login-page-header'>log in to application</h1>
      <form className='login-page-form' onSubmit={handleLogin}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
