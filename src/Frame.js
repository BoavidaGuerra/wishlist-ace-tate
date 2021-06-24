import React, { useRef, useState, useEffect } from 'react'
import logo from './logo.svg'
import button from './btn_like.svg'
import buttonActive from './btn_like_active.svg'

export default function Frame(props) {

  const {
    frame,
    favourites,
    addFavourite,
    removeFavourite,
    location
  } = props;

  const [active, setActive] = useState(false);
  const buttonRef = useRef();

  const handleClick = () => {
    if (!active) {
      addFavourite(frame.id);
      setActive(prevActive => !prevActive)
      buttonRef.current.src = buttonActive
    }
    if (active) {
      removeFavourite(frame.id)
      setActive(prevActive => !prevActive)
      buttonRef.current.src = button
    }
  }

  useEffect(() => {
    if (location !== "/wishlist") {
      if (favourites.includes(frame.id)) {
        setActive(true);
        buttonRef.current.src = buttonActive;
      }
    }
  }, [])

  return (
    <div id={frame.id} className="product-card_container">
      <div className="product-card_image">
        <img
        src={frame.frontImageUrl === undefined ? logo : frame.frontImageUrl}
        alt={`${frame.name} frames in ${frame.color}`}
        />
      </div>
      <div className="product-card">
        {(location !== "/wishlist") && (
        <div
          onClick={handleClick}
          tabIndex="0"
          role="button">
            <img
            ref={buttonRef}
            src={button}
            alt=""
            />
        </div>
        )}
        <div className="card-description" title={`${frame.name} ${frame.color}`}>
          <strong>{frame.name}</strong>
          <span> {frame.color}</span>
        </div>
      </div>
    </div>

  )
}
