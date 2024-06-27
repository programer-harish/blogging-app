import React, { useEffect, useState } from 'react';
import { Link, redirect, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import { doLogout, getCurrentUserDetail, isLoggedIn } from './auth';
import keycloak from '../keycloak';

const CustomNavbar = () => {

  const navigate = useNavigate();
  
  const [login, setLogin] = useState(false);
  const [user, setUser] = useState(undefined);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    setLogin(isLoggedIn())
    setUser(getCurrentUserDetail())
  }, [login])

  const handleLogout=(e)=>{
    e.preventDefault();
    // console.log("hello Logout")
    
    doLogout(()=>{
      setLogin(false)
      navigate("/login")
    })
    // this.props.history.push('/user/dashboard')//issue and custom navbar state not changes at login page due to not hanling global state managemnt
   
  }
  const kchandleLogout=(e)=>{
    e.preventDefault();
    doLogout(()=>{
      setLogin(false)
    })
      
    keycloak.logout()
    
  }

  return (
    <div>
      <Navbar
        color="dark"
        dark
        expand="md"
        fixed=""
        className='px-5'
      >
        <NavbarBrand tag={Link} to="/">Thoughts</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/">NewFeed</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/about">About</NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                More
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Contact Us</DropdownItem>
                <DropdownItem>Facebook</DropdownItem>
                <DropdownItem>Instagram</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Follow us</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Nav navbar>
            {!!keycloak.authenticated &&<>
              <NavItem>
                <NavLink tag={Link} to="/user/profile">Profile</NavLink>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/user/dashboard" >
                  {user?.email}
                </NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink tag={Link} onClick={handleLogout}>
                  Logout
                </NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink tag={Link} onClick={kchandleLogout}>
                  KC Logout
                </NavLink>
              </NavItem>
            </>}
            {!keycloak.authenticated &&<>
              <NavItem>
                {/* <NavLink tag={Link} to="/user/login">Login</NavLink> */}
                <button
                     type="button"
                     className="text-blue-800"
                     onClick={() => keycloak.login()}
                   >
                     Login
                   </button>
              </NavItem>
              <NavItem>
                <NavLink tag={Link} to="/signup">
                  Signup
                </NavLink>
              </NavItem>
            </>}
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default CustomNavbar;