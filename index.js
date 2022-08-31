const express = require('express');
const server = express();
server.use(express.json());
const users = [];

//Rota para listagem de todos usuários
server.get('/users', (req, res) => {
    return res.json(users);
})

//rota para criação de usuários
server.post('/users', checkUserExist, (req, res) => {
    const { name } = req.body;
    users.push(name);
    return res.json(users);
})

//rota pra editar usuários
server.put('/users/:index', checkUserExist, checkUserInArray, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
})

//rota para apagar usuários
server.delete('/users/:index', (req, res) => {
    const { index } = req.params;
    users.splice(index, 1);

    return res.send();
})

function checkUserExist(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ error: 'Nome de usuário é obrigatorio.' });
    }
    return next();
}
function checkUserInArray(req, res, next) {
    const user = users[req.params.index];
    if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado.'});
    }

    req.user = users;

    return next();
}
server.listen(3000);