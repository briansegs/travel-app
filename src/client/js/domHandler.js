function tempInFahrenheit (tempInC) {
    let tempInF = tempInC * 1.8 + 32;
    return tempInF.toFixed(0)
};


function addWeatherToDom (wBitData, i) {
    let tempInC = wBitData[i]['temp'];
    let code = wBitData[i]['weather']['icon'];

    let wSection = document.querySelector('.col-12');

    let div = document.createElement('div');
    div.setAttribute('class', 'card');

    let cardDate = document.createElement('h4');
    cardDate.innerHTML = wBitData[i]['valid_date'];
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