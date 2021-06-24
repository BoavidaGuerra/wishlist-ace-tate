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
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/wishlist-ace-tate/">Browse Frames</Link>
            </li>
            <li>
              <Link to="/wishlist-ace-tate/wishlist">Wishlist</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route exact path="/wishlist-ace-tate/">
            <FramesList
              frames={frames}
              favourites={favourites}
              addFavourite={addFavourite}
              removeFavourite={removeFavourite}
            />
          </Route>
          <Route path="/wishlist-ace-tate/wishlist">
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
