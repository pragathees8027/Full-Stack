import { useState } from 'react'
import Title from './components/Title.jsx'
import Item from './components/Item.jsx'
import './App.css'

function App() {
  let [list, setList] = useState([]);
  let [item, setItem] = useState("");

  const handleInputChange = (event) => {
    setItem(event.target.value);
};

  let handleClick = (event) => {
    setItem(event.target.value);
    let newList = [...list, item];
    setList(newList);
};

  return (
    <>
    <div className='header'>
    <Title />
    </div>
    <div className='itemHolder'>
    {list.map((item, index=0) => (
                    <Item key={index} listItem={item}/>
                ))}
    </div>
    <div className='footer'>
      <input type="text" value={item} onChange={handleInputChange}/>
      <button onClick={handleClick}>Add</button>
    </div>
    </>
  )
}

export default App
