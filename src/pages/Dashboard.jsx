import React from "react";
// import FormUser from "../components/Forms/FormUser";
// import SocialFollow from "../components/SocialFollow";
import ResumeDashboard from "../components/ResumeDashboard";
// import SettingDashboard from "../components/SettingDashboard";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
  faSnapchat,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Dashboard.css";
// import SidebarDashboad from "../components/Sidebar_Dashboad";
import { withUser } from "../components/Auth/withUser";
// import { UserContext } from "../components/Auth/UserContext";
import apiHandler from "../api/apiHandler";

// const DashboardResume = (props) => {

class DashboardResume extends React.Component {
  // static contextType = UserContext;

  state = {
    myFollowing: [],
    followingToShow: [],
    topThreeUser: [],
    trends: [],
  };

  componentDidMount() {
    apiHandler.getTrends().then((apiResponse) => {
      this.setState({
        trends: apiResponse,
      });
    });
    const currentUser = this.props.context.user;
    // console.log(user);
    currentUser.following.map((follow) => {
      // console.log(follow);
      return apiHandler.getOneUser(follow).then((apiResponse) => {
        this.setState({
          myFollowing: [...this.state.myFollowing, apiResponse],
        });
      });
    });

    this.setState({
      followingToShow: currentUser.followingToShow,
    });
  }

  handleClickAdd = (following) => {
    apiHandler.showFollowing(following).then((apiResponse) => {
      this.setState({
        followingToShow: apiResponse.followingToShow,
      });
      this.props.context.setUser(apiResponse);
    });
  };

  handleClickRmv = (following) => {
    apiHandler.unshowFollowing(following).then((apiResponse) => {
      this.setState({
        followingToShow: apiResponse.followingToShow,
      });
      this.props.context.setUser(apiResponse);
      // this.props.context.setUser();
      // console.log(apiResponse);
    });
  };

  handleClickProfile = (id) => {
    this.props.history.push(`/mainProfile/${id}`);
  };

  render() {
    const currentUser = this.props.context.user;

    // console.log(this.state.followingToShow);
    // console.log(this.state.myFollowing);
    // console.log(this.state.myFollowing.length);
    // console.log(this.state.followingToSend);
    // let displayBtn = false;
    return (
      <div id="general-container">
        <header className="sideBar">
          <ul className="sideBar-ul">
            <li>Profile</li>
          </ul>
        </header>

        <section className="dashboard-content">
          {/* **********SECTION 1************ */}
          <div className="dashboard-sect-one sect-commun">
            <ResumeDashboard />
          </div>

          {/* **********SECTION 2************ */}
          <div className="dashboard-sect-two sect-commun">
            <div className="popularUser-container">
              <div className="popularUser-filtered">
                <h2>Top followers</h2>
                {this.state.trends.map((user) => {
                  return (
                    <div className="top-popularUsers">
                      <img
                        onClick={() => this.handleClickProfile(user._id)}
                        src={user.image}
                        alt=""
                      />
                    </div>
                  );
                })}
              </div>
              <div className="popularUser-socialLinks">
                <h2>Linked accounts</h2>
                <div className="social-links">
                  {/* ********SOCIAL LINKS*********** */}
                  {currentUser.links &&
                    currentUser.links.map((link, i) => {
                      return link.network === "Youtube" ? (
                        <a
                          key={link._id}
                          href={link.url}
                          className="youtube socials"
                        >
                          <FontAwesomeIcon icon={faYoutube} size="2x" />
                        </a>
                      ) : link.network === "Twitter" ? (
                        <a
                          key={link._id}
                          href={link.url}
                          className="twitter socials"
                        >
                          <FontAwesomeIcon icon={faTwitter} size="2x" />
                        </a>
                      ) : link.network === "Facebook" ? (
                        <a
                          key={link._id}
                          href={link.url}
                          className="facebook socials"
                        >
                          <FontAwesomeIcon icon={faFacebook} size="2x" />
                        </a>
                      ) : link.network === "Instagram" ? (
                        <a
                          key={link._id}
                          href={link.url}
                          className="instagram socials"
                        >
                          <FontAwesomeIcon icon={faInstagram} size="2x" />
                        </a>
                      ) : link.network === "Snapchat" ? (
                        <a
                          key={link._id}
                          href={link.url}
                          className="instagram socials"
                        >
                          <FontAwesomeIcon icon={faSnapchat} size="2x" />
                        </a>
                      ) : (
                        <p key={i + "link"}>No social network</p>
                      );
                    })}
                  {/* ********END OCIAL LINKS*********** */}
                </div>
              </div>
            </div>
          </div>

          {/* **********SECTION 3************ */}
          <div className="dashboard-sect-three sect-commun">
            <div className="sect-three-mainImg">
              <img src={this.props.context.user.image} alt="" />
            </div>
            <div className="following-container">
              {this.state.myFollowing.length > 0 &&
                this.state.myFollowing.map((item) => {
                  return (
                    <div key={item._id} className="sect-three-myFollowing">
                      <div className="myFollowing-img">
                        <img src={item.image} alt="" />
                      </div>
                      <div className="myFollowing-info">
                        <h3>{item.pseudo}</h3>
                      </div>
                      <div>
                        {this.state.followingToShow.includes(item._id) && (
                          <button
                            onClick={() => this.handleClickRmv(item)}
                            className="myFollowing-rmvBtn"
                          >
                            Remove
                          </button>
                        )}
                        {!this.state.followingToShow.includes(item._id) && (
                          <button
                            onClick={() => this.handleClickAdd(item)}
                            className="myFollowing-addBtn"
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              {this.state.myFollowing.length === 0 && (
                <p className="noFollowing">You don't following anyone</p>
              )}
            </div>
          </div>
        </section>
      </div>

      // <React.Fragment>
      //   <div id="sidebar-container">
      //     <ul className="sidebar">
      //       <li onClick={this.handleToggle} id="resume" className="active item">
      //         {/* {<AiFillDashboard />} */}
      //         Resume
      //       </li>
      //       <li onClick={this.handleToggle} id="picture" className=" item">
      //         {/* {<FaImage />} */}
      //         Picture
      //       </li>
      //       <li onClick={this.handleToggle} id="form" className="item">
      //         {/* {<FaChromecast />} */}
      //         Form
      //       </li>
      //       <li
      //         onClick={this.handleToggle}
      //         id="setting"
      //         className="setting item"
      //       >
      //         {/* {<AiFillSetting />} */}
      //         Setting
      //       </li>
      //     </ul>
      //   </div>

      //   {/* *********condition for resume page*********** */}
      //   {this.state.resumePage && (
      //     <div
      //       style={{
      //         display: "flex",
      //         flexDirection: "column",
      //         alignItems: "center",
      //       }}
      //     >
      //       <h1
      //         style={{
      //           marginBottom: 20,
      //         }}
      //       >
      //         Resumé PAGE
      //       </h1>
      //       <ResumeDashboard />
      //     </div>
      //   )}
      //   {/* *********condition for FormPAge********** */}
      //   {this.state.formPage && (
      //     <div
      //       style={{
      //         display: "flex",
      //         flexDirection: "column",
      //         alignItems: "center",
      //       }}
      //     >
      //       <h1
      //         style={{
      //           marginBottom: 20,
      //         }}
      //       >
      //         Form User
      //       </h1>
      //       <FormUser />
      //     </div>
      //   )}

      //   {/* *************condition for settingPage******************* */}
      //   {this.state.settingPage && (
      //     <div
      //       style={{
      //         display: "flex",
      //         flexDirection: "column",
      //         alignItems: "center",
      //       }}
      //     >
      //       <h1
      //         style={{
      //           marginBottom: 20,
      //         }}
      //       >
      //         Setting User
      //       </h1>
      //       <SettingDashboard />
      //     </div>
      //   )}

      //   {/* <SidebarDashboad /> */}
      // </React.Fragment>
    );
  }
}

export default withUser(DashboardResume);
