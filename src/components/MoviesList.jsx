import React from 'react';
import { NavLink, withRouter } from "react-router-dom";
import routes from "../routes";

const MoviesList = ({ movies, location }) => {
    return (
      <ul>
        {movies &&
          movies.map((movie) => {
            return (
              <li key={movie.id}>
                <NavLink
                  to={{
                    pathname: `${routes.movies}/${movie.id}`,
                    state: { from: `${location.pathname}${location.search}` },
                  }}
                >
                  {movie.name || movie.title || movie.original_title}
                </NavLink>
              </li>
            );
          })}
      </ul>
    );
}
 
export default withRouter(MoviesList);