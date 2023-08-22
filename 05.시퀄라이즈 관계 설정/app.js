const express = require('express');
const postRouter = require('./routes/post');

const app = express();
const port = 3065;

// 시퀄라이즈 - db 연결
const db = require('./models');
db.sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

app.get('/', (req, res) => {
  res.send('<h1>Hello express</h1>');
});

app.use('/post', postRouter);

app.listen(port, () => {
  console.log('3065 포트에서 대기중');
});
