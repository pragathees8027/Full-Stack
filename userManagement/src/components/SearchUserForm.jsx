import React, { useState } from 'react';

const SearchUserForm = ({ searchUser }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    searchUser(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search users"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchUserForm;