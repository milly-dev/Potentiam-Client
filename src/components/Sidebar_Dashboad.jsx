import React from "react";
import { withRouter } from "react-router-dom";
import { FaImage, FaChromecast } from "react-icons/fa";
import { AiFillSetting, AiFillDashboard } from "react-icons/ai";
import "../styles/Dashboard.css";

class Sidebar_Dashboad extends React.Component {
  state = {
    activeState: false,
  };

  handleToggle = () => {
    this.setState({
      activeState: !this.state.activeState,
    });
    // console.log("test25");
  };

  render() {
    return (
      <React.Fragment>
        <div id="sidebar-container">
          <ul className="sidebar">
            <li onClick={this.handleToggle} id="resume" className="active item">
              {/* {<AiFillDashboard />} */}
              Resume
            </li>
            <li onClick={this.handleToggle} id="picture" className=" item">
              {/* {<FaImage />} */}
              Picture
            </li>
            <li onClick={this.handleToggle} id="form" className="item">
              {/* {<FaChromecast />} */}
              Form
            </li>
            <li
              onClick={this.handleToggle}
              id="setting"
              className="setting item"
            >
              {/* {<AiFillSetting />} */}
              Setting
            </li>
          </ul>
        </div>
      </React.Fragment>
      // <div id="sidebar-container">
      //   <ul className="sidebar">
      //     <li onClick={this.handleToggle} className="active item">
      //       {<AiFillDashboard />}
      //     </li>
      //     <li
      //       onClick={this.handleToggle}
      //       className={`${!this.state.activeState} item`}
      //     >
      //       {<FaImage />}
      //     </li>
      //     <li onClick={this.handleToggle} className="item">
      //       {<FaChromecast />}
      //     </li>
      //     <li onClick={this.handleToggle} className="setting item">
      //       {<AiFillSetting />}
      //     </li>
      //   </ul>
      // </div>
    );
  }
}

export default withRouter(Sidebar_Dashboad);
