import React from "react";
import "../styles/profile.css";
import SocialFollow from "../components/SocialFollow";
import { withUser } from "../components/Auth/withUser";
// import apiHandler from "../api/apiHandler";

const ProfileCard = (props) => {
  //Can reach connected user with props.context.user
  //Can reach current influencer with props.propsFromMainProfile
  // console.log(props.context);

  // const [value, setValue] = useState(0);

  const idFollower = props.context.user._id;
  const idToFollow = props.propsFromMainProfile;

  // console.log(props.context.user._id);
  // console.log(props.propsFromMainProfile.followers);

  if (!props.propsFromMainProfile) {
    return <p>Page is loading ...</p>;
  }

  return (
    <div className="Card">
      <div className="upper-container">
        <div className="image-follwers ">
          <div className="image-container">
            <img src={props.propsFromMainProfile.image} alt="img" />
          </div>
          <div className="lower-container">
            <span>
              {" "}
              {props.propsFromMainProfile.following
                ? props.propsFromMainProfile.following.length
                : 0}{" "}
              following{" "}
            </span>
            <span>
              {" "}
              {props.propsFromMainProfile.followers
                ? props.propsFromMainProfile.followers.length
                : 0}{" "}
              followers
            </span>
          </div>
        </div>

        <div>
          <SocialFollow propsFromProfileCard={props.propsFromMainProfile} />
        </div>

        <div className="card-description">
          <h3>Description</h3>
          <p>{props.propsFromMainProfile.description}</p>
        </div>

        <div className="Card-btn">
          {!idToFollow.followers.includes(idFollower) && (
            <button
              onClick={() => props.handleFollow(idFollower, idToFollow)}
              className="follow-btn"
            >
              Follow
            </button>
          )}
          {idToFollow.followers.includes(idFollower) && (
            <button
              onClick={() => props.handleUnfollow(idFollower, idToFollow)}
              className="unfollow-btn"
            >
              Unfollow
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
// }

export default withUser(ProfileCard);
