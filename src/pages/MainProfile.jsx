import React from "react";
/* import SocialFollow from "../components/SocialFollow"; */
import "../styles/profile.css";
import ProfileCard from "../pages/ProfileCard";
import apiHandler from "../api/apiHandler";
import { withUser } from "../components/Auth/withUser";

// export class MainProfile extends Component {
class MainProfile extends React.Component {
  state = {
    userToDisplay: null,
    usersFromDash: {},
  };

  componentDidMount() {
    const userConnected = this.props.context.user;

    apiHandler.getOneUser(this.props.match.params.id).then((data) => {
      const usersFromDash = {};

      data.followingToShow.forEach((user) => {
        if (!usersFromDash[user.id_category.name]) {
          usersFromDash[user.id_category.name] = [];
        }
        usersFromDash[user.id_category.name].push(user);
      });

      console.log(usersFromDash);

      this.setState({
        userToDisplay: data,
        usersFromDash: usersFromDash,
      });
    });

    // userConnected.followingToShow.length > 0 &&
    //   userConnected.followingToShow.map((follow) => {
    //     return apiHandler.getOneUser(follow).then((data) => {
    //       this.setState({
    //         usersFromDash: [...this.state.usersFromDash, data],
    //       });
    //     });
    //   });

    // } else console.log("No following added");
  }

  handleFollow = (idFollower, idToFollow) => {
    // console.log(props.propsFromMainProfile);
    apiHandler.followUser(idFollower, idToFollow).then((data) => {
      this.setState({ userToDisplay: data });
      // props.context.setUser(data);
    });
  };

  handleUnfollow = (idFollower, idToFollow) => {
    apiHandler.unfollowUser(idFollower, idToFollow).then((data) => {
      this.setState({ userToDisplay: data });
    });
  };

  handleClick = (user) => {
    // this.props.history.push(`/mainProfile/${id}`);

    apiHandler.getOneUser(user._id).then((apiResponse) => {
      this.setState({
        userToDisplay: apiResponse,
        usersFromDash: apiResponse.followingToShow,
      });
    });
  };

  handleCategory = (id) => {
    this.props.history.push(`/category/${id}`);
  };

  render() {
    // if (!this.state.userToDisplay) {
    if (!this.state.userToDisplay || !this.state.usersFromDash) {
      return <p>Page is loading ...</p>;
    }
    console.log(this.state.usersFromDash);
    // console.log(this.state.userToDisplay);
    return (
      <div className="main-profile">
        <div className="profile-card">
          <ProfileCard
            propsFromMainProfile={this.state.userToDisplay}
            handleFollow={this.handleFollow}
            handleUnfollow={this.handleUnfollow}
          />
        </div>
        <div className="main-container">
          <div className="title">
            <h1>User(s) recommended by {this.state.userToDisplay.pseudo}</h1>
            {Object.keys(this.state.usersFromDash).map((categoryName) => {
              return (
                <div className="left-container">
                  <span
                    className="container-category"
                    onClick={() =>
                      this.handleCategory(
                        this.state.usersFromDash[categoryName][0].id_category
                          ._id
                      )
                    }
                  >
                    {categoryName}
                  </span>

                    <div className="container-recommendation">
                  {this.state.usersFromDash[categoryName].map((user) => {
                    return (
                      <div key={user._id} className="suggestion-container">
                        <div className="food-img">
                          <img
                            onClick={() => this.handleClick(user)}
                            src={user.image}
                            alt=""
                          />
                        </div>
                      </div>
                    );
                  })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default withUser(MainProfile);
// export default withUser(MainProfile);
