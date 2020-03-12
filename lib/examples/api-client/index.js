import express from 'express';
import http from 'http';

const init = port => {
  const app = express();
  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`api client listening on ${port}`);
  });
};

export default init;
