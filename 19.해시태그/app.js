const express = require('express');
const path = require('path');

const cors = require('cors');

// session, cookieParser, dotenv
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// morgan
const morgan = require('morgan');

// passport 로그인 설정
const passport = require('passport');
const passportConfig = require('./passport');
passportConfig();

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const userRouter = require('./routes/user');

dotenv.config();

const app = express();

app.use(morgan('dev'));

// 시퀄라이즈 - db 연결
const db = require('./models/index.js');
db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

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

// session,cookieParser
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('3065 포트에서 대기중');
});
