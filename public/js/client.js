var ioClient = io('/');

// Events
ioClient.on('winston-log', msg => addToLogWindow(msg));
ioClient.on('api-connected', msg => apiConnecetd(msg));
ioClient.on('api-disconnected', msg => apiDisconnecetd(msg));
ioClient.on('get-connected-apis', msg => updateConnectedApiWindow(msg));

// Emitters
ioClient.emit('get-connected-apis', window.location.href);
