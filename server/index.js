//imports
const express = require('express')
const mongoose = require('mongoose');
const postsRouter = require('./routes/posts');
//consts
const app = express()
const PORT = 3001
const mongoURI = 'mongodb://localhost:27017/users';

app.use(express.json())

// Модель пользователя
const User = mongoose.model('User', new mongoose.Schema({ name: String, age: Number }));

// Seed DB только если коллекция пуста
async function seedDB() {
  const count = await User.countDocuments();
  if (count === 0) {
    await User.insertMany([
      { name: 'Иван', age: 25 },
      { name: 'Мария', age: 30 },
      { name: 'Алексей', age: 22 }
    ]);
    console.log('База данных заполнена');
  } else {
    console.log('База уже содержит пользователей');
  }
}

// Эндпоинты

app.use(express.json());
app.use('/posts', postsRouter);

// Подключение к MongoDB и запуск сервера
mongoose.connect(mongoURI)
  .then(async () => {
    console.log('MongoDB connected');
    await seedDB();
    app.listen(PORT, () => {
      console.log(`Сервер слушает на http://localhost:${PORT}`)
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
