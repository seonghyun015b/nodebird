const express = require('express');

const { Post, User, Image, Comment } = require('../models');
const { isNotLoggedIn, isLoggedIn } = require('./middlewares');

const router = express.Router();

// POST / post 게시글 작성

router.post('/', isLoggedIn, async (req, res) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });
    const fullPost = await Post.findOne({
      where: { id: post.id },
      include: [
        {
          model: Image,
        },
        { model: Comment },
        { model: User },
      ],
    });
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// POST / comment 댓글 작성

router.post('/:postId/comment', isLoggedIn, async (req, res) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }

    const commnet = await Comment.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// POST / delete

router.delete('/', (req, res) => {
  res.json([
    { id: 1, content: 'delete1' },
    { id: 2, content: 'delete2' },
    { id: 3, content: 'delete3' },
  ]);
});

module.exports = router;
