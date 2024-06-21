import React from 'react';

const ItemDetail = ({ currentItem, isVisible, audioRef, handleAdd, handleCloseItem }) => {
  const hide = isVisible ? '' : 'hide-item';

  return (
    <div className={`show-item ${hide}`}>
      <div className='content'>
        <div className="item-img" style={{ backgroundImage: `url(${currentItem.img})` }}></div>
        <div className="item-details-alert">
          <h2 className="item-name">{currentItem.name}</h2>
          {currentItem.type && <p className="item-info">Type: {currentItem.type}</p>}
          {currentItem.artist && <p className="item-info">Artist: {currentItem.artist}</p>}
          {currentItem.album && <p className="item-info">Album: {currentItem.album}</p>}
        </div>
      </div>
      {currentItem.url && <audio controls src={currentItem.url} ref={audioRef} autoPlay={!isVisible} />}
      <div>
        {currentUser && searchType === 'songs' && (
          <button className="close-btn" id='add' onClick={handleAdd}>Add to Library</button>
        )}
        <button className="close-btn" onClick={handleCloseItem}>Close</button>
      </div>
    </div>
  );
};

export default ItemDetail;
