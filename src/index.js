import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { debounce } from 'lodash';
import Notiflix from 'notiflix';

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const DEBOUNCE_DELAY = 300;

input.addEventListener('input',
    debounce(e => {
        const trimValue = input.value.trim();
        clearHtml();
        if (trimValue !== '') {
            fetchCountries(trimValue).then(data => {

                if (data.length > 10) {
                    Notiflix.Notify.info(
                        'Too many matches found. Please enter a more specific name.'
                    );
                } else if (data.length === 0) {
                    Notiflix.Notify.failure('Oops, there is no country with that name');
                } else if (data.length >= 2 && data.length <= 10) {
                    renderCountryList(data);
                } else if (data.length === 1) {
                    renderOneCountry(data);
                }
            });
        }
    }, DEBOUNCE_DELAY)
);

function clearHtml() {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
};

function renderCountryList(countries) {
    const markup = countries
        .map(country => {
            return `<li>
            <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20"><b>${country.name.official}</b>
            </li>`;
        })
        .join('');
    countryList.innerHTML = markup;
};

function renderOneCountry(countries) {
    const markup = countries
        .map(country => {
            return `<li>
            <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="30" hight="20">
            <b>${country.name.official}</b>
            <p><b>Capital</b>: ${country.capital}</p>
            <p><b>Population</b>: ${country.population}</p>
            <p><b>Languages</b>: ${Object.values(country.languages)} </p>
            </li>`;
        })
        .join('');
    countryList.innerHTML = markup;
};

