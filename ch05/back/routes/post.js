const express = require('express');

const { Post } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

// 게시글
router.post('/', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      UserId: req.user.id,
    });

    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 댓글
router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });

    if (!post) {
      return res.state(403).send('존재하지 않는 게시글입니다.');
    }

    const comment = await Post.create({
      content: req.body.content,
      PostId: req.params.postId,
      UserId: req.user.id,
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.delete('/', (req, res) => {
  res.json({ id: 1 });
});

module.exports = router;
