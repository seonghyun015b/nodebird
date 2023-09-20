const express = require('express');
const { Op } = require('sequelize');
const { Post, User, Image, Comment } = require('../models');

const router = express.Router();

// GET / posts 게시글 불러오기

router.get('/', async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastId)) {
      // 초기 로딩이 아닐때
      where.id = { [Op.lt]: parseInt(req.query.lastId, 10) };
    }
    const posts = await Post.findAll({
      limit: 10,
      order: [
        ['createdAt', 'DESC'],
        [Comment, 'createdAt', 'DESC'],
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'nickname'],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['id', 'nickname'],
            },
          ],
        },
        {
          model: User, // 좋아요 누른 사람
          as: 'Likers',
          attributes: ['id'],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
