import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import AppBar from './components/AppBar';
import routes from './routes'

const HomePage = lazy(() => import('./views/HomePage' /* webpackChunkName: "HomePage" */));
const MoviesPage = lazy(() => import('./views/MoviesPage' /* webpackChunkName: "Movies" */));
const MovieDetailsPage = lazy(() => import('./views/MovieDetailsPage' /* webpackChunkName: "MovieDetailsPage" */));
class App extends React.Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <Suspense fallback={<h1>Loading...</h1>}>
          <Switch>
            <Route exact path={routes.home} component={HomePage} />
            <Route exact path={routes.movies} component={MoviesPage} />
            <Route path={`${routes.movies}/:movieId`} component={MovieDetailsPage} />
            <Route component={HomePage} />
          </Switch>
        </Suspense>
      </div>
    );
  }

}

export default App;
