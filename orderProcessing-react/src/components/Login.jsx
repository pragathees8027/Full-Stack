import React, { useState } from 'react';
import "./styles/Login.css"
import arrow from "../img/arrow.svg"

export default function Login({ onLogin }) {
    const [userName, setUserName] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const handleInputChange = (event) => {
        setUserName(event.target.value);
    };

    const handleSubmit = () => {
        if (userName.trim() === "") {
            setShowAlert(true);
            return;
        }
        onLogin(userName);
    };

    return (
    <>
    <div>
        <div className="login">
            <div className="msg">
                <span id="hello">Hello there, </span>
                <input type="text" placeholder="Name" id="userName" name="userName" required value={userName} onChange={handleInputChange}></input>
            </div>
            <button type="submit" className="enter" onClick={handleSubmit} id='submit' autoComplete="off">
                <span id="greet">Welcome</span>
                <div class="icon"><img src={arrow}/></div>
            </button>
        </div>
    </div>
    {showAlert && (
            <div className="alert">
                Please enter your username
                <button className="close-btn" onClick={() => setShowAlert(false)}>Close</button>
            </div>
    )}
    </>
    );
    }