// NewPostForm.js
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import './NewPostForm.css';

// קומפוננטה ליצירת פוסט חדש
const NewPostForm = ({ onNewPost }) => {
  // משתנים בסטייט לניהול נתוני הקלט והשגיאות
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  // פונקציה ליצירת הפוסט והעברתו לפונקציה החיצונית
  const handleCreatePost = () => {
    // בדיקה אם הכותרת ריקה
    if (!newPostTitle.trim()) {
      // נקבע שגיאה בכותרת
      setTitleError(true);
      return;
    }

    // בדיקה אם הגוף ריק
    if (!newPostBody.trim()) {
      // נקבע שגיאה בגוף
      setBodyError(true);
      return;
    }

    // בניית אובייקט של הפוסט החדש
    const newPost = {
      id: Date.now(),
      title: newPostTitle,
      body: newPostBody,
    };

    // העברת הפוסט לפונקציה החיצונית
    onNewPost(newPost);

    // איפוס הקלטים והשגיאות לאחר יצירת הפוסט
    setNewPostTitle('');
    setNewPostBody('');
    setTitleError(false);
    setBodyError(false);
  };

  // הצגת הקומפוננטה
  return (
    <div>
      {/* קלט לכותרת הפוסט */}
      <TextField
        label="Title"
        value={newPostTitle}
        style={{ marginRight: '10px' }}
        onChange={(e) => {
          setNewPostTitle(e.target.value);
          // איפוס השגיאה במידה והתחילו להקליד שוב
          setTitleError(false);
        }}
        // הצגת שגיאה אם הכותרת לא תקינה
        error={titleError}
        helperText={titleError && 'Title is required'}
      />
      {/* קלט לגוף הפוסט */}
      <TextField
        label="Body"
        value={newPostBody}
        style={{ marginRight: '10px' }}
        onChange={(e) => {
          setNewPostBody(e.target.value);
          // איפוס השגיאה במידה והתחילו להקליד שוב
          setBodyError(false);
        }}
        // הצגת שגיאה אם הגוף לא תקין
        error={bodyError}
        helperText={bodyError && 'Body is required'}
      />
      {/* כפתור ליצירת הפוסט */}
      <Button id="btnpost" onClick={handleCreatePost}>Create</Button>
    </div>
  );
};

// ייצוא הקומפוננטה
export default NewPostForm;