import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "../../styles/formUser.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
  faSnapchat,
} from "@fortawesome/free-brands-svg-icons";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
  FaSnapchatSquare,
  FaYoutubeSquare,
} from "react-icons/fa";
import apiHandler from "../../api/apiHandler";
import { withUser } from "../Auth/withUser";
import { buildFormData } from "../../utils";

class FormUser extends Component {
  state = {
    pseudo: "",
    description: "",
    image: "",
    links: [],
    categories: [],
    name_category: "",
    id_category: "",
  };

  imageRef = React.createRef();

  componentDidMount() {
    apiHandler.getCategories().then((data) => {
      this.setState({
        categories: data,
      });
    });

    apiHandler.getUserInfo().then((data) => {
      this.setState({
        ...data,
      });
    });
  }

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({
      [key]: value,
    });
  };

  handleSelect = (event) => {
    var index = event.nativeEvent.target.selectedIndex;
    const name = event.nativeEvent.target[index].text;

    this.setState({
      id_category: event.target.value,
      name_category: name,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    const copy = { ...this.state };
    delete copy.categories;
    delete copy.name_category;

    buildFormData(formData, copy);

    formData.append("image", this.imageRef.current.files[0]);

    console.log(this.state);
    //This is to console.log the data in formData before sending
    console.log(Object.fromEntries(formData));

    apiHandler
      .updateProfile(formData)
      .then((dataReceived) => {
        console.log("Profile updated with this data :" + dataReceived);
        //To update the contexte and by the way all modif
        this.props.context.setUser(dataReceived);
        this.props.history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleSocialLinks = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    const socialLink = { url: value, network: key };

    const linkIndex = this.state.links.findIndex(
      (element) => element.network === key
    );

    if (linkIndex < 0) {
      this.setState({
        links: [...this.state.links, socialLink],
      });
    } else {
      // const copy = [...this.state.links ];
      // copy.splice(linkIndex, 1, socialLink)

      // this.setState({
      //     links: copy
      // })
      this.setState({
        links: this.state.links.map((link, index) =>
          index === linkIndex ? socialLink : link
        ),
      });
    }
  };

  render() {
    // console.log(this.state.previousValue);
    return (
      <div className="form-style">
        <form onSubmit={this.handleSubmit}>
          <div className="first-container">
            <div className="pseudo-container">
              <label htmlFor="pseudo" label="Psuedo" name="pseudo">
                pseudo
              </label>
              <input id="pseudo" name="pseudo" onChange={this.handleChange} />
            </div>
            <div className="category-container">
              <label htmlFor="category" label="Category" name="category">
                category
              </label>
              <select
                id="category"
                name="category"
                onChange={this.handleSelect}
              >
                {this.state.categories.map((category, i) => {
                  return (
                    <option key={i + "key"} value={category._id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="second-container">
            <label htmlFor="description" label="Description" name="description">
              description
            </label>
            <textarea
              id="description"
              name="description"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-image-container">
            <label className="form-image" htmlFor="image">
              Pick your Picture
            </label>
            <input ref={this.imageRef} id="image" name="image" type="file" />
          </div>
          <div className="social-container-form">
            <div className="snapchat-container">
              <label label={<FaSnapchatSquare />} name="snapchat"></label>

              <FontAwesomeIcon
                className="snapchat social"
                icon={faSnapchat}
                size="2x"
              />
              <input name="Snapchat" onChange={this.handleSocialLinks} />
            </div>
            <div className="facebook-container">
              <label label={<FaFacebookSquare />} name="facebook"></label>
              <FontAwesomeIcon
                className="facebook social"
                icon={faFacebook}
                size="2x"
              />
              <input name="Facebook" onChange={this.handleSocialLinks} />
            </div>
            <div className="twitter-container">
              <label label={<FaTwitterSquare />} name="twitter"></label>
              <FontAwesomeIcon
                className="twitter social"
                icon={faTwitter}
                size="2x"
              />
              <input name="Twitter" onChange={this.handleSocialLinks} />
            </div>
            <div className="youtube-container">
              <label label={<FaYoutubeSquare />} name="youtube"></label>
              <FontAwesomeIcon
                className="youtube "
                icon={faYoutube}
                size="2x"
              />
              <input name="Youtube" onChange={this.handleSocialLinks} />
            </div>
            <div className="insteg-container">
              <label label={<FaInstagramSquare />} name="instagram"></label>
              <FontAwesomeIcon
                className="instagram social"
                icon={faInstagram}
                size="2x"
              />
              <input name="Instagram" onChange={this.handleSocialLinks} />
            </div>
          </div>
          <button className="submit-btn" type="submit" label="Submit">
            submit
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(withUser(FormUser));
