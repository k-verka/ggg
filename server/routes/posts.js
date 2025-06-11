const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// GET все посты
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Ошибка при получении постов' });
  }
});

// POST создать пост
router.post('/', async (req, res) => {
  try {
    const { userId, userName, userImage, body } = req.body;

    const post = new Post({
      userId,
      userName,
      userImage,
      body
    });

    const savedPost = await post.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: 'Ошибка при создании поста' });
  }
});

module.exports = router;
