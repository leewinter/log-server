import winston from 'winston';
import getTransport from '../../transport/websocket-transport.js';
require('winston-daily-rotate-file');

const humanLogsPath = 'logs/human';

const humanFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.align(),
  winston.format.printf(info => `${info.timestamp} ${info.level}:${info.message}`)
);

const defaultTransport = {
  filename: `./${humanLogsPath}/log-%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  level: process.env.LOG_LEVEL || 'debug',
  format: humanFormat,
  humanLogsUrl: 'logs/human'
};

const getLogger = (socketIoServer, apiUrl) => {
  winston.loggers.add(`${apiUrl}`, {
    transports: [
      new winston.transports.DailyRotateFile({
        ...defaultTransport
      }),
      getTransport(socketIoServer, apiUrl, 'winston-log', defaultTransport)
    ]
  });

  const logger = winston.loggers.get(`${apiUrl}`);

  return logger;
};

export default function logger(socketIoServer, apiUrl){
  return getLogger(socketIoServer, apiUrl);
}
