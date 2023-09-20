const express = require('express');
const bcrypt = require('bcrypt');
const { User, Post } = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const passport = require('passport');
const router = express.Router();

// GET /user 유저 정보 불러오기

router.get('/', async (req, res, next) => {
  try {
    if (req.user) {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
        ],
      });
      res.status(200).json(fullUserWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

//POST/user/login 로그인

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }

    if (info) {
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }

      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password'],
        },
        include: [
          {
            model: Post,
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followings',
            attributes: ['id'],
          },
          {
            model: User,
            as: 'Followers',
            attributes: ['id'],
          },
        ],
      });

      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

// POST/user/logout 로그아웃

router.post('/logout', isLoggedIn, (req, res) => {
  req.logout(() => {
    res.send('ok');
  });
});

// POST/user 회원가입

router.post('/', isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send('이미 사용 중인 아이디입니다.');
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// PATCH / user / 팔로우

router.patch('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다.');
    }
    await user.addFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// DELETE / user / 언팔로우

router.delete('/:userId/follow', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다.');
    }
    await user.removeFollowers(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// DELETE / user / 팔로워 제거

router.delete('/follower/:userId', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다.');
    }
    await user.removeFollowings(req.user.id);
    res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// GET / user / followers 목록

router.get('/followers', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다.');
    }
    const followers = await user.getFollowers();
    res.status(200).json(followers);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// GET / user / followings 목록

router.get('/followings', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (!user) {
      res.status(403).send('존재하지 않는 사용자입니다.');
    }
    const followings = await user.getFollowings();
    res.status(200).json(followings);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// PATCH / user / 닉네임 수정

router.patch('/nickname', isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      { where: { id: req.user.id } }
    );
    res.status(200).json({ nickname: req.body.nickname });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
