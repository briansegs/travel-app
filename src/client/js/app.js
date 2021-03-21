/* Global Variables */



// Functions
function buildURL (code, country) {
    let userName = `&username=${process.env.USER_NAME}`;
    let baseURL = 'http://api.geonames.org/postalCodeSearchJSON?';
    let postalCode = `&postalcode=${code}`;
    let countryTag = `&country=${country}`;
    let url = baseURL+postalCode+countryTag+userName;
    return url
}


function currentDate () {
    let d = new Date();
    let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    return newDate
};


function tempInFahrenheit (data) {
    let temp = (data.main.temp - 273.15) * 1.8 + 32;
    return temp.toFixed(2)
};


function action (e) {
    let code = document.getElementById('zip').value;
    let country = document.getElementById('feelings').value;
    let url = buildURL(code, country);
    getWeather(baseURL, zip, apiKey)
    .then(function (data) {
        postData('/add', {temperature: tempInFahrenheit(data), date: currentDate(), feelings: feelings});
        updateUI()
    })
};


// Async Functions

const getWeather = async (baseURL, zip, apiKey) => {
    const res = await fetch(baseURL+zip+apiKey)
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