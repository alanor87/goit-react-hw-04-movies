import React, { Component } from "react";
import axios from "axios";
import queryString from "query-string";
import requestParams from "../../API/requestParams";
import MoviesList from "../../components/MoviesList";

class MoviesPage extends Component {
  state = {
    query: "",
    searchResults: [],
  };

  componentDidMount() {
    const prevQuery = queryString.parse(this.props.location.search).query;
    if (prevQuery) this.fetchMovies(prevQuery);
  }

  onInputChange = (event) => {
    this.setState({ query: event.target.value });
  };

  fetchMovies = (query) => {
    axios
      .get(
        `${requestParams.MAIN_URL}/search/movie?api_key=${requestParams.API_KEY}&query=${query}`
      )
      .then((responce) =>
        this.setState({ searchResults: responce.data.results })
      )
      .finally(() => {
        this.props.history.push({
          pathname: this.props.location.pathname,
          search: `query=${query}`,
        });
      });
  };

  onSearch = (event) => {
    if (event) event.preventDefault();
    if (!this.state.query) return;
    this.fetchMovies(this.state.query);
    event.target.reset();
  };

  render() {
    const { searchResults } = this.state;
    return (
      <>
        <form onSubmit={this.onSearch}>
          <input type="text" onChange={this.onInputChange} />
          <button type="submit">Search</button>
        </form>
        {searchResults && <MoviesList movies={searchResults} />}
      </>
    );
  }
}

export default MoviesPage;
