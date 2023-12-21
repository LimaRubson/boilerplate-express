var express = require('express');
var path = require('path');
var bodyParser = require('body-parser'); // Adicione esta linha

var app = express();

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Configurar body-parser para lidar com dados URL encoded
app.use(bodyParser.urlencoded({ extended: false }));

// Serve "Hello Express" for GET requests to the root path
app.get("/", (req, res) => {
  // Calcula o caminho absoluto para o arquivo index.html
  const indexPath = path.join(__dirname, 'views', 'index.html');

  // Envia o arquivo index.html como resposta
  res.sendFile(indexPath);
});

// Mount the express.static() middleware to serve static files from the /public path
const publicPath = path.join(__dirname, 'public');
app.use('/public', express.static(publicPath));

// Middleware to add the current time to req.time
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  // Handler to respond with JSON object {time: req.time}
  res.json({ time: req.time });
});

// Echo server to repeat the word from route parameter
app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});

// API endpoint to respond with a JSON document containing the name
app.get("/name", (req, res) => {
  const firstName = req.query.first;
  const lastName = req.query.last;
  const fullName = `${firstName} ${lastName}`;
  res.json({ name: fullName });
});

// POST endpoint to handle data from the request body
app.post("/name", (req, res) => {
  const firstName = req.body.first; // Agora você pode acessar os dados do corpo da solicitação
  const lastName = req.body.last;
  const fullName = `${firstName} ${lastName}`;
  res.json({ name: fullName });
});

app.get("/json", (req, res) => {
  const mySecret = process.env['.env'];
  mySecret === 'uppercase' ? 
    res.json({ "message": "HELLO JSON" }):
    res.json({ "message": "Hello json" });
});

module.exports = app;
