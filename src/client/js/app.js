/* Global Variables */



// Functions
function getGeoData(e, location) {
    let city = location;
    let country = document.getElementById('country').value;
    let geoURL = buildGeonames(city, country);
    return getData(geoURL)
}

function buildGeonames(city, country) {
    let rows = 1;
    let userName = `&username=${process.env.USER_NAME}`;
    let baseURL = 'http://api.geonames.org/postalCodeSearchJSON?';
    city.replace(/\s/g, '%20');
    let placeName = `&placename=${city}`;
    let countryTag = `&country=${country}`;
    let maxRows = `&maxRows=${rows}`;
    let url = baseURL + placeName + countryTag + maxRows + userName;
    return url
}



function buildWBit(lat, lon) {
    let baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
    let latCord = `lat=${lat}`;
    let lonCord = `&lon=${lon}`;
    let apiKey = `&key=${process.env.WBIT_API_KEY}`;
    let url = baseURL + latCord + lonCord + apiKey;
    return url
}

function getwBitData(data) {
    let geoData = data['postalCodes'][0];
    let latCord = geoData['lat'];
    let lonCord = geoData['lng'];
    let wBitURL = buildWBit(latCord, lonCord);
    return getData(wBitURL)
}

function buildPix(location) {
    let baseURL = 'https://pixabay.com/api/?';
    let apiKey = `key=${process.env.PIX_API_KEY}`;
    let term = location.replace(/\s/g, '+');
    let sTerm = `&q=${term}`;
    console.log(sTerm);
    let imgType = '&image_type=photo';
    let url = baseURL + apiKey + sTerm + imgType;
    console.log(url);
    return url
}

function getPixData(location) {
    let pixURL = buildPix(location);
    return getData(pixURL)
}


// function currentDate () {
//     let d = new Date();
//     let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
//     return newDate
// };


// function tempInFahrenheit (data) {
//     let temp = (data.main.temp - 273.15) * 1.8 + 32;
//     return temp.toFixed(2)
// };


function action(e) {
    let date = document.getElementById('date').value;
    let location = document.getElementById('city').value;
    getPixData(location)
        .then(function (pixData) {
            let pixLst = pixData['hits'];
            let randIndex = Math.floor(Math.random() * pixLst.length);
            let randImg = pixLst[randIndex]['webformatURL'];
            let locationImg = document.getElementById('front-splash');
            locationImg.setAttribute('src', randImg);
        });
    getGeoData(e, location)
        .then(function (data) {
            getwBitData(data)
                .then(function (data) {
                    console.log(data);
                    let wBitData = data['data']
                    console.log(wBitData[0]['valid_date'] === date)
                    if (wBitData[0]['valid_date'] === date) {
                        console.log(wBitData[0]);
                    } else {
                        console.log(wBitData);
                    }
                })
            // postData('/add', {temperature: tempInFahrenheit(data), date: currentDate(), feelings: feelings});
            // updateUI()
        });
};



// Async Functions

const getData = async (url) => {
    const res = await fetch(url)
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
};


const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log('error', error);
    }
};


const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        const latest = allData[allData.length - 1];
        document.getElementById('date').innerHTML = latest.date;
        document.getElementById('temp').innerHTML = latest.temperature;
        document.getElementById('content').innerHTML = latest.userResponse;
    } catch (error) {
        console.log("error", error);
    }
}


export { action }