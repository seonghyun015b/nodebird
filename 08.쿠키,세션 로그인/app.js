const express = require('express');
const app = express();
const port = 3065;
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const cors = require('cors');

// session, cookieParser, dotenv
const session = require('express-session');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

// passport 로그인 설정
const passport = require('passport');
const passportConfig = require('./passport');
passportConfig();

// 시퀄라이즈 - db 연결
const db = require('./models');
db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

app.use(
  cors({
    origin: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// session,cookieParser, dotenv
dotenv.config();
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
app.use('/user', userRouter);

app.listen(port, () => {
  console.log('3065 포트에서 대기중');
});
