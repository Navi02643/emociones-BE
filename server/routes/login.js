const express = require("express");
const app = express();
const jwt = require('jsonwebtoken')
const loginService = require("../services/login")
const config = require('../config/config.json')
const tokenList = {}

app.post('/login', async (req,res) => {
    try {
        const data = await loginService.login(req.body);
        return res.status(200).send({
            status: "200",
            err: false,
            data,
        });
        } catch (err) {
        return res.status(500).send({
            status: "500",
            err: true,
            err: Object.keys(err).length === 0 ? err.message : err,
        });
        }
});

app.post('/token', (req,res) => {
    const postData = req.body
    if((postData.refreshToken) && (postData.refreshToken in tokenList)) {
        const user = {
            "email": postData.email,
            "password": postData.password
        }
        const token = jwt.sign(user, config.secret, { expiresIn: config.tokenLife})
        const response = {
            "token": token,
        }
        tokenList[postData.refreshToken].token = token
        res.status(200).json(response);        
    } else {
        res.status(404).send('Invalid request')
    }
})

app.use(require('./tokenChecker'))

app.get('/secure', (req,res) => {
    res.send('Secure')
})

module.exports = app;