// UserPosts.js
import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, Button, CircularProgress } from '@mui/material';
import NewPostForm from '../NewPostForm/NewPostForm';
import { fetchUserPosts, createNewPost } from '../Api/Users'; // יבוא הפונקציות מהקובץ api.js
import './UserPosts.css';


const UserPosts = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // יצירת פונקציה פנימית לביצוע הבאה לנתונים מהשרת
    const fetchData = async () => {
      try {
        // קריאה לפונקציה מהקובץ api.js שמבצעת את הבאה לפוסטים לפי userId
        const data = await fetchUserPosts(userId);
        // עדכון של הפוסטים בסטייט וסיום הטעינה
        setPosts(data);
        setLoading(false);
      } catch (error) {
        // טיפול בשגיאה וסיום הטעינה
        setError(error.message);
        setLoading(false);
      }
    };

    // קריאה לפונקציה כאשר ה-ID שונה
    fetchData();
  }, [userId]);

  // פונקציה לטיפול ביצירת פוסט חדש
  const handleNewPost = async (newPost) => {
    try {
      // קריאה לפונקציה מהקובץ api.js שמבצעת את הוספה של פוסט חדש
      const createdPost = await createNewPost(newPost);
      // עדכון של הפוסטים בסטייט וסיום הטעינה
      setPosts([...posts, createdPost]);
      setOpen(false);
    } catch (error) {
      // טיפול בשגיאה במידה ולא ניתן ליצור את הפוסט
      console.error(error.message);
    }
  };

  // הצגת הקומפוננטה
  return (
    
    <div className="userPosts">
      {/* סגנון לרשימת הפוסטים */}
      <div className="userPostsTitle">User Posts:</div> {/* סגנון לכותרת הרשימה */}
      {loading && <CircularProgress id="loading" />}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {/* רשימת הפוסטים */}
      <List id="list">
        {posts.map((post) => (
          <ListItem key={post.id} className="postItem">
            <ListItemText
              primary={post.title}
              secondary={post.body}
              className="postText"
            />
          </ListItem>
        ))}
      </List>
      {/* כפתור ליצירת פוסט חדש */}
      <Button onClick={() => setOpen(true)} id="post">
        Create Post
      </Button>
      {/* דיאלוג ליצירת פוסט חדש */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          {/* השימוש בקומפוננטה שמקבלת פונקציה לטיפול ביצירת הפוסט */}
          <NewPostForm onNewPost={handleNewPost} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserPosts;
