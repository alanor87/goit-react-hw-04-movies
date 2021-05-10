import React from "react";
import { NavLink } from "react-router-dom";
import routes from "../routes";

const AppBar = () => {
  return (
    <nav>
      <ul className="nav-list">
        <li>
          <NavLink exact
            className="nav-link"
            activeClassName="nav-link-active"
            to={routes.home}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            className="nav-link"
            activeClassName="nav-link-active"
            to={routes.movies}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AppBar;
