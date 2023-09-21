const express = require('express');
const cors = require('cors');
const path = require('path');

// session, cookieParser,dotenv, morgan
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const morgan = require('morgan');

// passport
const passport = require('passport');
const passportConfig = require('./passport');

const db = require('./models/index.js');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');
const hashtagRouter = require('./routes/hashtag');

dotenv.config();

const app = express();

// 시퀄라이즈 - db
db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);
passportConfig();

// CORS

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// 이미지 로딩
app.use('/', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session, cookieParser
app.use(cookieParser(process.env.COOCKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/posts', postsRouter);
app.use('/post', postRouter);
app.use('/user', userRouter);
app.use('/user', hashtagRouter);

app.use(morgan('dev'));

app.listen(3065, () => {
  console.log('서버 실행중');
});
