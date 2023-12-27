// api.js

// פונקציה לקבלת פוסטים של משתמש ספציפי לפי ה- userId
export const fetchUserPosts = async (userId) => {
    try {
      // ביצוע בקשת GET ל- API עם ה- userId
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
      
      // בדיקה אם הבקשה הצליחה
      if (!response.ok) {
        throw new Error('Failed to fetch user posts');
      }
  
      // קריאת המידע מהתגובה
      const data = await response.json();
  
      // החזרת המידע
      return data;
    } catch (error) {
      // טיפול בשגיאה והחזרתה
      throw new Error(error.message);
    }
  };
  
  // פונקציה לקבלת רשימת משתמשים
  export const fetchUser = async () => {
    try {
      // ביצוע בקשת GET ל- API לקבלת רשימת המשתמשים
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
  
      // בדיקה אם הבקשה הצליחה
      if (!response.ok) {
        throw new Error('Failed to fetch user posts');
      }
  
      // קריאת המידע מהתגובה
      const data = await response.json();
  
      // החזרת המידע
      return data;
    } catch (error) {
      // טיפול בשגיאה והחזרתה
      throw new Error(error.message);
    }
  };
  
  // פונקציה ליצירת פוסט חדש
  export const createNewPost = async (newPost) => {
    try {
      // ביצוע בקשת POST ל- API עם הנתונים של הפוסט החדש
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });
  
      // בדיקה אם הבקשה הצליחה
      if (!response.ok) {
        throw new Error('Failed to create a new post');
      }
  
      // קריאת המידע מהתגובה
      const data = await response.json();
  
      // החזרת המידע
      return data;
    } catch (error) {
      // טיפול בשגיאה והחזרתה
      throw new Error(error.message);
    }
  };