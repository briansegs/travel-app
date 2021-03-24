import { getPixData } from './pixHandler'
import { getGeoData } from './geoNamesHandler'
import { addPixToDom } from './pixHandler'
import { getwBitData } from './wBitHandler'
import { addWeatherToDom } from './domHandler'
/* Global Variables */



// Functions


function currentDate () {
    let d = new Date();
    let month = ("0" + (d.getMonth() + 1)).slice(-2);
    let newDate = d.getFullYear()+'-'+month+'-'+ d.getDate();
    return newDate
};


function action(e) {
    let date = document.getElementById('date').value;
    let location = document.getElementById('city').value;
    getPixData(location)
        .then(function (pixData) {
            addPixToDom(pixData);
        });
    getGeoData(e, location)
        .then(function (data) {
            getwBitData(data)
                .then(function (data) {
                    let wBitData = data['data']
                    console.log(wBitData)
                    console.log(currentDate())
                    if (date < wBitData[7]['valid_date'] && date >= currentDate()) {
                        console.log('Valid', date);
                        for (let i in wBitData) {
                            if (wBitData[i]['valid_date'] === date) {
                                addWeatherToDom(wBitData, i);
                            }
                        }
                    } else {
                        console.log('Invalid', date);
                        for (let i in wBitData) {
                            if (i < 7) {
                                addWeatherToDom(wBitData, i);
                            }
                        }
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
export { getData }