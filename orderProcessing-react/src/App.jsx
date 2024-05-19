import React, { useState } from 'react';
import Welcome from "./components/Welcome";
import Login from "./components/Login";
import AddOrders from "./components/AddOrders";
import Cart from "./components/Cart";

export default function App() {
  let mainComponent = null;
  const [loggedInUserName, setLoggedInUserName] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [showOrders, setShowOrders] = useState(false);
  const [Ordered, setOrdered] = useState(false);
  const [savedValues, setSavedValues] = useState([]);

  const handleSave = (values) => {
    setSavedValues(values);
    setOrdered(true);
  };

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
    if (!Ordered) {
      mainComponent = <AddOrders userName={loggedInUserName} onSave={handleSave} />;
    } else {
      mainComponent = <Cart qty={savedValues}  userName={loggedInUserName}/>;
    }
  }

  return (
    <>
      {mainComponent}
    </>
  );
}
