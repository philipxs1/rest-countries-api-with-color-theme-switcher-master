const toggle = document.querySelector('.mode-toggle-text');
const rootElm = document.documentElement;
const infoCard = document.querySelector('.country-info');

const backBtn = document.querySelector('.back-btn');

let allCountries;

let localS = localStorage.getItem('theme'),
  themeToSet = localS;

if (!localS) {
  themeToSet = window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function renderCurrency(info) {
  for (let currencyCode in info) {
    if (info.hasOwnProperty(currencyCode)) {
      let currency = info[currencyCode];
      return currency.name;
    }
  }
}

function renderLang(info) {
  let languagesObject = info;
  let languagesArray = Object.values(languagesObject); // Extract language names into an array
  let languagesString = languagesArray.join(', '); // Join language names with commas

  return languagesString;
}

function renderBorders(country) {
  let html = '';
  if (!country.borders) {
    html += `<li> no border countries.</li>`;
  } else {
    let borders = country.borders;
    borders.forEach((element) => {
      html += `
      <li>${element}</li>`;
    });
  }
  return html;
}

function renderCountries() {
  const country = JSON.parse(localStorage.getItem('country-details'))[0];

  const html = ` 
<div id="card-info">
<div class="left-info">
    <img src="${country.flags.png}" alt="flag">
</div>
<div class="right-info">
    <div class="top">
        <h1 class="title">${country.name.common}</h1>
    </div>
    <div class="middle">
        <div class="middle-left">
            <ul>
                <li>Native Name: <span>${
                  country.name.nativeName.official
                }</span></li>
                <li>Population: <span> ${country.population}</span></li>
                <li>Region: <span>${country.region}</span></li>
                <li>Sub Region: <span>${country.subregion}</span></li>
                <li>Capital: <span>${country.capital}</span></li>
            </ul>
        </div>
        <div class="middle-right">
            <ul>
                <li>Top Level Domain: <span>${country.tld[0]}</span></li>
                <li>Currencies: <span>${renderCurrency(
                  country.currencies
                )}</span></li>
                <li>Languages: <span>${renderLang(
                  country.languages
                )}</span></li>
            </ul>
        </div>
    </div>
    <div class="bottom">
        <p>Border Countries: </p>
        <ul class="border-list">
        ${renderBorders(country)}
    </ul>

    </div>


</div>


</div>
`;
  infoCard.insertAdjacentHTML('beforeend', html);
}

document.addEventListener('DOMContentLoaded', renderCountries);

backBtn.addEventListener('click', () => {
  window.location = 'index.html';
});

document.documentElement.setAttribute('data-theme', themeToSet);
themeToSet === 'light'
  ? (toggle.textContent = 'Dark Mode')
  : (toggle.textContent = 'Light Mode');

const switchTheme = () => {
  let dataTheme = rootElm.getAttribute('data-theme'),
    newTheme;

  newTheme = dataTheme === 'light' ? 'dark' : 'light';
  rootElm.setAttribute('data-theme', newTheme);

  if (newTheme === 'light') {
    toggle.textContent = 'Dark Mode';
  } else {
    toggle.textContent = 'Light Mode';
  }

  //set local storage item
  localStorage.setItem('theme', newTheme);
};

const button = document.querySelector('.mode-toggle');
button.addEventListener('click', switchTheme);
