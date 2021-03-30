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


/**
 * @param {DOM-event} e
 * Gets the city, country, and date from form fields
 * Alerts if fields are empty
 * Gets and post images from an api
 * Gets and uses data from an api to get data from another api
 * Posts data to the server
 * Updats the UI with data stored in the server
 */
function action(e) {
    let location = document.getElementById('city').value;
    if (location === '') {
        alert('City is missing');
    } else {
        postPix({data: location})
            // .then(function (pixData) {
            //     if (pixData['hits'].length === 0) {
            //         getPixData('not found')
            //             .then (function (na) {
            //                 addPixToDom(na);
            //             })
            //     } else {
            //         addPixToDom(pixData);
            //     }
            // });
        getGeoData(e, location)
            .then(function (data) {
                let date = document.getElementById('date').value;
                if (date === '') {
                    alert('Date is missing.')
                } else {
                    getwBitData(data)
                        .then(function (data) {
                            postData('/add', {data: data['data']});
                            updateUI(date);
                        });
                }


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


const postPix = async (url = '/getpix', data = {}) => {
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

/**
 * Gets latest data from the server
 * Checks if date in data within 7 days from current date
 * Clears the DOM section of all children
 * Either posts a group of elements to the section or a single one
 * Sends an error if anything fails
 */
const updateUI = async (date) => {
    const request = await fetch('/all');
    try {
        let weatherSec = document.querySelector('.col-full');
        const allData = await request.json();
        const latest = allData[allData.length - 1];
        let wBitData = latest['data'];

        if (date < wBitData[7]['valid_date'] && date >= currentDate()) {
            removeChildren(weatherSec);
            for (let index in wBitData) {
                if (wBitData[index]['valid_date'] === date) {
                    addWeatherToDom(wBitData, index, weatherSec);
                }
            }
        } else {
            removeChildren(weatherSec);
            for (let index in wBitData) {
                if (index < 7) {
                    addWeatherToDom(wBitData, index, weatherSec);
                }
            }
        }
    } catch (error) {
        console.log("error", error);
    }
}


export { action }
export { getData }