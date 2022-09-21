import debounce from 'lodash.debounce';
import { onInput } from '.';

const DEBOUNCE_DELAY = 300;

const refs = {
  searchBox: document.querySelector('#search-box'),
  countryUl: document.querySelector('.country-list'),
  countryDiv: document.querySelector('.country-info'),
};
refs.searchBox.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));
export function countriesMarkupList(fields) {
  const markUpListResult = fields
    .map(({ flags: { svg }, name: { common } }) => {
      return `
        <li>
        <div class ='country-list__item'>
            <img src=${svg} width='30' height='20' class='country-list__icon'/>
                <p class='country-list__header'>
                    ${common}
                </p>
            </div>
        </li>`;
    })
    .join('');
  refs.countryUl.insertAdjacentHTML('beforeend', markUpListResult);
}

export function oneCountryMarkup([aloneCountry]) {
  const {
    flags: { svg },
    name: { common },
    capital,
    population,
    languages,
  } = aloneCountry;
  const aloneCountryResult = `
    <div class='country-info--wrapper'>
        <img src='${svg}' width ='90' height='60'/>
        <h2 class='country-info__header'>
        ${common}
        </h2>
    </div>    
            <ul class='country-info__list'>
                <li>
                    Capital: <span class='country-info__value'>${capital}</span>
                </li>
                <li>
                    Population: <span class='country-info__value'>${population}</span>
                </li>
                <li>
                    Languages: <span class='country-info__value'>${Object.values(
                      languages
                    ).join(', ')}</span>
                </li>
            </ul>
    `;
  refs.countryDiv.insertAdjacentHTML('beforeend', aloneCountryResult);
}

export function clearMarkup() {
  refs.countryUl.innerHTML = '';
  refs.countryDiv.innerHTML = '';
}
