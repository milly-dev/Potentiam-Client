import React from "react";
import { link } from "react-router-dom";
import "../styles/home.css";
import SearchBar from "../components/Search/SearchBar";
import axios from "axios";
import apiHandler from "../api/apiHandler";

class Home extends React.Component {
  state = {
    categories: [],
  };

  handleSearchResult = (Categories) => {
    this.setState({
      categories: Categories,
    });
  };

  handleCategory = (category) => {
    this.props.history.push({
      pathname: `/category/${category._id}`,
      data: category,
    });
  };

  // componentDidMount() {
  //   axios.get(`http://localhost:4000/api/category/all`).then((response) => {
  //     this.setState({
  //       categories: response.data,
  //     });
  //   });
  // } 
  componentDidMount() {
    apiHandler.getCategories().then((response) => {
      this.setState({
        categories: response,
      });
    });
  }

  render() {
    return (
      <div className="homepage">
        <div className="img--header-home">
          <h1>Get a new influence</h1>
          <SearchBar searchResult={this.handleSearchResult} />
        </div>
        <div className="categories-home">
          {this.state.categories.map((category) => {
            // {
            //   this.props.history.push({
            //     pathname: `{/category/${category._id}}`,
            //     data: category,
            //   });
            // }
            // {
            //   <link
            //     to={{
            //       pathname: `{/category/${category._id}}`,
            //       data: category,
            //     }}
            //   />;
            // }
            return (
              <button
                key={category._id}
                onClick={() => this.handleCategory(category)}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
