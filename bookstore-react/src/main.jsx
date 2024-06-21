import React from 'react'
import ReactDOM from 'react-dom/client'
// import BookStore from './Bookstore.jsx'
import BookStore from './components/BookStore.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BookStore />
  </React.StrictMode>,
)
