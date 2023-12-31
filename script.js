const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');

const API_link = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_key = '&appid=77397392936546507cebe09ccc533f9f';
const API_units = '&units=metric';

const getWeather = () => {
	const city = input.value;
	const URL = API_link + city + API_key + API_units;

	axios
		.get(URL)
		.then((res) => {
			console.log(res.data);

			const temp = res.data.main.temp;
			const hum = res.data.main.humidity;
			const status = Object.assign({}, ...res.data.weather);
			console.log(status);

			cityName.textContent = res.data.name;
			temperature.textContent = Math.floor(temp) + ' C';
			humidity.textContent = hum + ' %';
			weather.textContent = status.main;

			warning.textContent = '';
			input.value = '';

			// TE POWALONE IFY
			if (status.id >= 200 && status.id < 300) {
				photo.setAttribute('src', './img/thunderstorm.png');
			} else if (status.id >= 300 && status.id < 400) {
				photo.setAttribute('src', './img/drizzle.png');
			} else if (status.id >= 500 && status.id < 600) {
				photo.setAttribute('src', './img/rain.png');
			} else if (status.id >= 600 && status.id < 700) {
				photo.setAttribute('src', './img/ice.png');
			} else if (status.id >= 700 && status.id < 800) {
				photo.setAttribute('src', './img/fog.png');
			} else if (status.id === 800) {
				photo.setAttribute('src', './img/sun.png');
			} else if (status.id > 800 && status.id < 900) {
				photo.setAttribute('src', './img/cloud.png');
			} else {
				photo.setAttribute('src', './img/unkown.png');
			}
			// KONIEC TYCH IFÓW------------------------------------------------------
		})
		.catch(() => (warning.textContent = 'Wpisz poprawną nazwę miasta'));
};

const enterButtonCheck = (e) => {
	if (e.key === 'Enter') {
		getWeather();
	}
};

input.addEventListener('keyup', enterButtonCheck);

button.addEventListener('click', getWeather);

getWeather();
