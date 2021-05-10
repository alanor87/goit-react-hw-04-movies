import React, { Component } from "react";
import requestParams from "../../API/requestParams";
import axios from "axios";
import MoviesList from "../../components/MoviesList";

class HomePage extends Component {
  state = {
    movies: [],
    error: false,
  };

  componentDidMount() {
    axios
      .get(
        `${requestParams.MAIN_URL}/trending/all/day?api_key=${requestParams.API_KEY}`
      )
      .then((responce) => this.setState({ movies: responce.data.results }))
      .catch(() => this.setState({ error: true }));
  }

  render() {
    const {error, movies} = this.state
    if (error) return <p>Something went wrong!</p>;
    return <MoviesList movies={movies} />;
  }
}

export default HomePage;
