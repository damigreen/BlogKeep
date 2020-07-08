import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../reducers/userReducer'
import logo from '../images/blogkeeplogo4.png'
import styled from 'styled-components'
import {
  Menu, 
  Button,
  Row,
  Col,
} from 'antd'

  

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

const Wrapper = styled.div`
backgroud-color: #242b31;
size: 100%
`

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
        <Menu className='nav-main bar'>
            {/* <img src={logo} alt="app_logo" style={logoStyle} /> */}
            <Row>
              <Col span={2} offset={5}>
                <Menu.Item key="home">
                  <Link to="/">HOME</Link>
                </Menu.Item>
              </Col>
              <Col span={3}>
                <Menu.Item key="users">
                  <Link to="/Users"> USERS</Link>
                </Menu.Item>
              </Col>
              <Col span={5} style={{float: 'right'}}>
                <Menu.Item key="status">
                  <Link to="/">
                    <b>{user.name} is logged in</b>
                  </Link>
                </Menu.Item>
              </Col>
              <Col span={2}>
                <Menu.Item key="button">
                    <Button
                      type="primary"
                      danger
                      onClick={() => this.handleLogout()}
                      style={{ color: "white", background: "red", borderColor: "red" }}
                    >
                      LOGOUT
                    </Button>
                </Menu.Item>
              </Col>
            </Row>

        </Menu>
    )
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
