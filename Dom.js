const citySearch = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".weather-icon");
const updateUI = ({ cityDetails, weather }) => {
  details.innerHTML = `<h2 class="city-name">${cityDetails.EnglishName}</h2>
                       <div class="city-cond">${weather.WeatherText}</div>
                       <div class="temp">
					   <span>TEMP ${weather.Temperature.Metric.Value}&deg;C</span>
					   </div>`;
  //removing display none
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }

  let iconSRC = `img/icons/${weather.WeatherIcon}.svg`;

  icon.innerHTML = `<img src="${iconSRC}" alt="weaher icon"/>`;

  return weather.IsDayTime
    ? (time.src = "img/day.svg")
    : (time.src = "img/night.svg");
};
const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return {
    cityDetails,
    weather,
  };
};

citySearch.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = citySearch.city.value.trim();
  citySearch.reset();

  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
