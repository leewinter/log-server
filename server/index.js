const express = require('express');
const app = express();
const http = require('http').createServer(app);
const ioServer = require('./services/socket-io-server');
const path = require('path');
// Expose library paths
const public = path.join(__dirname, '/../public');
const chartJs = path.join(__dirname + '/../node_modules/chart.js/dist');
const lodash = path.join(__dirname + '/../node_modules/lodash');
const jQuery = path.join(__dirname + '/../node_modules/jquery');
const bootstrap = path.join(__dirname + '/../node_modules/bootstrap');

ioServer.init(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use('/chartjs', express.static(chartJs));
app.use('/lodash', express.static(lodash));
app.use('/jquery', express.static(jQuery));
app.use('/bootstrap', express.static(bootstrap));
app.use('/', express.static(public));

http.listen(process.env.PORT || 3000, () => {
  console.log('listening on *:3000');
});
