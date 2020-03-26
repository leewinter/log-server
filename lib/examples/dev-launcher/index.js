import init from '../api-client';

const numberOfApis = 7;
let currentPortsInUse = [4200];

const randomPort = () => {
    const randomDecimal = Math.random();
    return Math.floor(randomDecimal * 1000);
}

for (var i = 0; i < numberOfApis; i++) {
    var port = randomPort();
    init(port);
}