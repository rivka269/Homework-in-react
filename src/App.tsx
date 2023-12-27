// App.js
import React, { useState } from 'react';
import UsersTable from './UsersTable/UsersTable';
import UserPosts from './Userpost/UserPosts';
import './App.css'; 

const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <div>
      <UsersTable onSelectUser={(userId) => setSelectedUserId(userId)} />
      {selectedUserId && <UserPosts userId={selectedUserId} />}
    </div>
  );
};

export default App;
