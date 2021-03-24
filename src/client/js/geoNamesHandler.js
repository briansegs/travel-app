import { getData } from './app'

function getGeoData(e, location) {
    let city = location;
    let country = document.getElementById('country').value;
    let geoURL = buildGeo(city, country);
    return getData(geoURL)
}

function buildGeo(city, country) {
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

export { getGeoData }