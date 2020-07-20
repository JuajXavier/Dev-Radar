const express = require('express'); // instalar o express pelas bibliotecas
const mongoose = require('mongoose'); // mongoose para servidor, base de dados com a aplicação
const cors = require('cors');
const http = require('http'); // vai precisar ouvir tanto http quanto websocket, então precisa importar
const routes = require('./routes');
const { setupWebSocket } = require('./webSocket');

const app = express();
const server = http.Server(app); //extrair o servidor do express, server http fora do express, pra trabalhar com ele diretamente.

setupWebSocket(server);

mongoose.connect('mongodb+srv://jvitorxavier:xavier1996@cluster0-prrxt.mongodb.net/week10?retryWrites=true&w=majority', { // trocar usuario e senha na url aqui
    useNewUrlParser: true, // pra "sumir" os "erros"
    useUnifiedTopology: true,
})

app.use(cors()); // pra rodar o backend na porta 3333 com o front na porta 3000
app.use(express.json()); // falou pro express entender as requisições json // .use é pra algo que vai ser valido pra todas as rotas da aplicação, .get por ex, seria valido pra todas as rotas que começam com get.
app.use(routes); // todos usam as rotas.

// métodos http: GET (pegar/receber info, listar usuarios ex), POST (criar alguma info, salvar um produto, cadastrar usuario, etc), put (editar), delete (deletar)
// tipos de parâmetros
// Query Params: utiliza no GET, req.query (filtros, ordenação, paginação, etc)
// Route Params: PUT e DELETE, req.params (indetificar um recurso na alteração ou remoção)
// Body: POST, req.body (dados para criação ou alteração de um registro)

// MongoDB (banco não-relacional, muito performático)

server.listen(3333);
// instalar o nodemon pra atualizar as modificações automaticamente quando salvar o arquivo

