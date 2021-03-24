import { action } from './js/app'
import { creatOptions } from './js/optionsHandler'

import './styles/style.scss'
import './styles/nav.scss'
import './styles/responsive.scss'
import './styles/main.scss'

creatOptions();

// EventListeners
document.getElementById('generate').addEventListener('click', action);
