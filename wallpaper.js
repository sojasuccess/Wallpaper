// Selecting the DOMs elements

const digitime = document.querySelector('.digitime');
const todaysDate = document.querySelector('.date');
const greetings = document.querySelector('.greeting');
// const weatherUi = document.querySelector('.weather-info');
const icon = document.getElementById('icon');
const cities = document.querySelector('.city');
const humidity = document.querySelector('.humidity');
const temp = document.querySelector('.temp');
const inspQuotes = document.querySelector('.quotes');




// first we set the background image function
const wallpaperBg = () => {
  // put all image in array so we can loop through and choose randomly
  const imageArray = [
    "url('./img/brittany.jpg') ",
    "url('./img//oslo.jpg') ",
    "url('./img/waterfall.jpg') ",
    "url('./img/woods.jpg') ",
    "url('./img/space.jpg')",
    "url('./img/barth-bailey-7f4WaNrR4uo-unsplash.jpg')",
    "url('./img/1.jpg')",
    "url('./img/2.jpg')",
    "url('./img/3.jpg')",
    "url('./img/4.jpg')",
    "url('./img/5.jpg')",
    "url('./img/6.jpg')",
    "url('./img/7.jpg')",
    "url('./img/8.jpg')",
    "url('./img/9.jpg')",
    "url('./img/10.jpg')",
    "url('./img/11.jpg')",
    "url('./img/12.jpg')",
    "url('./img/13.jpg')",
    "url('./img/14.jpg')",
    "url('./img/15.jpg')",
    "url('./img/16.jpg')",
    "url('./img/17.jpg')",
  ];
  // craeting the random method
  let randomImg = Math.floor(Math.random() * imageArray.length);

  // setting up the background imgage
   document.body.style.backgroundImage = imageArray[randomImg];
   

};
wallpaperBg();
setInterval(wallpaperBg, 3600000)



// FROM HERE WE WORK ON THE TIME PIECE
// function to get the current time
const clock = () => {
  const now = new Date;
  const nowHour = now.getHours();
  const nowMinutes = now.getMinutes();
  const nowSeconds = now.getSeconds();
// console.log(nowSeconds)

// get and display todays date in the UI
  const theDate = now.toDateString();
  // console.log(theDate)
  todaysDate.innerHTML = `<span>${theDate}</span>`;
  // display the time in the UI
  digitime.innerHTML = `
    <span>${nowHour} :</span>
    <span>${nowMinutes} :</span>
    <span>${nowSeconds}</span>

  `;

   let greeting = nowHour < 12 ? 'Good Morning Soja' : nowHour < 18 ? 'Good Afternoon Soja' : 'Good Evening Soja';
   greetings.innerHTML = `<span>${greeting}</span>`
};
clock();
setInterval(clock, 1000)



// FROM HERE WE MAKE THE API CALL TO FETCH THE CITY AND ITS WEATHER CONDITIONS

const key = 'vAIeRZeALs5HJEcJGh7xNhkZ6jXzgz0o';



// we fetch the city first and use the city id to fetch the weather
// FETCHING THE WATHER
const getWeather = async (id) => {
  const base = 'http://dataservice.accuweather.com/currentconditions/v1/';

  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();
  return data[0]
};
// getWeather('254946');


// making api call to get the city we want weather info 
const getCity = async() => {
  const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
  const query = `?apikey=${key}&q=${'oslo'}`;
  
  const response = await fetch(base + query);
  const data = await response.json();
  return data[0];
};

// we call the city here and pass in the Key provided in the city info, 
// so as to use it to call the weather usinf promise
getCity().then(data => {
  return getWeather(data.Key)
});



  

// putting out the datas for both city and weather requests
const updateCity = async () => {
  const cityDets = await getCity();
  const weather = await getWeather(cityDets.Key);
  console.log(weather)
  // return { cityDets, weather };
  const iconSrc = `/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);
  cities.innerHTML = `${cityDets.EnglishName}`;
  humidity.innerHTML = `${weather.WeatherText}`;
  temp.innerHTML = `${weather.Temperature.Metric.Value}`

  
}
updateCity('oslo');


function getQuotes () {
  fetch("https://type.fit/api/quotes")
  .then(response =>  {return response.json()})
  .then((data) => {
    let randomQuotes = Math.floor(Math.random() * data.length);
    // console.log(data[randomQuotes].text);
    inspQuotes.innerHTML = `
      <span>${data[randomQuotes].text}</span>
    `
    inspQuotes.addEventListener('click', getQuotes)
  })
}
setInterval(getQuotes, 60000)
getQuotes();



// fetch("https://type.fit/api/quotes")
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });