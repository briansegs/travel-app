var path = require('path')
const express = require('express')
var cors = require('cors')
const fetch = require('node-fetch')

if (process.env.NODE_ENV == 'development')
require('dotenv').config({ silent: true });


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
app.use(express.static('dist'))

// Sets landing page
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../dist/', 'index.html'))
})

// designates what port the app will listen to for incoming requests
const port = process.env.PORT || 8081;

app.listen(port, function () {
    console.log(`Travel app listening on port ${port}!`)
})

/* functions */

function buildPix(location) {
    let baseURL = 'https://pixabay.com/api/?';
    let apiKey = `key=${process.env.PIX_API_KEY}`;
    let term = location.replace(/\s/g, '+');
    let searchTerm = `&q=${term}`;
    let imgType = '&image_type=photo';
    let url = baseURL + apiKey + searchTerm + imgType;
    return url
}

const getData = async (url) => {
    const res = await fetch(url)
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
};


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

// POST pixData
app.post('/getpix', async (req, res) => {
    try {
        let location = req.body.data;
        let pixURL = buildPix(location);
        let response = getData(pixURL);
        response.then(function (json) {
            return res.json({
                success: true,
                json,
            });
        })
    } catch (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
    }
})


module.exports = app;