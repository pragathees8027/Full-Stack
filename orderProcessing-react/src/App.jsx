import React, { useState } from 'react';
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import AddOrders from "./components/AddOrders";

export default function App() {
  let mainComponent = null;
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [showOrders, setShowOrders] = useState(false);

  const handleLogin = (userName) => {
    setLoggedInUserName(userName);
    setShowLogin(false);
    setShowOrders(true);
  };

  const handleWelcomeClick = () => {
    setShowLogin(false);
    setShowWelcome(false);
  };

  if (!showOrders) {
    if(!showLogin) {
      mainComponent = <Login onLogin={handleLogin} />;
    } else {
      mainComponent = <Welcome onClick={handleWelcomeClick} />;
    }
  } else {
    mainComponent = <AddOrders userName={loggedInUserName} />;
  }

  return (
    <>
      {mainComponent}
    </>
  );
}
