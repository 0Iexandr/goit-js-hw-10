import './css/styles.css';
import Notiflix from 'notiflix';
import { fetchCountries } from './countries';

const DEBOUNCE_DELAY = 300;
const debounce = require('lodash.debounce');
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(handleInput, DEBOUNCE_DELAY));

function handleInput() {
  if (!input.value.trim().length) {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
    return;
  }

  fetchCountries(input.value.trim())
  .then(countries =>
    renderCountries(countries)
  )
  .catch(() => {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
  })
}

function renderCountries(countries) {
  let markup;
    if (countries.length > 10) {
    Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
    );
    } else if (countries.length > 2) {
    markup = countries.map(
        country =>
        `<li><img src='${country.flags.svg}' width="20"> ${country.name.official}</li>`
    );
    countryList.innerHTML = markup.join('');
    countryInfo.innerHTML = '';
    } else if (countries.length === 1) {
    markup = countries.map(
      country =>
        `<h1><img src='${country.flags.svg}' width="20"> ${country.name.official}</h1>
        <ul><li><b>Capital: </b>${country.capital.join(', ')}
        </li><li><b>Population: </b>${country.population}
        </li><li><b>Languages: </b>${Object.values(country.languages).join(', ')}</li></ul>`
    );
    countryInfo.innerHTML = markup.join('');
    countryList.innerHTML = '';
  }
}