const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../webSocket');

//5 funções do controller: index (listar), show (mostrar 1), store (armazenar), update, destroy

module.exports = {
    async index(req, res) {
        const devs = await Dev.find();

        return res.json(devs);
    },
    
    async store(req, res) { // async porque pode demorar pra responder, revisar promise.
        const { github_username, techs, latitude, longitude } = req.body; // instalar axios (yarn add ou npm i) ela faz chamadas para outras apis.
    
        let dev = await Dev.findOne({ github_username });

        if(!dev) {
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`); // "await" p/ aguardar isso aqui dar uma resposta pra daí continuar o restante
        
            const { name = login, avatar_url, bio } = apiResponse.data; // se não tiver nome, o valor default vai ser o login dessa forma.
            //ou (aí teria que ser let em vez de const)
            // if (!name) {
            //   name = apiResponse.data.login;
            // }
            // console.log(name, avatar_url, bio, github_username);
            
            const techsArray = parseStringAsArray(techs);
        
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
        
             dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })

            // Filtrar as conexões que estão a no maximo 10 km de distancia 
            // e que o novo dev tenha uma das techs filtradas.


            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )

            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }

        return res.json(dev);
    }
};
        
            
