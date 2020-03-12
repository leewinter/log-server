import express from'express';
import http from 'http';
import path from 'path';
import init from './services/socket-io-server';

const app = express();
const server = http.createServer(app);

// Expose library paths
const publicDirectory = path.join(__dirname, '/../public');
const chartJs = path.join(__dirname + '/../node_modules/chart.js/dist');
const lodash = path.join(__dirname + '/../node_modules/lodash');
const jQuery = path.join(__dirname + '/../node_modules/jquery');
const bootstrap = path.join(__dirname + '/../node_modules/bootstrap');

init(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use('/chartjs', express.static(chartJs));
app.use('/lodash', express.static(lodash));
app.use('/jquery', express.static(jQuery));
app.use('/bootstrap', express.static(bootstrap));
app.use('/', express.static(publicDirectory));

const serverPort = process.env.PORT || 3000;
server.listen(serverPort, () => {
  console.log(`listening on *:${serverPort}`);
});