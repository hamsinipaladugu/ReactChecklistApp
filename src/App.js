import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [checkList, setItems] = useState([]);
  const [itemInput, handleItemAddition] = useState('');
  const [itemEdit, setItemEdit] = useState(null);
  const [error, setItemError] = useState('');

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('checkList')) || [];
    setItems(savedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem('checkList', JSON.stringify(checkList));
  }, [checkList]);

  const addItemToChecklist = () => {
    if (itemInput.trim() === '' || itemInput === null) {
      setItemError('Item entered cannot be empty. Please enter something!');
      return;
    }
    setItems([
      ...checkList,
      { id: Date.now(), name: itemInput.trim(), isFinished: false },
    ]);
    handleItemAddition('');
    setItemError('');
  };

  const editItemInChecklist = () => {
    if (itemInput.trim() === '' || itemEdit === null) {
      setItemError('Item entered cannot be empty. Please enter something!');
      return;
    }
    setItems(
      checkList.map((item) =>
        item.id === itemEdit.id ? { ...item, name: itemInput.trim() } : item
      )
    );
    handleItemAddition('');
    setItemEdit(null);
    setItemError('');
  };

  const handleItemDeletion = (id) => {
    setItems(checkList.filter((item) => item.id !== id));
  };

  const toggleItemFinishing = (id) => {
    setItems(
      checkList.map((item) =>
        item.id === id ? { ...item, isFinished: !item.isFinished } : item
      )
    );
  };

  const handleItemEditing = (item) => {
    handleItemAddition(item.name);
    setItemEdit(item);
    setItemError('');
  };

  return (
    <div className="App">
      <h1>Checklist</h1>
      <input
        type="text"
        value={itemInput}
        onChange={(e) => handleItemAddition(e.target.value)}
        placeholder="Enter item here: "
      />
      <button onClick={itemEdit ? editItemInChecklist : addItemToChecklist}>
        {itemEdit ? 'Save Item' : 'Add Item'}
      </button>
      {error && <p style={{ color: '#B2022F' }}>{error}</p>}{' '}
      <ul>
        {checkList.map((item) => (
          <li key={item.id} className={item.isFinished ? 'isFinished' : ''}>
            <input
              type="checkbox"
              checked={item.isFinished}
              onChange={() => toggleItemFinishing(item.id)}
            />
            {item.name}
            <button
              className="complete"
              onClick={() => toggleItemFinishing(item.id)}
              disabled={item.isFinished}
            ></button>
            <button
              className="edit"
              onClick={() => handleItemEditing(item)}
              disabled={item.isFinished}
            ></button>
            <button
              className="delete"
              onClick={() => handleItemDeletion(item.id)}
              disabled={item.isFinished}
            ></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
