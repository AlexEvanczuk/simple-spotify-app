import { Navbar, Nav, NavItem } from 'react-bootstrap/lib';

export default class NavigationBar extends React.Component {
  render () {
    let { onClickAbout } = this.props;

    return (<Navbar staticTop={true}>
              <Navbar.Header>
                <Navbar.Brand>
                  <img src="./assets/images/logo-large.png"/>
                </Navbar.Brand>
              </Navbar.Header>
              <Nav>
                <NavItem onClick={onClickAbout} eventKey={1} href="#">About</NavItem>
              </Nav>
            </Navbar>);
  }
}