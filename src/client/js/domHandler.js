function tempInFahrenheit (tempInC) {
    let tempInF = tempInC * 1.8 + 32;
    return tempInF.toFixed(0)
};


function addWeatherToDom (wBitData, index, wSection) {
    let tempInC = wBitData[index]['temp'];
    let code = wBitData[index]['weather']['icon'];

    let div = document.createElement('div');
    div.setAttribute('class', 'card');

    let cardDate = document.createElement('h4');
    cardDate.innerHTML = wBitData[index]['valid_date'];
    div.appendChild(cardDate);

    let icon = document.createElement('img');
    icon.setAttribute('src', `https://www.weatherbit.io/static/img/icons/${code}.png`);
    div.appendChild(icon);

    let cardTemp = document.createElement('h3');
    cardTemp.innerHTML = tempInFahrenheit(tempInC)+'°';
    div.appendChild(cardTemp);
    wSection.appendChild(div);
}


export { addWeatherToDom }