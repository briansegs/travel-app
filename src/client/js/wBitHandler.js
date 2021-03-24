import { getData } from './app'


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


export { getwBitData }