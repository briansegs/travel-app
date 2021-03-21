/* Global Variables */

let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
let apiKey = ',us&appid=73ce595a0ec8725af0a3bf9dfd38dcc4';


// Functions

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
    let zip = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
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


// EventListeners

document.getElementById('generate').addEventListener('click', action);
