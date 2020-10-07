const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
var express = require('express');
var app = express();
// console.log(numCPUs)
// import { Hero } from './module2';

var Hero = require('./module2');
console.log(Hero)

// if (cluster.isMaster) {
//   console.log(`Master ${process.pid} is running`);
//   console.log(process.argv)
//   // Fork workers.
//   for (let i = 0; i < numCPUs; i++) {
//     var worker = cluster.fork();
//     // console.log(worker.process)
//   }

//   cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//   });
// } else {
//   // Workers can share any TCP connection
//   // In this case it is an HTTP server
//   http.createServer((req, res) => {
//     res.writeHead(200);

//     res.end('hello world\n');
//   }).listen(8000);

//   console.log(`Worker ${process.pid} started`);
// }

// http.createServer((req, res) => {
//   res.writeHead(200);

//   res.end('hello world\n');
// }).listen(8000);

var myLogger = function (req, res, next) {
  console.log('LOGGED')
  next();
}

var myLogger2 = function (req, res, next) {
  console.log('LOGGED 2')
  next();
  
}
app.use(myLogger, myLogger2,)

app.get('/',(req,res,next)=>{
  console.log('GETTING')
  res.sendStatus(200)
});

app.listen(3000);