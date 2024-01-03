// UsersTable.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchUser } from '../Api/Users';
import {
  TextField,Table,TableBody, TableCell,TableContainer, TableHead,TableRow,Paper, CircularProgress} from '@mui/material';
  
  
 
  
 
  
  
 

import './UsersTable.css';

const UsersTable = ({ onSelectUser }) => {
  // יצירת משתנה סטייט לאחסון רשימת המשתמשים
  const [users, setUsers] = useState([]);
  // משתנים לסינון שמופיעים בתיבות החיפוש
  const [filterName, setFilterName] = useState('');
  const [filterEmail, setFilterEmail] = useState('');
  // משתנה להצגת אינדיקטור של טעינה
  const [loading, setLoading] = useState(true);
  // משתנה להצגת שגיאה
  const [error, setError] = useState(null);

  // useEffect מבצע פעולה כאשר הרכיב נטען
  useEffect(() => {
    // קריאת המשתמשים מה-API
    fetchUser ()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // סינון המשתמשים לפי שם ואימייל
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filterName.toLowerCase()) &&
      user.email.toLowerCase().includes(filterEmail.toLowerCase())
  );

  // הצגת הקומפוננטה
  return (
    <div>
      {/* תיבות טקסט לסינון שם ואימייל */}
      <TextField label="Filter by Name" style={{ margin: '0.5rem' }} onChange={(e) => setFilterName(e.target.value)} />
      <TextField label="Filter by Email" style={{ margin: '0.5rem' }} onChange={(e) => setFilterEmail(e.target.value)} />
      {/* אינדיקטור לטעינה */}
      {loading && <CircularProgress style={{ marginTop: '1rem' }} />}
      {/* הצגת שגיאה אם יש */}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {/* טבלה להצגת המשתמשים */}
      <TableContainer component={Paper} style={{ marginTop: '1rem' }} >
        <Table >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Company Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => (
              // שורה בטבלה עם אפשרות לבחירת משתמש
              <TableRow key={user.id} onClick={() => onSelectUser(user.id)} style={{ cursor: 'pointer' }}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.company.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

// ולידציה של טיפוס ה-props של הקומפוננטה
UsersTable.propTypes = {
  onSelectUser: PropTypes.func.isRequired,
};

// ייצוא הקומפוננטה
export default UsersTable;
