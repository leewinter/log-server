import express from 'express';
import http from 'http';
import logger from './winston-config';

let timeouts = [{}, {}, {}, {}];

const randomMilliseconds = () => {
  const randomDecimal = Math.random();
  return randomDecimal * 1000;
};

const randomlyIntervalKill = () => {
  return setTimeout(() => {
    const indexToKill = Math.floor(Math.random() * 4);
    clearTimeout(timeouts[indexToKill]);
  }, randomMilliseconds());
};

const init = port => {
  const app = express();
  const server = http.createServer(app);
  const log = logger(`http://localhost:${process.env.PORT || 3000}`, `localhost:${port}`);

  server.listen(port, () => {
    log.info(`api client listening on ${port}`);
    setInterval(() => {
      timeouts[0] = setTimeout(() => {
        log.debug('Random really long debug message that helps test width a bit more');
      }, randomMilliseconds());

      timeouts[1] = setTimeout(() => {
        log.info('Random info');
      }, randomMilliseconds());

      timeouts[2] = setTimeout(() => {
        log.warn('Random warn');
      }, randomMilliseconds());

      timeouts[3] = setTimeout(() => {
        log.error(new Error("An error message wrapped in an error object").stack);
      }, randomMilliseconds());

      randomlyIntervalKill();
      randomlyIntervalKill();
      randomlyIntervalKill();
    }, 12000);
  });
};

export default init;
