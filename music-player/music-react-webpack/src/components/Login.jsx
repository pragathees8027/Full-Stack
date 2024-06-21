import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../style/CreateAccount.css'; 
import { useUser } from './UserContext.jsx';

const Login = () => {
  let navigate = useNavigate();
  let { login, logout, currentUser } = useUser();
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');
  let [loading, setLoading] = useState(false);
  let [showAlert, setShowAlert] = useState(false);
  let [message, setMessage] = useState('');
  let [color, setColor] = useState('green');

  useEffect(() => {
    if (currentUser) {
      setMessage(`Welcome back, ${currentUser}!`);
      setColor('green');
      setShowAlert(true);
    }
  }, currentUser);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
    if (currentUser) {
        navigate('/library');
    }
  };

  const logoutUser = () => {
    logout();
    setMessage('Logged out successfully.');
    setColor('green');
    setShowAlert(true);
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

    axios.post('http://localhost:3001/login', { username, password })
      .then((response) => {
        let { message, user, error } = response.data;
        console.log(error);
        console.log('Login response:', response.data);
        if (message == 'success') {
          setColor('green');
          setMessage(`Welcome back, ${user.username}!`);
          login(user.username);
        } else {
          setColor('red');
          setMessage(`${error}!`);
        }
        setLoading(false);
        setShowAlert(true);
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        setMessage('Error logging in.');
        setLoading(false);
        setShowAlert(true);
      });
  };

  return (
    <>
    {!currentUser && !showAlert && 
      (<div className='container-bg'>
        <div className='container-acc'>
          <h2>Login</h2>
          <form>
            <div>
              <label htmlFor='username'>Username:</label>
              <input type='text' id='username' value={username} onChange={handleUsernameChange} required />
            </div>
            <div>
              <label htmlFor='password'>Password:</label>
              <input type='password' id='password' value={password} onChange={handlePasswordChange} required />
            </div>
          </form>
          <div className='buttonHolder'>
          <button className='submit' onClick={handleSubmit}>Login</button>
          <button className="submit"><Link to="/create" style={{ background: 'transparent', textDecoration: 'none', color: 'inherit'}}>Create Account</Link></button>
          </div>
        </div>
      </div>
      )}
      {loading && <div className='loading-animation'></div>}
      {showAlert && (
        <div className='overlay'>
          <div className='alert' id='alert'>
            <div className='content'>
              <div className='item-details-alert' id='alertDet' style={{ background: `${color}` }}>
                {message}
              </div>
            </div>
            <button className="close-btn" onClick={handleCloseAlert}>Close</button>
            {currentUser && (<button className='close-btn' onClick={logoutUser}>Logout</button>)}
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
