import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ body: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Загрузка постов
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/posts');
      if (!res.ok) throw new Error('Ошибка сети');
      const data = await res.json();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Ошибка при загрузке постов: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Создание поста
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: '1', // Временное решение
          userName: 'Аноним',
          body: newPost.body
        })
      });
      if (!res.ok) throw new Error('Ошибка при создании поста');
      const savedPost = await res.json();
      setPosts([savedPost, ...posts]);
      setNewPost({ body: '' });
    } catch (err) {
      setError('Ошибка при создании поста: ' + err.message);
    }
  };

  return (
    <div className="App">
      <h1>Психоделический музей мыслей</h1>
      
      {/* Форма создания поста */}
      <form onSubmit={handleSubmit} className="post-form">
        <textarea
          value={newPost.body}
          onChange={e => setNewPost({ ...newPost, body: e.target.value })}
          placeholder="Что у тебя на уме?"
          maxLength={1000}
        />
        <button type="submit">Опубликовать</button>
      </form>

      {/* Список постов */}
      {loading && <p>Загрузка...</p>}
      {error && <p className="error">{error}</p>}
      
      <div className="posts">
        {posts.map(post => (
          <div key={post._id} className="post">
            <div className="post-header">
              <img src={post.userImage} alt={post.userName} className="avatar" />
              <span className="username">{post.userName}</span>
            </div>
            <p className="post-body">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
