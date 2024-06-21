import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { useUser } from './UserContext.jsx';
import axios from 'axios';
import Item from './Item.jsx'
import '../style/SearchPage.css'
import { useNavigate } from 'react-router-dom';

function Library() {
  const { currentUser } = useUser();
  let [loading, setLoading] = useState(false);
  let [searchResults, setSearchResults] = useState(null);
  let [showAlert, setShowAlert] = useState(false);
  let [showItem, setShowItem] = useState(false);
  let searchResultRef = useRef(null);
  let [currentItem, setCurrentItem] = useState(null);
  let [message, setMessage] = useState('');
  let audioRef = useRef(null);
  let [isVisible, setIsVisible] = useState(true);
  let [color, setColor] = useState('green');
  let navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData  = () => {
   setLoading(true);
   if (currentUser) {
    console.log(currentUser);
    axios.post('http://localhost:3001/usersongs', { username: currentUser })
      .then(response => {
        console.log(response.data);
        setLoading(false);
        setSearchResults(response.data);
        console.log(searchResults);
      })
      .catch(error => {
        console.error('Error sending search data:', error);
        setMessage('Error retriving data.');
        setColor('#e1404e');
        setLoading(false);
        setShowAlert(true);
      });
  } else {
    setMessage('Login in to view library.');
    setColor('#e1404e');
    setLoading(false);
    setShowAlert(true);
  }};

  const hide = classNames('show-item', {
    'overlay': isVisible,
    'hide-item': !isVisible,
  });

  const hidealert = classNames('show-item', {
    'alert': isVisible,
    'hide-item': !isVisible,
  });

  const onItemClick = ({ id, name, artist, album, img, url, type }) => {
    setCurrentItem({ id, name, artist, album, img, url, type });
    setShowItem(true);
  };

  const handleCloseItem = () => {
    if (!audioRef.current.paused) {
      setIsVisible(false);
    } else {
      setShowItem(false);
    }
  };

  const handleRemove = () => {
    setLoading(true);
    console.log('Current User:', currentUser);
    console.log('Current Item:', currentItem);
    axios.post('http://localhost:3001/remove', { username: currentUser, item: currentItem })
      .then(response => {
        const { message, error } = response.data;
        if (message == 'success') {
          setMessage(`Item removed from library`);
          setColor('green');
          loadData();
        } else {
          setMessage(`${error}!`);
          setColor('#e1404e');
        }
        setLoading(false);
        setShowAlert(true);
      })
      .catch(error => {
        console.error('Error sending search data:', error);
        setLoading(false);
      });
  };

  const handleOpenItem = (item) => {
    setCurrentItem(item);
    setShowItem(true);
    setIsVisible(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    if (!currentUser) {
      navigate('/login');
    }
  };

  return (
    <>
    <div className='container'>
  {loading && <div className="loading-animation"></div>}
  <div className='search-results-container'>
  <div className="search-results" ref={searchResultRef}>
    {searchResults && searchResults.map((item, index) => (
          <Item
            key={index}
            id={item.id}
            name={item.name}
            artist={item.artist}
            album={item.album}
            img={item.img}
            url={item.url}
            type={item.type}
            onItemClick={onItemClick}
          />
    ))}
    </div>
    </div>
    </div>
    {showItem && currentItem && (
        <div className={hide}>
        <div className={hidealert}>
          <div className='content'>
          <div className="item-img" style={{ backgroundImage: `url(${currentItem.img})` }}>
          </div>
            <div className="item-details-alert">
              <h2 className="item-name">{currentItem.name}</h2>
              {currentItem.type && <p className="item-info">Type: {currentItem.type}</p>}
              {currentItem.artist && <p className="item-info">Artist: {currentItem.artist}</p>}
              {currentItem.album && <p className="item-info">Album: {currentItem.album}</p>}
            </div>
            </div>
            {currentItem.url && <audio controls src={currentItem.url} ref={audioRef} autoPlay={!isVisible}/>}
            <div>
            <button className="close-btn" id='add' onClick={handleRemove}>Remove</button>
            <button className="close-btn" onClick={handleCloseItem}>Close</button>
            </div>
        </div>
        </div>
      )}
      {showAlert && (
        <div className="overlay">
          <div className="alert" id="alert">
            <div className="content">
              <div className="item-details-alert" id="alertDet" style={{ background: `${color}` }}>
                {message}
              </div>
            </div>
            <button className="close-btn" onClick={handleCloseAlert}>
              Close
            </button>
          </div>
        </div>
      )}

      {currentItem && !isVisible && (
        <div className="floating-toolbar" onClick={() => handleOpenItem(currentItem)}>
          <div className="item-img-circle" style={{ backgroundImage: `url(${currentItem.img})` }}></div>
        </div>
      )}
    </>
  );
}

export default Library;
