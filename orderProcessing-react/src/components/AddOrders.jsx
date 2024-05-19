import React, { useState } from 'react';
import "./styles/AddOrders.css"
import buy from "../img/buy.svg"
import mac from "../img/Mac.png"
import win11 from "../img/win11.png"
import pro10 from "../img/pro10.png"
import k7 from "../img/k7.png"
import ally from "../img/Ally.png"
import aria from "../img/ariaSE.png"

function AddOrders({userName, onSave}) {
    let [totProducts, setTotProducts] = useState(0);
    let [value1, setValue1] = useState(0);
    let [value2, setValue2] = useState(0);
    let [value3, setValue3] = useState(0);
    let [value4, setValue4] = useState(0);
    let [value5, setValue5] = useState(0);
    let [value6, setValue6] = useState(0);

    const handleInputChange = (index, newValue) => {
        let values = [value1, value2, value3, value4, value5, value6];
        let updatedValues = [...values];
        updatedValues[index] = newValue;
        let total = updatedValues.reduce((acc, curr) => acc + parseInt(curr), 0);
        setTotProducts(total);
        switch (index) {
            case 0:
                setValue1(newValue);
                break;
            case 1:
                setValue2(newValue);
                break;
            case 2:
                setValue3(newValue);
                break;
            case 3:
                setValue4(newValue);
                break;
            case 4:
                setValue5(newValue);
                break;
            case 5:
                setValue6(newValue);
                break;
            default:
                break;
        }
    };


    let handleSave = () => {
        onSave([value1, value2, value3, value4, value5, value6]);
    };
    

    return (
    <>
    <div>
        <div className='products'>
        <h1>Add products to <span>{userName}</span>'s cart</h1>
        <div className='card'>
        <p>
            <img src={win11}/> 
            <span>Windows 11 Pro</span> 
            <input type='number' min='0' defaultValue='0' value={value1} onChange={(e) => handleInputChange(0, e.target.value)} />
        </p>
        <p>
            <img src={mac}/>
            <span>Macbook Air</span>
            <input type='number' min='0' defaultValue='0' value={value2} onChange={(e) => handleInputChange(1, e.target.value)} />
        </p>
        <p>
            <img src={k7}/>
            <span>K7 Total Security</span>
            <input type='number' min='0' defaultValue='0' value={value3} onChange={(e) => handleInputChange(2, e.target.value)} />
        </p>
        <p>
            <img src={pro10}/>
            <span>1+ 10 Pro</span>
            <input type='number' min='0' defaultValue='0' value={value4} onChange={(e) => handleInputChange(3, e.target.value)} />
        </p>
        <p>
            <img src={ally}/>
            <span>ROG Ally</span>
            <input type='number' min='0' defaultValue='0' value={value5} onChange={(e) => handleInputChange(4, e.target.value)} />
        </p>
        <p>
            <img src={aria}/>
            <span>Moondrop Aria SE</span>
            <input type='number' min='0' defaultValue='0' value={value6} onChange={(e) => handleInputChange(5, e.target.value)} />
        </p>
    </div>
    <div data-tooltip={`Order ${totProducts} products`} class="button">
        <div class="button-wrapper">
            <div class="text">Place order</div>
                <span class="icon" onClick={handleSave}>
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