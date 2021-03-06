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
    const term = location.replace(/\s/g, '+');
    const searchTerm = `&q=${term}`;
    const imgType = '&image_type=photo';
    let url = baseURL + apiKey + searchTerm + imgType;
    return url
}


function buildGeo(city, country) {
    const rows = 1;
    const userName = `&username=${process.env.USER_NAME}`;
    let baseURL = 'http://api.geonames.org/postalCodeSearchJSON?';
    city.replace(/\s/g, '%20');
    const placeName = `&placename=${city}`;
    const countryTag = `&country=${country}`;
    const maxRows = `&maxRows=${rows}`;
    let url = baseURL + placeName + countryTag + maxRows + userName;
    return url
}


function buildWBit(lat, lon) {
    let baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
    const latCord = `lat=${lat}`;
    const lonCord = `&lon=${lon}`;
    let apiKey = `&key=${process.env.WBIT_API_KEY}`;
    let url = baseURL + latCord + lonCord + apiKey;
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
    try{
        const newData = req.body;
        projectData.push(newData);
        return res.json({
            success: true,
            newData,
        });
    } catch (err) {
        return res.status(500).json({
          success: false,
          message: err.message,
        });
    }

})


// POST pixData
app.post('/getpix', async (req, res) => {
    try {
        const location = req.body.data;
        const pixURL = buildPix(location);
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


// POST geoData
app.post('/getgeo', async (req, res) => {
    try {
        const city = req.body.location;
        const country = req.body.country;
        const geoURL = buildGeo(city, country)
        let response = getData(geoURL);
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


// POST wBitData
app.post('/getwbit', async (req, res) => {
    try {
        const data = req.body.data;
        const geoData = data['postalCodes'][0];
        const latCord = geoData['lat'];
        const lonCord = geoData['lng'];
        const wBitURL = buildWBit(latCord, lonCord);
        let response = getData(wBitURL);
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