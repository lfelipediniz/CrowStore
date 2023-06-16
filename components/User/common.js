import React, { useState, useEffect } from "react";
import {
  Container,
  SideNav,
  SearchBarContainer,
  Content,
  SidebarContainer,
  EditButtonCotainer,
  ProductContainer,
  ProductCardEdit,
  RemoveButton,
} from "./UserElements";

import ProductCard from "../ReusedComponents/ProductCard";
import Products from "../../fakedata/adminContent/products.json";
import SearchBar from "../SearchBar";
import { Box, Divider, List, ListItem, ListItemText } from "@mui/material";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

function CommonUser() {
  return <>
  <Container>
         <SideNav>
          <Box>
            <List>
              <EditButtonCotainer>
                <ListItem >
                  <ListItemText
                   
                  />
                </ListItem>
              </EditButtonCotainer>

            </List>
          </Box>
        </SideNav>

</Container>
  
  </>;
}

export default CommonUser;
