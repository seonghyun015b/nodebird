const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Post, User, Image, Comment } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.accessSync('uploads');
} catch (error) {
  console.log('uploads 폴더가 없으므로 생성합니다.');
  fs.mkdirSync('uploads');
}

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
        {
          model: Comment,
          include: [
            {
              model: User, // 댓글 작성자
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          model: User, // 게시글 작성자
          attributes: ['id', 'nickname'],
        },
        {
          model: User, // 좋아요 누른사람
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    res.status(201).json(fullPost);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// POST / comment 댓글 작성

router.post('/:postId/comment', isLoggedIn, async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
    });

    if (!post) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }

    const commnet = await Comment.create({
      content: req.body.content,
      PostId: parseInt(req.params.postId, 10),
      UserId: req.user.id,
    });

    const fullComment = await Comment.findOne({
      where: { id: commnet.id },
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
      ],
    });

    res.status(201).json(fullComment);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// POST / patch / 좋아요

router.patch('/:postId/like', async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.addLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST / delete / 싫어요

router.delete('/:postId/like', async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } });
    if (!post) {
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);
    res.json({ PostId: post.id, UserId: req.user.id });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// POST / post / images 이미지 업로드

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext);
      done(null, basename + new Date().getTime() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

router.post(
  '/images',
  isLoggedIn,
  upload.array('image'),
  async (req, res, next) => {
    console.log(req.filename);
    res.json(req.files.map((v) => v.filename));
  }
);

// POST / delete

router.delete('/', (req, res) => {
  res.json([
    { id: 1, content: 'delete1' },
    { id: 2, content: 'delete2' },
    { id: 3, content: 'delete3' },
  ]);
});

module.exports = router;
