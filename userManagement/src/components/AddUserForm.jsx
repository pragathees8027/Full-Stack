import React, { useState } from 'react';
import '../assets/AddUserForm.css'

const AddUserForm = ({ addUser }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !age || !gender) return;
    addUser({ name, age, gender });
    setName('');
    setAge('');
    setGender('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input required
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input required
        type="number"
        placeholder="Enter age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <select value={gender} onChange={(e) => setGender(e.target.value)} required>
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddUserForm;