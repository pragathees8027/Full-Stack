import React from 'react';
import PropTypes from 'prop-types';
import '../style/Item.css'

const Item = ({ id, name, artist, album, img, url, type, onItemClick }) => {
  const handleClick = () => {
    onItemClick({ id, name, artist, album, img, url, type});
  };

  return (
    <div className='item' onClick={handleClick}>
      <div className="item-content" style={{ backgroundImage: `url(${img})` }}>
        <div className="item-details">
          <h2>{name}</h2>
        </div>
      </div>
    </div>
  );
};

Item.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  artist: PropTypes.string,
  album: PropTypes.string,
  img: PropTypes.string.isRequired,
  url: PropTypes.string,
  type: PropTypes.string.isRequired,
  onItemClick: PropTypes.func.isRequired,
};

export default Item;
