import React from 'react';
import "./styles/AddOrders.css"
import buy from "../img/buy.svg"

function AddOrders({userName}) {
    return (
    <>
    <div>
        <div className='products'>
        <h1>Add products to <span>{userName}</span>'s cart</h1>
        <div className='card'>
        <p><span>Windows 11</span></p>
        <p><span>Macbook Air</span></p>
        <p><span>RHEL</span></p>
        <p><span>Windows 11</span></p>
        <p><span>Macbook Air</span></p>
        <p><span>RHEL</span></p>
        {/* <img />
        <h1></h1>
        <input></input> */}
    </div>
    <div data-tooltip="Price:-$20" class="button">
        <div class="button-wrapper">
            <div class="text">Place order</div>
                <span class="icon">
                    <img src={buy}/>
                </span>
            </div>
        </div>
    </div>
    </div>
    </>
    );
    }

    export default AddOrders;