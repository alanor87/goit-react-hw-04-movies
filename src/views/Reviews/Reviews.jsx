import React, { Component } from "react";
import axios from "axios";
import requestParams from "../../API/requestParams";
import routes from "../../routes";

class Reviews extends Component {
  state = {
    reviews: [],
    error: false,
    movieId: this.props.movieId,
    isLoading: true,
  };

  componentDidMount() {
    axios
      .get(
        `${requestParams.MAIN_URL}/movie/${this.state.movieId}${routes.reviews}?api_key=${requestParams.API_KEY}`
      )
      .then((responce) =>
        this.setState({ reviews: responce.data.results, isLoading: false })
      )
      .catch(() => this.setState({ error: true }));
  }
  render() {
    const { error, isLoading, reviews } = this.state;
    if (error) return <p>Something went wrong!</p>;
    if (reviews.length === 0) return <p>No reviews here!</p>;
    return (
      !isLoading && (
        <ul className="movie-reviews">
          {reviews.map(({ id, author, content }) => {
            return (
              <li key={id}>
                <h2>Author: {author}</h2>
                <p>{content}</p>
              </li>
            );
          })}
        </ul>
      )
    );
  }
}

export default Reviews;
