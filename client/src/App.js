import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [msg, setMsg] = useState('');
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/hello')
      .then(res => res.json())
      .then(data => setMsg(data.message));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch('/api/users')
      .then(res => {
        if (!res.ok) throw new Error('Ошибка сети');
        return res.json();
      })
      .then(data => {
        setUsers(data);
        setError(null);
      })
      .catch(err => setError('Ошибка при загрузке пользователей: ' + err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: input })
    })
      .then(res => res.json())
      .then(data => console.log(data));
  };

  return (
    <div className="App">
      <h1>Фронт+Бэк</h1>
      <p>{msg}</p>
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={e => setInput(e.target.value)} />
        <button type="submit">Отправить</button>
      </form>
      <h2>Пользователи</h2>
      {loading && <p>Загрузка...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name}, {user.age} лет</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
