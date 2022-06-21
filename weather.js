const form = document.querySelector("section.top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector("span.msg");
const list = document.querySelector(".ajax-section .cities");

// localStorage.setItem(
//   "apiKey",
//   EncryptStringAES("b101316ac93eed9678889ac0f4d21741")
// );

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWeatherDataFromApi();
});

const getWeatherDataFromApi = async () => {
  //   alert("http request gone");
  let apikey = DecryptStringAES(localStorage.getItem("apiKey"));
  let inputVal = input.value;
  let unitType = "metric";
  let lang = "tr";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apikey}&units=${unitType}&lang=${lang}`;

  try {
    // const response = await fetch(url).then((response) => response.json());
    // console.log(response);
    const response = await axios(url);
    // console.log(response.data);
    const { name, main, weather, sys } = response.data;
    let iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    const createdLi = document.createElement("li");
    createdLi.classList.add("city");
    const createdLiinnerHTML = `<h2 class="city-name" data-name="${name}, ${
      sys.country
    }">
         <span>${name}</span>
         <sup>${sys.country}</sup>
    </h2>
    <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
    <figure>
        <img class="city-icon" src="${iconUrl}">
        <figcaption>${weather[0].description}</figcaption>
    </figure>`;
    createdLi.innerHTML = createdLiinnerHTML;
    //* appned vs. prepend
    list.appendChild(createdLi);
  } catch (error) {}
  form.reset();
};
