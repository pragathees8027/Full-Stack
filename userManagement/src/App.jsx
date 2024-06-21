import React, { useState } from 'react';
import './App.css';
import AddUserForm from './components/AddUserForm';
import SearchUserForm from './components/SearchUserForm';
import UserList from './components/UserList';

export default function App() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [showSearchUserForm, setShowSearchUserForm] = useState(false);

  const addUser = (user) => {
    setUsers([...users, { id: Date.now(), ...user }]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const searchUser = (term) => {
    setSearchTerm(term);
  };

  const viewUserDetails = (user) => {
    setSelectedUser(user);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>User Management App</h1>
      <button onClick={() => setShowAddUserForm(!showAddUserForm)}>
        {showAddUserForm ? 'Add User' : 'Add User'}
      </button>
      {showAddUserForm && <AddUserForm addUser={addUser} />}
      
      <button onClick={() => setShowSearchUserForm(!showSearchUserForm)}>
        {showSearchUserForm ? 'Search User' : 'Search User'}
      </button>
      {showSearchUserForm && <SearchUserForm searchUser={searchUser} />}
      
      {showSearchUserForm && <UserList users={filteredUsers} deleteUser={deleteUser} viewUserDetails={viewUserDetails} />}
    </div>
  );
}