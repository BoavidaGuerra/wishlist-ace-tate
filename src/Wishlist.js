import React from 'react';
import { useLocation } from 'react-router-dom'
import Frame from './Frame';

export default function Wishlist(props) {
  const { frames, favourites } = props
  const location = useLocation();

  const filteredFavs = frames.reduce((frame, { id, name, color, frontImageUrl }) =>
  {
      favourites.includes(id) && frame.push({ id, name, color, frontImageUrl });
      return frame;
  }, []);
  console.log(location.pathname)
  return (
    <div className="main">
      <div className="wishlist product-header">
        <h1>Wishlist</h1>
        <div>
          <p>Welcome to your Wishlist. Your favourites all in one place.</p>
        </div>
      </div>
      <div className="product-grid">
        {filteredFavs.map(frame => (
          <Frame
            key={frame.id}
            frame={frame}
            location={location.pathname}
            // favourites={favourites} // don't need this
          />
        ))}
      </div>
    </div>
  )
}
