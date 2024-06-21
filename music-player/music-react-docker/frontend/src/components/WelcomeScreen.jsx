import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import '../style/WelcomeScreen.css'

const WelcomeScreen = () => {
  let { currentUser } = useUser();
  let navigate = useNavigate();

  const handleStartListening = () => {
    if (currentUser) {
      navigate('/library');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="welcome-screen">
      <h1>Welcome to Music Player</h1>
      <p>Enjoy your favorite tunes wherever you are!</p>
      <button className="btn-start" onClick={handleStartListening}>
        Start Listening
      </button>
    </div>
  );
};

export default WelcomeScreen;
