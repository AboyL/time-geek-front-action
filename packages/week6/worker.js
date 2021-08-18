// child.js
var http = require('http');
var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  console.log('handled by child, pid is ' + process.pid + '\n');
  res.end('handled by child, pid is ' + process.pid + '\n');
});

process.on('message', function (m, tcp) {
  if (m === 'server') {
    tcp.on('connection', function (socket) {
      console.log('connection');
      server.emit('connection', socket);
    });
  }
});