import express from'express';
import http from 'http';
import path from 'path';
import init from './services/socket-io-server';

const app = express();
const server = http.createServer(app);

// Expose library paths
const publicDirectory = path.join(__dirname, '/../log-client/dist/log-client');

init(server);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../log-client/dist/log-client/index.html'));
});

app.use('/', express.static(publicDirectory));

const serverPort = process.env.PORT || 3000;
server.listen(serverPort, () => {
  console.log(`listening on *:${serverPort}`);
});