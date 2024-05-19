import React from 'react';
import "./styles/Welcome.css"
import arrow from "../img/arrowMulti.svg"

function Welcome({ onClick }) {
    return (
    <>
    <div onClick={onClick}>
        <div className="welcome">
        <h1>Order Processing</h1>
        <p>Add & view ordes</p>
            <button id="arrow"><img src={arrow} /></button>   
        </div>
    </div>
    </>
    );
    }

    export default Welcome;