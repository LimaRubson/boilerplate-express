# Basic Node and Express

This is the boilerplate code for the Basic Node and Express Challenges. Instructions for working on these challenges start at https://www.freecodecamp.org/learn/apis-and-microservices/basic-node-and-express/

# My collaboration in the project:

This code sets up a simple web server using the Express.js framework in Node.js. Here's a line-by-line explanation of what the code does:

## Module Imports:
```javascript
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser'); // Add this line
```
- #### Express: It's the web framework for Node.js.
- #### Path: Provides utilities for working with file and directory paths.
- #### Body-parser: Middleware for processing HTTP request body data.

## Express Application Setup:
```javascript
var app = express();
```
- #### Creates an instance of Express for the application.

## Logging Middleware:
```javascript
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});
```
 - #### Logs information about each incoming request to the console.
 - #### next(): Calls the next middleware in the stack.

 ## Body-parser Configuration:
 ```javascript
 app.use(bodyParser.urlencoded({ extended: false }));
```
- #### Configures body-parser to handle URL-encoded data.

## Main Route (GET /):
```javascript
app.get("/", (req, res) => {
  const indexPath = path.join(__dirname, 'views', 'index.html');
  res.sendFile(indexPath);
});
```
- #### Serves the index.html file when the main route is accessed.

## Static Middleware (Serving Static Files):
```javascript
const publicPath = path.join(__dirname, 'public');
app.use('/public', express.static(publicPath));
```
- #### Configures middleware to serve static files from the public folder under /public.

## Current Time Middleware (GET /now):
```javascript
app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({ time: req.time });
});
```
 - #### Adds the current time to req.time and responds with a JSON object containing this time.

## Echo Route (GET /:word/echo):
```javascript
app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});
```
 - #### Repeats the word provided as a parameter in the URL and returns it in a JSON object.

 ## Name Route (GET /name):
 ```javascript
 app.get("/name", (req, res) => {
  // ... (creates a JSON object containing the name from query parameters)
});
```
 - #### Handles URL query to create a JSON object containing a name.

 ## Name Route (POST /name):
  ```javascript
 app.post("/name", (req, res) => {
  // ... (creates a JSON object containing the name from the request body)
});
```
 - #### Handles POST request body data to create a JSON object containing a name.

 ## JSON Route (GET /json):
 ```javascript
 app.get("/json", (req, res) => {
  // ... (responds with a JSON object depending on the value of the environment variable)
});
```
 - #### Responds with a JSON object, the content of which depends on the value of the .env environment variable.

## Export of the Express Application:
```javascript
module.exports = app;
```
 - #### Exports the Express instance to be used in other files (e.g., in a main script).
