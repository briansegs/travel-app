function addPixToDom (pixData) {
    const pixLst = pixData['json']['hits'];
    const randIndex = Math.floor(Math.random() * pixLst.length);
    const randImg = pixLst[randIndex]['webformatURL'];
    const locationImg = document.getElementById('front-splash');
    locationImg.setAttribute('src', randImg);
}


export { addPixToDom }