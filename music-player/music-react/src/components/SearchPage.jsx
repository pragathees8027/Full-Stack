import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { useUser } from './UserContext.jsx';
import axios from 'axios';
import Item from './Item.jsx'
import '../style/SearchPage.css'

let page = 1;
let pageLimit = 1;

function SearchPage() {
  const { currentUser } = useUser();
  let [query, setQuery] = useState('');
  let [searchType, setSearchType] = useState('songs');
  let [loading, setLoading] = useState(false);
  let [searchResults, setSearchResults] = useState(null);
  let [buttonVisible, setButtonVisible] = useState(false);
  let [showAlert, setShowAlert] = useState(false);
  let [showItem, setShowItem] = useState(false);
  let searchResultRef = useRef(null);
  let [currentItem, setCurrentItem] = useState(null);
  let [message, setMessage] = useState('');
  let audioRef = useRef(null);
  let [isVisible, setIsVisible] = useState(true);
  let [color, setColor] = useState('green');

  const hide = classNames('show-item', {
    'overlay': isVisible,
    'hide-item': !isVisible,
  });

  const hidealert = classNames('show-item', {
    'alert': isVisible,
    'hide-item': !isVisible,
  });
  
  const handleSearch = () => {
    if (query.trim() === '') {
      setMessage('Please enter a search query.');
      setColor('#e1404e');
      setShowAlert(true);
      return;
    }
    setLoading(true);
    console.log('Query: ', query)
    console.log('Search Type: ', searchType);
    console.log('Page: ', page)
    axios.post('http://localhost:3001/search', { query, searchType, page })
      .then(response => {
        const { data, totalPages } = response.data;
        console.log('Search data sent successfully');
        setLoading(false);
        setSearchResults(data);
        setButtonVisible(true);
        pageLimit = totalPages;
        console.log(searchResults);
      })
      .catch(error => {
        console.error('Error sending search data:', error);
        pageLimit = 1;
        setMessage('Error sending search data.');
        setColor('#e1404e');
        setShowAlert(true);
        setLoading(false);
      });

      if (searchResultRef.current) {
        searchResultRef.current.scrollTop = 0;
      }
  };

  const handleAdd = () => {
    setLoading(true);
    console.log('Current User:', currentUser);
    console.log('Current Item:', currentItem);
    axios.post('http://localhost:3001/add', { username: currentUser, item: currentItem })
      .then(response => {
        const { message, error } = response.data;
        if (message == 'success') {
          setMessage(`Item added to library`);
          setColor('green');
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

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const onItemClick = ({ id, name, artist, album, img, url, type }) => {
    setCurrentItem({ id, name, artist, album, img, url, type });
    setShowItem(true);
  };

  const handleCloseItem = () => {
    if (searchType != 'songs') {
      setShowItem(false);
      return;
    }
    if (!audioRef.current.paused) {
      setIsVisible(false);
    } else {
      setShowItem(false);
    }
  };

  const handleOpenItem = (item) => {
    setCurrentItem(item);
    setShowItem(true);
    setIsVisible(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const onBack = () => {
    if(page > 1) {
      page = page - 1;
      console.log('Page: ', page)
      handleSearch();
    } else {
      setMessage('Already on the first page.');
      setColor('#e1404e');
      setShowAlert(true);
    }
  };

  const onNext = () => {
    if (page < pageLimit){
      page = page + 1;
      console.log('Page: ', page)
      handleSearch();
    } else {
      setMessage('No more pages to load.');
      setColor('#e1404e');
      setShowAlert(true);
    }
  };

  return (
    <>
    <div className='container'>
    <div className="search-container">
    <input
      className="search-input"
      type="text"
      placeholder="Enter your search query"
      value={query}
      onChange={(e) => {setQuery(e.target.value);
        page = 1;
      }}
      onKeyDown={handleKeyPress} 
    />
    <div className="button-toggle-group">
      <button
        className={`toggle-button ${searchType === 'songs' ? 'active' : ''}`}
        onClick={() => {setSearchType('songs');
          page = 1;
        }}
      >Songs</button>
      <button
        className={`toggle-button ${searchType === 'albums' ? 'active' : ''}`}
        onClick={() => {setSearchType('albums');
          page = 1;
        }}
      >Albums</button>
      <button
        className={`toggle-button ${searchType === 'artists' ? 'active' : ''}`}
        onClick={() => {setSearchType('artists');
          page = 1;
        }}
      >Artists</button>
    </div>
  
    <button className="search-button" onClick={handleSearch}>Search</button>
  </div>  
  {loading && <div className="loading-animation"></div>}
  <div className='search-results-container'>
    {buttonVisible && (<button className="navbuttons" id='left' onClick={onBack}>
    <svg viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path>
    </svg>
    <span>Back</span>
    </button>)}
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
    {buttonVisible && (<button className="navbuttons" id='right' onClick={onNext}>
    <span>Next</span>
    <svg viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg">
      <path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"></path>
    </svg>
    </button>)}
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
            {currentUser && searchType === 'songs' && (<button className="close-btn" id='add' onClick={handleAdd}>Add to Library</button>)}
            <button className="close-btn" onClick={handleCloseItem}>Close</button>
            </div>
        </div>
        </div>
      )}
      {showAlert && (
        <div className="overlay">
          <div className="alert" id="alert">
            <div className="content">
              <div className="item-details-alert" id="alertDet" style={{ background: `${color}` }}>{message}</div>
            </div>
            <button className="close-btn" onClick={handleCloseAlert}>Close</button>
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

export default SearchPage;
