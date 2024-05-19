import React, { useState } from 'react';
import "./styles/Cart.css"

function Cart({qty, userName}) {
    const orders = [
        { name: 'Windows 11 Pro', quantity: qty[0], unitPrice: 7999 },
        { name: 'Macbook Air', quantity: qty[1], unitPrice: 65000 },
        { name: 'K7 Total Security', quantity: qty[2], unitPrice: 1999 },
        { name: '1+ 10 Pro', quantity: qty[3], unitPrice: 32499 },
        { name: 'ROG Alley', quantity: qty[4], unitPrice: 44999 },
        { name: 'Moondrop Aria SE', quantity: qty[5], unitPrice: 7599 },
      ];

      let totAmount = 0, totProducts = 0;
      orders.forEach(order => {
            totAmount += (order.quantity * order.unitPrice);
            totProducts += (order.quantity*1);
      });

    return (
    <>
    <div>
        <div className='cart'>
        <h1><span>{userName}</span>'s cart</h1>
            <div className='orderList'>
                    <div className="title sticky">
                        <p className="name"><b>Product</b></p>
                        <p className="unit-price"><b>Unit Price</b></p>
                        <p className="quantity"><b>Quantity</b></p>
                        <p className="total-amount"><b>Total</b></p>
                    </div>
                {orders.filter(order => order.quantity !== 0).map((order, index=1) => (
                    <div key={index} className="order">
                        <p className="name">{order.name}</p>
                        <p className="unit-price"><span className='money'>₹</span>{order.unitPrice}</p>
                        <p className="quantity">{order.quantity}</p>
                        <p className="total-amount"><span className='money'>₹</span>{order.quantity * order.unitPrice}</p>
                    </div>
                ))}
            </div>
            <h1 className='total'>Products: <span>{totProducts}</span></h1>
            <h1 className='total'> Cost: <span className='money'>₹</span><span>{totAmount}</span></h1>
        </div>
    </div>
    </>
    );
    }

    export default Cart;