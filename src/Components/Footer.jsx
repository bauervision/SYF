import React from "react";
import { Box, Text } from "gestalt";
import { NavLink } from "react-router-dom";

const Footer = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="around"
    height={70}
    color="midnight"
    padding={1}
  >
    <NavLink activeClassName="active" to="/signin">
      <Text color="white">About</Text>
    </NavLink>

    <NavLink activeClassName="active" to="/signin">
      <Text color="white">Contact</Text>
    </NavLink>
  </Box>
);
export default Footer;
