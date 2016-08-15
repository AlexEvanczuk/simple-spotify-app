import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap/lib';

const NavigationBar = ({ onOpenAbout }) => (
  <Navbar staticTop>
    <Navbar.Header>
      <Navbar.Brand>
        <img alt="" src="./images/logo-large.png" />
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem onClick={onOpenAbout} eventKey={1} href="#">About</NavItem>
    </Nav>
  </Navbar>
);

NavigationBar.propTypes = {
  onOpenAbout: React.PropTypes.func.isRequired,
};

export default NavigationBar;
