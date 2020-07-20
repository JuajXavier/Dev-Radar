import socketio from 'socket.io-client';

const socket = socketio('http://192.168.0.18:3333', {
    autoConnect: false, // pra conexão não ser automatica
});

function subscribeToNewDevs(subscribeFunction) {
    socket.on('new-dev', subscribeFunction) // função callback, vai ouvir o evento 'new-dev' e vai disparar a subscribeFunction assim que ela receber esse evento.
}

function connect(latitude, longitude, techs) {
    socket.io.opts.query = {
        latitude,
        longitude,
        techs,
    }

    socket.connect();
}

function disconnect() {
    if(socket.connected) {
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs,
};