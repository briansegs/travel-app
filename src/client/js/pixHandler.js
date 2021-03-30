function addPixToDom (pixData) {
    let pixLst = pixData['json']['hits'];
    let randIndex = Math.floor(Math.random() * pixLst.length);
    let randImg = pixLst[randIndex]['webformatURL'];
    let locationImg = document.getElementById('front-splash');
    locationImg.setAttribute('src', randImg);
}


export { addPixToDom }