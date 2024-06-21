import React, { useState } from 'react';
import axios from 'axios';
import '../style/CreateAccount.css'

const CreateAccount = () => {
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [showAlert, setShowAlert] = useState(false);
  let [message, setMessage] = useState('');
  let [color, setColor] = useState('green');
  let [status, setStatus] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    if (status)
      window.location.href = '/login';
  };

  const handleSubmit = () => {
      setLoading(true);

      if (!username.trim() && !password.trim()) {
        setLoading(false);
        setColor('red');
        setMessage('Username and password are required.');
        setShowAlert(true);
        return;
      }

      if (!username.trim()) {
        setLoading(false);
        setColor('red');
        setMessage('Username is required.');
        setShowAlert(true);
        return;
      }

      if (!password.trim()) {
        setLoading(false);
        setColor('red');
        setMessage('Password is required.');
        setShowAlert(true);
        return;
      }

      axios.post('http://localhost:3001/create', { username, password })
      .then(response => {
        const { message, user, error } = response.data;
        console.log('Data sent successfully');
        if (message == 'success') {
            console.log('Account created: ', user);
            setColor('green');
            setMessage('Account created: ', user.username);
            setStatus(true);
        } else {
            console.log('Account creation failed: ', message);
            setColor('red');
            setMessage(message);
        }
        setLoading(false);
        setShowAlert(true)
      })
      .catch(error => {
        console.error('Error sending data:', error);
        setMessage('Error creating account.');
        setLoading(false);
        setShowAlert(true);
      });
  };

  return (
    <>
    {!showAlert && 
    (<div className='container-bg'>
    <div className='container-acc'>
      <h2>Create Account</h2>
      <form>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
      </form>
      <button className='submit' onClick={handleSubmit}>Create Account</button>
    </div>
    </div>
  )}
    {loading && <div className="loading-animation"></div>}
    {showAlert && (
        <div className="overlay">
          <div className="alert" id="alert">
            <div className="content">
              <div className="item-details-alert" id="alertDet" style={{background: `${color}`}}>
                {message}
              </div>
            </div>
            <button className="close-btn" onClick={handleCloseAlert}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAccount;
