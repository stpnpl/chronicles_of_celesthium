import {portrait} from './data/characters.js';
export function image(id,alt,cls='portrait'){return `<img class="${cls}" src="${portrait(id)}" alt="${alt}" loading="lazy" onerror="this.hidden=true;this.parentElement.classList.add('image-missing')">`;}
