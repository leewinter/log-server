const io = require('socket.io');

// Browsers and APIs
let connectedClients = new Map();
// Just APIs
let connectedApis = new Map();

// Filter client Map to remove registered APIs
const getNoneApiClients = () => {
  var allClients = Array.from(connectedClients.entries());
  var allApis = Array.from(connectedApis.entries());
  var noneApiClients = allClients.filter(client => allApis.map(api => api[0]).indexOf(client[0]));
  return noneApiClients;
};
// Gets the urls of connected APIs
const getApiClientList = () => {
  var allApis = Array.from(connectedApis.entries()).map((api => new Object({ url: (api[1].winstonTransportOptions.apiUrl || api[1].id), humanLogsUrl: api[1].winstonTransportOptions.humanLogsUrl })));
  return allApis;
}
// Generic emit for none API clients
const emitToNoneApiClients = (eventName, obj) => {
  const noneApiClients = getNoneApiClients();
  for (const [id, client] of noneApiClients) {
    client.emit(eventName, obj);
  }
};
// Will fire when any client connects
const registerClient = socket => {
  connectedClients.set(socket.id, socket);
  console.info(`Client connected [id=${socket.id}]`);
};
// Reserved for connecting API clients
const registerAsApiEvent = socket => {
  socket.on('register-as-api', options => {
    socket.winstonTransportOptions = options;
    connectedApis.set(socket.id, socket);
    emitToNoneApiClients('api-connected', options.apiUrl || socket.id);
    emitToNoneApiClients('get-connected-apis', getApiClientList());
    console.info(`Api connected [id=${socket.id} api=${options.apiUrl}]`);
  });
};
// Log event fired from none api clients
const getAllConnectedApisEvent = socket => {
  socket.on('get-connected-apis', msg => {
    emitToNoneApiClients('get-connected-apis', getApiClientList());
    console.info(`get-connected-apis`, msg);
  });
};
// Log event fired from Core API WinstonTransport
const winstonLogEvent = socket => {
  socket.on('winston-log', msg => {
    const sourceApi = connectedApis.get(socket.id);
    msg.sourceApi = sourceApi ? sourceApi.winstonTransportOptions.apiUrl : socket.id;
    emitToNoneApiClients('winston-log', msg);
    console.info(`winston-log`, msg);
  });
};
// If client is also an API remove from list
const disconnectApiEvent = socket => {
  if (connectedApis.get(socket.id)) {
    connectedApis.delete(socket.id);
    emitToNoneApiClients('api-disconnected', socket.winstonTransportOptions.apiUrl || socket.id);
    emitToNoneApiClients('get-connected-apis', getApiClientList());
    console.info(`Api disconnect [id=${socket.id}]`);
  }
};
// Called for all clients when they disconnect
const disconnectClientEvent = socket => {
  socket.on('disconnect', () => {
    connectedClients.delete(socket.id);
    console.info(`Client disconnect [id=${socket.id}]`);
    disconnectApiEvent(socket);
    console.log('connectedApis', Array.from(connectedApis).length);
    console.log('connectedClients', Array.from(connectedClients).length);
  });
};

const init = port => {
  const server = io(port);
  server.on('connection', socket => {
    registerClient(socket);
    registerAsApiEvent(socket);
    disconnectClientEvent(socket);
    winstonLogEvent(socket);
    getAllConnectedApisEvent(socket);
  });
};

module.exports = { init };
