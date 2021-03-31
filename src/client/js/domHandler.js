function tempInFahrenheit (tempInC) {
    const tempInF = tempInC * 1.8 + 32;
    return tempInF.toFixed(0)
};

/**
 * Builds a div with weather data
 * Adds div to DOM
 */
function addWeatherToDom (wBitData, index, weatherSec) {
    const tempInC = wBitData[index]['temp'];
    const code = wBitData[index]['weather']['icon'];

    const div = document.createElement('div');
    div.setAttribute('class', 'card');

    const cardDate = document.createElement('h4');
    cardDate.innerHTML = wBitData[index]['valid_date'];
    div.appendChild(cardDate);

    const icon = document.createElement('img');
    icon.setAttribute('src', `https://www.weatherbit.io/static/img/icons/${code}.png`);
    div.appendChild(icon);

    const cardTemp = document.createElement('h3');
    cardTemp.innerHTML = tempInFahrenheit(tempInC)+'°';
    div.appendChild(cardTemp);
    weatherSec.appendChild(div);
}


export { addWeatherToDom }