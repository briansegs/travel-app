import { getPixData } from './pixHandler'
import { getGeoData } from './geoNamesHandler'
import { addPixToDom } from './pixHandler'
import { getwBitData } from './wBitHandler'
import { addWeatherToDom } from './domHandler'


// Functions

function currentDate () {
    let d = new Date();
    let month = ("0" + (d.getMonth() + 1)).slice(-2);
    let newDate = d.getFullYear()+'-'+month+'-'+ d.getDate();
    return newDate
}


function removeChildren (parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


function action(e) {
    let location = document.getElementById('city').value;
    if (location === '') {
        alert('City is missing');
    } else {
        getPixData(location)
            .then(function (pixData) {
                addPixToDom(pixData);
            });
        getGeoData(e, location)
            .then(function (data) {
                getwBitData(data)
                    .then(function (data) {
                        console.log(data);
                        postData('/add', {data: data['data']});
                        updateUI();
                    });
            });
    }
}


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
        let wSection = document.querySelector('.col-12');
        let date = document.getElementById('date').value;
        const allData = await request.json();
        const latest = allData[allData.length - 1];
        let wBitData = latest['data'];

        console.log(currentDate());
        if (date < wBitData[7]['valid_date'] && date >= currentDate()) {
            console.log('Valid', date);
            removeChildren(wSection);
            for (let i in wBitData) {
                if (wBitData[i]['valid_date'] === date) {
                    addWeatherToDom(wBitData, i, wSection);
                }
            }
        } else {
            console.log('Invalid', date);
            removeChildren(wSection);
            for (let i in wBitData) {
                if (i < 7) {
                    addWeatherToDom(wBitData, i, wSection);
                }
            }
        }
    } catch (error) {
        console.log("error", error);
    }
}


export { action }
export { getData }