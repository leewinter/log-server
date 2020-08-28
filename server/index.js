import express from 'express';
import http from 'http';
import path from 'path';
import init from './services/socket-io-server';
const historyRoute = require('./routes/history')

const app = express();
const server = http.createServer(app);

// Expose library paths
const publicDirectory = path.join(__dirname, '/../log-client/dist/log-client');

init(server);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../log-client/dist/log-client/index.html'));
});

app.use('/', express.static(publicDirectory));

/* --- Add headers: allow access from other domains --- */
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

app.use(historyRoute);

const serverPort = process.env.PORT || 3000;
server.listen(serverPort, () => {
  console.log(`listening on *:${serverPort}`);
});