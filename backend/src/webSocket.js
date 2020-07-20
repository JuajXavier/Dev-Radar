const socketio = require('socket.io');
const parseStringAsArray = require('./utils/parseStringAsArray');
const calculateDistance = require('./utils/calculateDistance');

let io;
const connections = [];

exports.setupWebSocket = (server) => { // configurar o servidor pra aceitar req websocket, vai receber o servidor extraido do express e vai fazer algo com o servidor.
    io = socketio(server);

    io.on('connection', socket => { // (event listener) toda vez aqui que um usuario se conectar na aplicação via websocket, vai receber o objeto chamado socket.
        const { latitude, longitude, techs } = socket.handshake.query;
        
        connections.push({
            id: socket.id, // push pra criar um novo objeto contendo o id gerado.
            coordinates: {
                latitude: Number(latitude),
                longitude: Number(longitude),
            },
            techs: parseStringAsArray(techs), // pra passar as strings pra um array.
          });
       });
    };

    exports.findConnections = (coordinates, techs) => {
        return connections.filter(connection => {
            return calculateDistance(coordinates, connection.coordinates) < 10
                && connection.techs.some(item => techs.includes(item))
        })
    }

    exports.sendMessage = (to, message, data) => { // mensagem tem 3 parametros: destinatário, chave/tipo e valor
        to.forEach(connection => {
            io.to(connection.id).emit(message, data);
        })
    }

        /*    setTimeout(() => {  faz a função aguardar x tempo pra executar.
            socket.emit('message', 'Hello!') // dps de 3 segundos, vai emitir uma mensagem pro socket.
        }, 3000)
      aqui o backend tá mandando uma mensagem pro front end sem nenhuma req do front pro back. */