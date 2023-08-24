const express = require('express');
const app = express();
const port = 3065;

const cors = require('cors');

const postRouter = require('./routes/post');
const userRouter = require('./routes/user');

// passport 로그인 설정
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

app.use('/post', postRouter);

app.use('/user', userRouter);

app.listen(port, () => {
  console.log('3065 포트에서 대기중');
});
