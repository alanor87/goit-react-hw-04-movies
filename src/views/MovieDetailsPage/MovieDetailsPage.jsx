import React, { Component } from "react";
import { NavLink, Route, withRouter } from "react-router-dom";
import requestParams from "../../API/requestParams";
import axios from "axios";
import routes from "../../routes";
import Cast from "../Cast";
import Reviews from "../Reviews";
import defaultImage from "../../img/default.jpg";

class MovieDetailsPage extends Component {
  state = {
    isLoading: true,
    movieDetails: {},
    error: false,
    movieId: this.props.match.params.movieId,
    backPath: this.props.location?.state?.from || "/",
  };

  componentDidMount() {
    axios
      .get(
        `${requestParams.MAIN_URL}/movie/${this.state.movieId}?api_key=${requestParams.API_KEY}`
      )
      .then((responce) =>
        this.setState({
          movieDetails: responce.data,
          isLoading: false,
        })
      )
      .catch(() => this.setState({ error: true }));
  }

  render() {
    
    const {
      poster_path,
      backdrop_path,
      original_title,
      release_date,
      vote_average,
      overview,
      genres,
    } = this.state.movieDetails;
    const { movieId, backPath } = this.state;
    const { movies, reviews, cast } = routes;

    if (this.state.error)
      return <p>Movie info does not load, something went wrong!</p>;
    
    let imgSource = defaultImage;

    if (poster_path || backdrop_path)
      imgSource = `https://themoviedb.org/t/p/w300${
        poster_path || backdrop_path
      }`;

    return (
      !this.state.isLoading && (
        <>
          <button
            className="back-button"
            type="button"
            onClick={() => this.props.history.push(backPath)}
          >
            {" "}
            &#x2190; Go back
          </button>
          <section className="movie-details">
            <div className="movie-poster">
              <img src={imgSource} alt={original_title} />
            </div>
            <div className="movie-details-text">
              <h1>{`${original_title} (${release_date})`}</h1>
              <p>{`User score: ${vote_average}`}</p>
              <h2>Overview</h2>
              <p>{overview}</p>
              <h2>Genres</h2>
              {genres && (
                <p>
                  {genres.map((genre) => (
                    <span key={genre.id} className="movie-genre">
                      {genre.name}
                    </span>
                  ))}
                </p>
              )}
            </div>
          </section>

          <section className="additional-movie-info">
            <ul>
              <p>Additional information</p>
              <li>
                <NavLink to={`${movies}/${movieId}${cast}`}>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to={`${movies}/${movieId}${reviews}`}>
                  Reviews
                </NavLink>
              </li>
            </ul>
          </section>

          <Route
            path={`${movies}/${movieId}${cast}`}
            render={(props) => {
              return <Cast {...props} movieId={movieId} />;
            }}
          />
          <Route
            path={`${movies}/${movieId}${reviews}`}
            render={(props) => {
              return <Reviews {...props} movieId={movieId} />;
            }}
          />
        </>
      )
    );
  }
}

export default withRouter(MovieDetailsPage);
