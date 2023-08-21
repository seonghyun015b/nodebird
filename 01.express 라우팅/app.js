const express = require('express');

const app = express();
const port = 3065;

app.get('/', (req, res) => {
  res.send('<h1>Hello express</h1>');
});

app.get('/api', (req, res) => {
  res.send('<h1>Hello api</h1>');
});

app.post('/api/post', (req, res) => {
  res.json([
    { id: 1, content: 'post1' },
    { id: 2, content: 'post2' },
    { id: 3, content: 'post3' },
  ]);
});

app.delete('/api/delete', (req, res) => {
  res.json([
    { id: 1, content: 'delete1' },
    { id: 2, content: 'delete2' },
    { id: 3, content: 'delete3' },
  ]);
});

app.listen(port, () => {
  console.log('3065 포트에서 대기중');
});
