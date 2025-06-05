const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// Тестовый роут для проверки
app.get('/', (req, res) => {
  res.send('3G API is alive, бро!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
//убрать потом
const friends = [
  { id: 1, name: 'Чувак', insta: 'https://instagram.com/chuvak' },
  { id: 2, name: 'Бро', insta: 'https://instagram.com/bro' },
  { id: 3, name: 'Дружище', insta: 'https://instagram.com/druzhishche' }
];

// Роут для получения списка друзей
app.get('/friends', (req, res) => {
  res.json([
    { name: 'Бро 1', insta: 'https://instagram.com/1' },
    { name: 'Бро 2', insta: 'https://instagram.com/2' }
  ]);
});
const cors = require('cors');
app.use(cors());
