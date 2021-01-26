import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { UserContext } from "../Auth/UserContext";
import apiHandler from "../../api/apiHandler";
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
import "../../styles/FormSign.css";

class FormSignup extends Component {
  static contextType = UserContext;

  state = {
    email: "",
    password: "",
    pseudo: "",
  };

  handleChange = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    this.setState({ [key]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    apiHandler
      .signup(this.state)
      .then((data) => {
        this.context.setUser(data);
      })
      .catch((error) => {
        console.log(error);
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
            <h1>Sign up</h1>
            <form className="form-sign" onSubmit={this.handleSubmit}>
              <div className="sign-password">
                <label htmlFor="pseudo">Pseudo</label>
                <input
                  onChange={this.handleChange}
                  value={this.state.pseudo}
                  type="text"
                  id="peusdo"
                  name="pseudo"
                />
              </div>
              <div className="sign-password">
                <label htmlFor="email">Email address</label>
                <input
                  onChange={this.handleChange}
                  value={this.state.email}
                  type="email"
                  id="email"
                  name="email"
                />
              </div>
              <div className="sign-password">
                <label htmlFor="password">Create a password</label>
                <input
                  onChange={this.handleChange}
                  value={this.state.password}
                  type="password"
                  id="password"
                  name="password"
                />
              </div>
              <button type="submit" className="btn-sbm">
                Let's go in
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FormSignup);
