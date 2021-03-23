/* Global Variables */



// Functions
function buildGeonames (city, country) {
    let rows = 1;
    let userName = `&username=${process.env.USER_NAME}`;
    let baseURL = 'http://api.geonames.org/postalCodeSearchJSON?';
    city.replace(/\s/g, '%20');
    let placeName = `&placename=${city}`;
    let countryTag = `&country=${country}`;
    let maxRows = `&maxRows=${rows}`;
    let url = baseURL+placeName+countryTag+maxRows+userName;
    return url
}

function buildWbit (lat, lon) {
    let baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
    let latCord = `lat=${lat}`;
    let lonCord = `&lon=${lon}`;
    let apiKey = `&key=${process.env.API_KEY}`;
    let url = baseURL+latCord+lonCord+apiKey;
    return url
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


function action (e) {
    let city = document.getElementById('city').value;
    let country = document.getElementById('country').value;
    let date = document.getElementById('date').value;
    console.log(date);
    let geoUrl = buildGeonames(city, country);
    getData(geoUrl)
    .then(function (data) {
        console.log(data);
        let lat1 = data['postalCodes'][0]['lat'];
        let lon1 = data['postalCodes'][0]['lng'];
        console.log(lat1, lon1);
        let wBitURL = buildWbit(lat1, lon1);
        getData(wBitURL)
        .then(function (data) {
            console.log(data);
            console.log(data['data'][0]['valid_date'] === date)
            if (data['data'][0]['valid_date'] === date) {
                console.log(data['data'][0]);
            } else {
                console.log(data['data']);
            }
        })
        // postData('/add', {temperature: tempInFahrenheit(data), date: currentDate(), feelings: feelings});
        // updateUI()
    })
};



// Async Functions

const getData = async (url) => {
    const res = await fetch(url)
    try {
        const data = await res.json();
        return data;
    } catch(error) {
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
    }catch(error) {
        console.log('error', error);
    }
};


const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      const latest = allData[allData.length - 1];
      document.getElementById('date').innerHTML = latest.date;
      document.getElementById('temp').innerHTML = latest.temperature;
      document.getElementById('content').innerHTML = latest.userResponse;
    }catch(error){
      console.log("error", error);
    }
}


export { action }