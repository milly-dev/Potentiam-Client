import React from "react";
import apiHandler from "../api/apiHandler";
import SearchBar from "../components/Search/SearchBar";
import "../styles/categoryPage.css";

class CategoryPage extends React.Component {
  state = {
    usersInCategory: [],
    sortName: true,
    sortFollower: true,
  };

  componentDidMount() {
    apiHandler
      .getUsersByCategory(this.props.match.params.id, this.state.sortName)
      .then((data) => {
        this.setState({
          usersInCategory: data,
        });
        // console.log(this.state.usersInCategory);
      });
  }

  handleSort = () => {
    this.setState({
      usersInCategory: [...this.state.usersInCategory].sort((a, b) => {
        if (this.state.sortName) {
          return a.pseudo.localeCompare(b.pseudo);
        } else {
          return b.pseudo.localeCompare(a.pseudo);
        }
      }),
      sortName: !this.state.sortName,
    });
  };

  handleSortFollower = () => {
    this.setState({
      usersInCategory: [...this.state.usersInCategory].sort((a, b) => {
        if (this.state.sortFollower) {
          return a.followers.length - b.followers.length;
        } else {
          return b.followers.length - a.followers.length;
        }
      }),
      sortFollower: !this.state.sortFollower,
    });
  };

  handleClick = (id) => {
    this.props.history.push(`/mainProfile/${id}`);
  };

  render() {
    if (!this.props.location.data) {
      return <p>Loading page ...</p>;
    }
    // console.log(this.props.location.data);
    return (
      <div className="category-style">
        <div className="img--header-category">
          <h1>Improve your {this.props.location.data.name}</h1>
          {/* <SearchBar searchResult={this.handleSearchResult} /> */}
        </div>

        <div className="btn-style">
          <button className="btn-filter" onClick={this.handleSortFollower}>
            Sort by followers
            {this.state.sortFollower ? "⟱" : "⟰"}
          </button>

          <button className="btn-filter" onClick={this.handleSort}>
            Sort by name
            {this.state.sortName ? "⟱" : "⟰"}
          </button>
        </div>
        <div className="category-wrap">
          {this.state.usersInCategory.map((each) => (
            <div
              onClick={() => this.handleClick(each._id)}
              className="category-user"
              key={each._id}
            >
              <img className="category-user-img" src={each.image} alt="" />
              <p>{each.pseudo}</p>
              <p>{each.followers.length}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default CategoryPage;
