// // parent.js
// var cp = require('child_process');
// var child1 = cp.fork('./worker.js');
// var child2 = cp.fork('./worker.js');

// // Open up the server object and send the handle
// var server = require('net').createServer();
// server.listen(1337, function () {
//     console.log('-----');
//     child1.send('server', server);
//     child2.send('server', server);
//     // 关掉
//     server.close();
// });

var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    // Fork workers
    for (var i = 0; i < numCPUs/2; i++) {
        cluster.fork();
    }
    cluster.on('exit', function (worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
    // Workers can share any TCP connection
    // In this case its a HTTP server
    http.createServer(function (req, res) {
        res.writeHead(200);
        console.log('process.pid',process.pid);
        res.end("hello world\n");
    }).listen(8000);
}