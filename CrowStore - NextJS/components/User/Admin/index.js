import React, { useState } from "react";
import { WrapContent } from "../../ReusedComponents/WrapContent";
import {
  UserContainer,
  SideNavContainer,
  Button,
  EditModeContainer,
  EditModeButton,
  EditModeOptions,
  EditModeOption,
} from "../UserElements";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

function Admin() {
  return (
    <WrapContent>
      <UserContainer>
        <Sidebar>
          <Menu>
            <SubMenu label="Charts">
              <MenuItem> Pie charts </MenuItem>
              <MenuItem> Line charts </MenuItem>
            </SubMenu>
            <MenuItem> Documentation </MenuItem>
            <MenuItem> Calendar </MenuItem>
          </Menu>
        </Sidebar>
      </UserContainer>
    </WrapContent>
  );
}

export default Admin;
