import { action } from './js/app'
import { creatOptions } from './js/optionsHandler'
import { getGeoData } from './js/geoNamesHandler'
import { getwBitData } from './js/wBitHandler'
import { getPixData, addPixToDom } from './js/pixHandler'

import './styles/style.scss'
import './styles/nav.scss'
import './styles/responsive.scss'
import './styles/main.scss'

creatOptions();

export { getGeoData }
export { getwBitData }
export { getPixData, addPixToDom }

// EventListeners
document.getElementById('generate').addEventListener('click', action);
