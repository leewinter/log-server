import formatDate from 'date-fns/format';
import io from 'socket.io-client';
import stripAnsi from 'strip-ansi';
import Transport from 'winston-transport';

/**
 * WebSocket transport for Winston logger.
 */
export class WebsocketTransport extends Transport {
  /**
   *
   * @param {object} server the HTTP server to attach WS to
   * @param {object} apiUrl url of hosted container
   * @param {object} eventName the emitted WebSocket event name
   * @param {object} options the transport options
   */
  constructor(server, apiUrl, eventName, options = {}) {
    super(options);
    this.eventName = eventName;
    const mergedOptions = {options, ...{apiUrl}};
    this.ioServer = io(server);
    this.ioServer.on('connect', () => {
      this.ioServer.emit('register-as-api', mergedOptions);
    });
  }

  /**
   *
   * @param {object} metadata the logging event metadata
   * @param {object} callback Winston callback
   * @return {void} null
   */
  log(metadata, callback) {
    if (this.silent) return callback();
    const toLog = {
      level: metadata.level,
      msg: stripAnsi(metadata.message),
      timestamp: formatDate(Date.now(), 'yyyy-MM-dd HH:mm:ss.SSS'),
      meta: metadata.meta
    };
    // this.ioServer.emit(this.eventName, JSON.stringify(toLog));
    this.ioServer.emit(this.eventName, toLog);
    callback();
    return null;
  }
}

export default function getTransport(server, apiUrl, eventName, options) {
  return new WebsocketTransport(server, apiUrl, eventName, options);
};