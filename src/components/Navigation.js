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
// margin: 0 auto;
// width: 80%;
`;

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
      <Menu className='nav-main'>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col>
                <Menu.Item key="home">
                  <Link to='/' > <img className='nav-logo' src={logo} alt="app_logo" /></Link>
                </Menu.Item>
              </Col>
              <Col>
                <Menu.Item key="home">
                  <Link to="/">HOME</Link>
                </Menu.Item>
              </Col>
              <Col>
                <Menu.Item key="users">
                  <Link to="/Users"> USERS</Link>
                </Menu.Item>
              </Col>
              <Col>
                <Menu.Item key="status">
                  <Link style={{marginRight: '20px'}} to="/">
                    <b>{user.name} is logged in</b>
                  </Link>
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
