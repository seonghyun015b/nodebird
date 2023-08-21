const express = require('express');
const postRouter = require('./routes/post');

const app = express();
const port = 3065;

app.get('/', (req, res) => {
  res.send('<h1>Hello express</h1>');
});

app.get('/api', (req, res) => {
  res.send('<h1>Hello api</h1>');
});

app.use('/post', postRouter);

app.listen(port, () => {
  console.log('3065 포트에서 대기중');
});
