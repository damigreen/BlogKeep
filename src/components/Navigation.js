import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import logo from '../images/blogkeeplogo4.png'
import styled from 'styled-components'
import { Menu, AutoComplete } from 'antd'
import { Button } from 'antd'

// const MenuWrapper = styled.div`
//   display: flex,
//   flex-direction: column,
//   // border: 1px solid red;
//   width: 100%;
//   height: 100px;
//   background-color: #242b31;
//   padding: 4;
//   `;
  
  // const LinksDiv = styled.div`
  // display: flex;
  // flex-direction: row;
  // justify-content: space-between;
  // margin: auto;
  // padding: 25px 2px 6px 30px;
  // // width: 1105px;
  // width: 65%;
  // height: 100px;
  // // border: 1px solid red;
  // background-image: url('../images/blogkeeplogo4.png')
  // `;
  
  // const Button = styled.a`
  //   display: inline-block;
  //   border-radius: 3px;
  //   padding: 0.5rem 0;
  //   // padding: 0.5rem 0 0.5rem 0
  //   margin: 0.5rem 1rem;
  //   width: 5rem;
  //   background-color: red;
  //   color: white;
  //   border: 2px solid ;
  // `;
  
  
  
  
  const menuStyle = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    heigth: '100vh',
    border: '1px solid green',
    backgroundColor: '#242b31',
    listStyle: 'none',
    // width: '60%',
    // justifyContent: 'space-around',
}

const logoStyle = {
  margin: '0px 80px 0px 0px',
  padding: '0px 30px 8px 0px',
  height: '60px',
  width: '120px',

}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logout
}

const homeLinkStyle = {
  padding: '10px',
  marginRight: '50px',
  // padding: '0px 5px 0px 0px',
  marginLeft: '50px',
}

const userLinkStyle = {
  padding: '10px',
  marginRight: '50px', 
  border: '1px'
}


const statusLinkStyle = {
  padding: '10px',
  marginRight: '30px',
  border: '1px',
}

class Navigation extends Component{
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this);
  }
  
  handleLogout () {
    window.localStorage.removeItem('loggedInUser');
    this.props.logout()
  };


  render() {
    const {user = {}} = this.props;

    return (
        <Menu style={menuStyle}>
            <img src={logo} alt="app_logo" style={logoStyle} />
            <Menu.Item key="home">
              <Link to="/"  style={homeLinkStyle}>HOME</Link>
            </Menu.Item>
            <Menu.Item key="users">
              <Link to="/Users" style={userLinkStyle}> USERS</Link>
            </Menu.Item>
            <Menu.Item key="status">
              <Link to="/" style={statusLinkStyle}>
                <b>{user.name} is logged in</b>
              </Link>
            </Menu.Item>
            <Menu.Item key="button">
                {/* <Button onClick={() => this.handleLogout()}>LOGOUT</Button> */}
                <Button
                  type="primary"
                  danger
                  onClick={() => this.handleLogout()}
                  style={{ color: "white", background: "red", borderColor: "red" }}
                >
                  LOGOUT
                </Button>
            </Menu.Item>
        </Menu>
    )
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
