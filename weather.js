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
    console.log(response.data);
  } catch (error) {}
  form.reset();
};
