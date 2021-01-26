import React from "react";
import { NavLink } from "react-router-dom";
import { withUser } from "../components/Auth/withUser";
import apiHandler from "../api/apiHandler";
import { Box, Flex, Spacer, Button } from "@chakra-ui/react";
import "../styles/NavMain.css";

const NavMain = (props) => {
  const { context } = props;

  function handleLogout() {
    apiHandler
      .logout()
      .then(() => {
        context.removeUser();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Flex align="center">
      <Box p="2">
        <Button
          colorScheme="black"
          size="md"
          as={NavLink}
          exact
          to="/"
          variant="ghost"
          m="4px 0"
        >
          POTENTIAM
        </Button>
      </Box>
      <Spacer />
      <Box p="2">
        {context.isLoggedIn && (
          <React.Fragment>
            <Button
              colorScheme="purple"
              size="md"
              as={NavLink}
              exact
              to="/dashboard"
              variant="ghost"
              m="4px 0"
            >
              Dashboard
            </Button>
            <Button
              className="btn-ctx-pseudo"
              variant="ghost"
              as={NavLink}
              exact
              to={`/MainProfile/${context.user._id}`}
            >
              {context.user && context.user.pseudo} profile
            </Button>
            <Button
              colorScheme="purple"
              size="md"
              as={NavLink}
              exact
              to="/signin"
              variant="solid"
              m="4px 0"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </React.Fragment>
        )}
        {!context.isLoggedIn && (
          <React.Fragment>
            <Button
              size="md"
              as={NavLink}
              exact
              to="/signin"
              m="4px 20px"
              colorScheme="black"
              variant="outline"
            >
              Signin
            </Button>
            <Button
              size="md"
              as={NavLink}
              exact
              to="/signup"
              m="4px 0"
              colorScheme="purple"
              variant="solid"
            >
              Signup
            </Button>
          </React.Fragment>
        )}
      </Box>
    </Flex>
    //
  );
};

export default withUser(NavMain);
