import React from 'react';
import Frame from './Frame';

export default function Frames(props) {
  const {
    frames,
    favourites,
    addFavourite,
    removeFavourite
  } = props;

  return (
    <div className="main">
      <div className="product-header">
        <h1>Full glasses collection</h1>
        <div>
          <p>Eyewear for every side of you, thoughtfully designed in Amsterdam. Browse our full collection of prescription glasses online. Starting from €100 including prescription lenses.</p>
        </div>
      </div>
      <div className="product-grid">
        {frames.map(frame => (
          <Frame
            key={frame.id}
            frame={frame}
            favourites={favourites}
            addFavourite={addFavourite}
            removeFavourite={removeFavourite}
          />
        ))}
      </div>
    </div>
  )
}
