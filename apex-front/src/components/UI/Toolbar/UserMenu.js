import React from 'react';
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";

const UserMenu = ({user, logout}) => {
    return (
      <UncontrolledDropdown nav inNavbar>
        <Nav className="ml-auto" navbar>
          {user.role === 'admin' ? (<NavItem>
            <NavLink tag={RouterNavLink} to="/admin_office" exact>Офис админа</NavLink>
          </NavItem>): null}
        </Nav>
        <DropdownToggle nav caret>
          Hello, {user.username}!


        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem onClick={logout}>
             Выйти
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
};
export default UserMenu;