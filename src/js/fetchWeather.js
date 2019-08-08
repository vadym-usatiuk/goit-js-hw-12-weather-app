const fetchWeather = query => {
  const options = {
    baseUrl: 'https://api.apixu.com/v1/current.json',
    apiKey: '5b3041f515dc4b54b04142808191107',
  };

  const requestParams = `?key=${options.apiKey}&q=${query}`;

  return fetch(options.baseUrl + requestParams).then(responce => responce.json());
};
export default fetchWeather;
