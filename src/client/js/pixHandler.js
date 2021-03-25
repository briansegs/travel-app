import { getData } from './app'


function buildPix(location) {
    let baseURL = 'https://pixabay.com/api/?';
    let apiKey = `key=${process.env.PIX_API_KEY}`;
    let term = location.replace(/\s/g, '+');
    let searchTerm = `&q=${term}`;
    let imgType = '&image_type=photo';
    let url = baseURL + apiKey + searchTerm + imgType;
    return url
}


function getPixData(location) {
    let pixURL = buildPix(location);
    return getData(pixURL)
}


function addPixToDom (pixData) {
    let pixLst = pixData['hits'];
    let randIndex = Math.floor(Math.random() * pixLst.length);
    let randImg = pixLst[randIndex]['webformatURL'];
    let locationImg = document.getElementById('front-splash');
    locationImg.setAttribute('src', randImg);
}


export { getPixData }
export { addPixToDom }