import './styles.css';
import PNotify from '../node_modules/pnotify/dist/es/PNotify';
import PNotifyStyleMaterial from 'pnotify/dist/es/PNotifyStyleMaterial.js';
import getGeoPosition from './js/getGeoPosition';
import fetchWeather from './js/fetchWeather';
PNotify.defaults.styling = 'material';

const refs = {
  form: document.querySelector('#search-form'),
  location: document.querySelector('[data-field="location"]'),
  temperature: document.querySelector('[data-field="temp"]'),
  humidity: document.querySelector('[data-field="humidity"]'),
  wind: document.querySelector('[data-field="wind"]'),
  conditions: document.querySelector('[data-field="conditions"]'),
  icon: document.querySelector('.icon'),
};
getGeoPosition()
  .then(position => {
    const coords = position.coords;
    return fetchWeather(`${coords.latitude},${coords.longitude}`);
  })
  .then(responce => rendering(responce))
  .catch(() => {
    PNotify.error({
      text: 'Нет прав доступа к геопозиции, используйте поиск по имени города.',
    });
  });

refs.form.addEventListener('submit', formHandler);

function formHandler(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const input = form.city;
  const query = input.value;
  fetchWeather(query)
    .then(responce => rendering(responce))
    .catch(error => console.error(error));
  input.value = '';
}

function rendering(obj) {
  refs.icon.setAttribute('alt', obj.current.condition.text);
  refs.icon.setAttribute('src', `https:${obj.current.condition.icon}`);
  addContent(refs.location, obj.location.name);
  addContent(refs.temperature, `${obj.current.temp_c}`);
  addContent(refs.humidity, `${obj.current.humidity} %`);
  addContent(refs.wind, `${obj.current.wind_kph} kph`);
  addContent(refs.conditions, obj.current.condition.text);
  document.querySelector('#weather').classList.remove('is-hidden');
}

function addContent(ref, content) {
  ref.textContent = content;
}
