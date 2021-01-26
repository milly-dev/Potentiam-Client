import React from "react";
import { withUser } from "../components/Auth/withUser";
import FormUser from "../components/Forms/FormUser";
import "../styles/formUser.css";
const ResumeDashboard = (props) => {
  const { context } = props;

  return (
    <div id="resumeContainer">
      <header>
        {/* <img src={context.user && context.user.image} alt="" /> */}
        <div className="textHeader">
          {/* <p>Hi {context.user && context.user.pseudo}</p> */}
          <p>Welcome Back {context.user && context.user.pseudo} !</p>
        </div>
      </header>
      <FormUser />
    </div>
  );
};

export default withUser(ResumeDashboard);
