var path = require('path')
const express = require('express')
var cors = require('cors')
// const dotenv = require('dotenv');
// dotenv.config();


// Start up an instance of app
const app = express();

// to use json
app.use(express.json())

// to use url encoded values
app.use(express.urlencoded({
  extended: true
}))

// Cors for cross origin allowance
app.use(cors())
const { Router, response } = require('express');

// Initialize the main project folder
app.use(express.static(__dirname + '/dist'))

// Sets landing page
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/dist/index.html')
})

// designates what port the app will listen to for incoming requests
const port = process.env.PORT || 8081;

app.listen(port, function () {
    console.log(`Travel app listening on port ${port}!`)
})


/* Routes */

// GET All
let projectData = [];

app.get('/all', (req, res) => {
    res.send(projectData);
})

// POST Data
app.post('/add', (req, res) => {
    let newData = req.body;
    projectData.push(newData);
})


module.exports = app;