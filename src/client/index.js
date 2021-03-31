import { action } from './js/app'
import { creatOptions } from './js/optionsHandler'

import './styles/base.scss'
import './styles/nav.scss'
import './styles/responsive.scss'
import './styles/custom.scss'


creatOptions();


document.getElementById('generate').addEventListener('click', action);
