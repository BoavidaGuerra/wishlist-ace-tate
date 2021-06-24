import React from 'react'
import useStoreState from './useStoreState';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import fetchFrames from './fetchFrames';
import FramesList from './FramesList';
import Wishlist from './Wishlist';
import './App.css';

export default function App() {
  const [favourites, setFavourites] = useStoreState([], "favourites");
  const { frames } = fetchFrames();

  const addFavourite = (frameId) => {
    setFavourites(prevFavourites => {
      return [...new Set([...prevFavourites, frameId])]
    })
  }

  const removeFavourite = (frameId) => {
    setFavourites(favourites.filter((item) => item !== frameId))
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Browse Frames</Link>
            </li>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/">
            <FramesList
              frames={frames}
              favourites={favourites}
              addFavourite={addFavourite}
              removeFavourite={removeFavourite}
            />
          </Route>
          <Route path="/wishlist">
            <Wishlist
              frames={frames}
              favourites={favourites}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
