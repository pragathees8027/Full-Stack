import React from 'react';
import DeleteUser from './DeleteUser';
import '../assets/UserList.css'

const UserList = ({ users, deleteUser }) => {
  return (
    <>
    <h2>User List</h2>
    <div className='list'>
      {users.map(user => (
        <DeleteUser key={user.id} user={user} deleteUser={deleteUser} />
      ))}
    </div>
    </>
  );
};

export default UserList;