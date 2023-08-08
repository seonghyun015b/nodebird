const http = require('http');

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  res.write('<h1>Hello Node</h1>');
  res.write('<h2>Hello Node</h2>');
  res.write('<h3>Hello Node</h3>');
  res.end('<h4>Hello Node END</h4>');
});

server.listen(3065, () => {
  console.log('서버 실행 중');
});
