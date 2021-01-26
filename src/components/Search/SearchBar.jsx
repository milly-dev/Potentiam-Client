import axios from "axios";
import React, { Component } from "react";
import "../../styles/searchBar.css";

class SearchBar extends Component {
  /* handleChange = (event) => {
    console.log(event.target.value);
    axios.get(
        `http://localhost:4000/api/category/search?searchText=${event.target.value}`
      )
      .then((response) => {
        this.props.searchResult(response.data);
      });
} */
  handleChange = (event) => {
    console.log(event.target.value);
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/api/category/search?searchText=${event.target.value}`
      )
      .then((response) => {
        this.props.searchResult(response.data);
      });
  };

  render() {
    return (
      <form>
        <input
          className="input-search-bar"
          placeholder="Type to search..."
          onChange={this.handleChange}
          type="search"
        ></input>
      </form>
    );
  }
}

export default SearchBar;
