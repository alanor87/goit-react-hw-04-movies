import React, { Component } from "react";
import axios from "axios";
import requestParams from "../../API/requestParams";
import routes from "../../routes";
import defaultAvatar from '../../img/default-avatar.png'

class Cast extends Component {
  state = {
    cast: [],
    error: false,
    movieId: this.props.movieId,
    isLoading: true,
  };

  componentDidMount() {
    axios
      .get(
        `${requestParams.MAIN_URL}/movie/${this.state.movieId}${routes.cast}?api_key=${requestParams.API_KEY}`
      )
      .then((responce) =>
        this.setState({ cast: responce.data.cast, isLoading: false })
      )
      .catch(() => this.setState({ error: true }));
  }

  render() {
    const { error, cast, isLoading } = this.state;
    if (error) return <p>Something went wrong!</p>;
    if (cast.length === 0) return <p>No cast info available!</p>;
    return (
      <ul className="movie-cast">
        {cast.map(({ id, profile_path, name, character }) => {
          let imgSource = defaultAvatar;
          if (profile_path) imgSource = `https://themoviedb.org/t/p/w200${profile_path}`;
          return (
            !isLoading && (
              <li key={id}>
                <img src={imgSource} alt={name} />
                <p>{name}</p>
                <p>Character: {character}</p>
              </li>
            )
          );
        })}
      </ul>
    );
  }
}

export default Cast;
