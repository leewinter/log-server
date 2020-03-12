import express from 'express';
import http from 'http';
import logger from './winston-config';

const randomMilliseconds = () => {
  const randomDecimal = Math.random();
  return randomDecimal * 1000;
};

const init = port => {
  const app = express();
  const server = http.createServer(app);
  const log = logger('http://localhost:3000', `localhost:${port}`);

  server.listen(port, () => {
    log.info(`api client listening on ${port}`);
    setInterval(() => {
      setTimeout(() => {
        log.debug('Random debug');
      }, randomMilliseconds());

      setTimeout(() => {
        log.info('Random info');
      }, randomMilliseconds());

      setTimeout(() => {
        log.warn('Random warn');
      }, randomMilliseconds());

      setTimeout(() => {
        log.error('Random error');
      }, randomMilliseconds());
    }, 3000);
  });
};

export default init;
