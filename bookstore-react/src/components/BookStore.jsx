import React, { useState } from 'react';
import Book from './Book';
import '../Bookstore.css';

const booksData = [
  { id: 1, title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Fiction', price: 590 },
  { id: 2, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', category: 'Fiction', price: 1200 },
  { id: 3, title: '1984', author: 'George Orwell', category: 'Dystopian', price: 899 },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', category: 'Romance', price: 949 },
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', category: 'Coming-of-age', price: 1199 },
];

export default function BookStore() {
  const [cart, setCart] = useState([]);
  const [totalBooksBought, setTotalBooksBought] = useState(0);

  const addToCart = (selectedBook) => {
    const existingItemIndex = cart.findIndex(item => item.id === selectedBook.id);

    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...selectedBook, quantity: 1 }]);
    }

    setTotalBooksBought(totalBooksBought + 1);
  };

  const removeFromCart = (bookId) => {
    const updatedCart = cart.map(item => {
      if (item.id === bookId) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    }).filter(item => item.quantity > 0);

    setCart(updatedCart);
    setTotalBooksBought(totalBooksBought - 1);
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleBuy = () => {
    if (totalBooksBought === 0) {
      alert('Cart is empty.\nAdd some books to cart.');
    } else {
      alert(`You've bought ${totalBooksBought} books for Rs. ${getTotalAmount()}`);
    }
    window.location.reload();
  };

  return (
    <div className="bookstore">
      <h1>React Bookstore!</h1>
      <div className="book-list">
        {booksData.map(book => (
          <Book key={book.id} book={book} onAddToCart={addToCart} />
        ))}
      </div>
      <div className="cart">
        <h2>Cart</h2>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.title} - Rs. {item.price} x {item.quantity}
              <button className='del'  onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <p className='total'>Total Amount: Rs. {getTotalAmount()}</p>
        <button onClick={handleBuy}>Buy</button>
      </div>
    </div>
  );
}
