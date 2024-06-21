import React from 'react';
import '../Bookstore.css';

export default function Book({ book, onAddToCart }) {
  return (
    <div className="book">
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Category: {book.category}</p>
      <p>Price: Rs. {book.price}</p>
      <button className='add' onClick={() => onAddToCart(book)}>Add</button>
    </div>
  );
}

