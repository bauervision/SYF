import React from "react";
import { Box, Heading, Text, Image } from "gestalt";
import { NavLink } from "react-router-dom";

import Logo from "../Images/SYF-Logo.png";

const Navbar = () => (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="around"
    height={70}
    color="midnight"
    padding={1}
  >
    <NavLink activeClassName="active" to="/" exact>
      <Box display="flex" alignItems="center">
        <Box margin={10} height={100} width={100} paddingY={5}>
          <Image src={Logo} alt="SYF Logo" naturalHeight={1} naturalWidth={1} />
        </Box>
        <Heading size="xs" color="lightGray">
          Sport Your Faith
        </Heading>
      </Box>
    </NavLink>

    <NavLink activeClassName="active" to="/signin">
      <Text size="xl" color="white">
        Sign In
      </Text>
    </NavLink>

    <NavLink activeClassName="active" to="/signup">
      <Text size="xl" color="white">
        Sign Up!
      </Text>
    </NavLink>

    <NavLink activeClassName="active" to="/checkout">
      <Text size="xl" color="white">
        Check Out
      </Text>
    </NavLink>
  </Box>
);
export default Navbar;
