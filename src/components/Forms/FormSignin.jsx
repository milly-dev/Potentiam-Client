import React, { Component } from "react";
import { UserContext } from "../Auth/UserContext";
import { withRouter, Redirect } from "react-router-dom";
import apiHandler from "../../api/apiHandler";
import "../../styles/FormSign.css";
// import {
//   Input,
//   Stack,
//   Icon,
//   InputGroup,
//   FormControl,
//   FormLabel,
//   Button,
//   InputLeftElement,
// } from "@chakra-ui/react";

class FormSignin extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
  };

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signin(this.state)
      .then((data) => {
        this.context.setUser(data);
        this.props.history.push("/");
      })
      .catch((error) => {
        console.log(error);
        // Display error message here, if you set the state
      });
  };

  render() {
    if (this.context.user) {
      return <Redirect to="/" />;
    }

    return (
      <div className="backgroundCOlor--sign">
        <div className="Form-Sign">
          <div className="div-sign">
            <h1>Sign in</h1>
            <form
              className="form-sign"
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
            >
              <div className="sign-password">
                <label>Email address</label>
                <input type="email" id="email" name="email" />
              </div>
              <div className="sign-password">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" />
              </div>
              <button className="btn-sbm" type="submit">
                Let's go in
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FormSignin);
