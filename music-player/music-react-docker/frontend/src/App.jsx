import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoggedUser } from './components/UserContext.jsx';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import './App.css';
import Navbar from './components/NavBar.jsx';
import SearchPage from './components/SearchPage.jsx';
import CreateAccount from './components/CreateAccount.jsx';
import Login from './components/Login.jsx';
import Library from './components/Library.jsx';

const App = () => {
  return (
    <>
    <LoggedUser>
      <div className='main'>
        <div className='overlay'>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<WelcomeScreen />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/create" element={<CreateAccount />} />
              <Route path="/login" element={<Login />} />
              <Route path="/library" element={<Library />} />
            </Routes>
          </Router>
        </div>
      </div>
      </LoggedUser>
    </>
  );
};

export default App;
