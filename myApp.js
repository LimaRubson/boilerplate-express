require('dotenv').config();

let express = require('express');
let app = express();

app.get('/json', function (req, res) {
    const message = 'Hello json';
    const responseMessage = process.env.MESSAGE_STYLE === 'uppercase' ? message.toUpperCase() : message;
    res.json({ message: responseMessage });
  });
  


































 module.exports = app;
