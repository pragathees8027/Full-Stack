import React from 'react';

const DeleteUser = ({ user, deleteUser }) => {
  return (
    <div>
      <div>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Gender: {user.gender}</p>
    </div>
      <button onClick={() => deleteUser(user.id)}>Delete</button>
    </div>
  );
};

export default DeleteUser;