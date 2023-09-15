const header = document.getElementById('header')
const weatherDescription = document.getElementById('weatherDescription')
const container = document.getElementById('container')
const forecastItems = document.getElementById('forecastItems')

const fetchWeather = () => { 
fetch("https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=fd582670436692008725c351eb4985b0")
    .then((response) => {
        return response.json()
    })

    .then((json) => {

        const sunRise = new Date (json.sys.sunrise * 1000);
        //making the time variables into strings to display the sunrise and sunset times into a string with hours and minutes in a "HH:MM" format
        let sunRiseHoursAndMinutes = String(sunRise.getHours()).padStart(2, '0') + ':' + String(sunRise.getMinutes()).padStart(2, '0');
        console.log(sunRise.getHours(), sunRise.getMinutes()); 

        const sunSet = new Date (json.sys.sunset * 1000);
        let sunSetHoursAndMinutes = String(sunSet.getHours()).padStart(2, '0') + ':' + String(sunSet.getMinutes()).padStart(2, '0');
        console.log(sunSetHoursAndMinutes);

        const weathers = json.weather
        weathers.map((weather) => {
        //This code block uses the map function to iterate over the elements in the weathers array. The weather variable represents each element (an object) in the array, containing information about the weather conditions.
        //Inside the map callback function, the code updates the content of the header element based on the weather data including description, temperature and sunset and sunrise time.
        header.innerHTML = `
        <h3>${weather.description} | ${(json.main.temp).toFixed(0)}°</h3>
        <h3>sunrise ${sunRiseHoursAndMinutes}</h3>
        <h3>sunset ${sunSetHoursAndMinutes}</h3>
        `

        //switch statement to perform different actions depending on the main property of the weather object (depending on weather description). 
        switch(weather.main) {
            case 'Clouds':  
                console.log('cloudy');
                weatherDescription.innerHTML += `
              <img src ="design/design2/icons/noun_Cloud_1188486.svg" alt = "cloud"/>
                <h1>The sky is grey in ${json.name}. </h1>
                `;   
            break;
        
            case 'Rain':  
                console.log('rainy')
                console.log(weather.description)    
                weatherDescription.innerHTML += `
                <img src = "design/design2/icons/noun_Umbrella_2030530.svg" alt = "umbrella"/> <h1>It's raining in ${json.name}. It's okay to stay inside!  </h1>
                `
            break;
        
            default:
                console.log('sunny')
                weatherDescription.innerHTML += `
                <img src ="design/design2/icons/noun_Sunglasses_2055147.svg" alt = "sunglasses"/><h1>The sky is crispy and clear in ${json.name}. </h1>
                </div>
                `
            break;
        }

    })
 })
}
fetchWeather();











const fetchForecast = () => {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=fd582670436692008725c351eb4985b0')
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        
        //filter the forecast API to only show weather at 12 for each day
        const filteredForecast = json.list.filter(item => item.dt_txt.includes('12:00')) //Håll koll på denna, fungerar beroend tid
        
        //getting the forecast days (name of the day)
        filteredForecast.forEach((day) => {
            const weekDay = new Date(day.dt * 1000).toLocaleDateString('en', {weekday: 'short'})

            const mainTemp = day.main.temp.toFixed(1)

            const weekWeatherType = day.weather.map((element) => element.description)
console.log(day.weather.map((el) => el.description));
            forecastItems.innerHTML += `
                <li>
                    <span>${weekDay}</span>
                    <span>${weekWeatherType}</span>
                    <span>${mainTemp}°</span>
                </li>
                `             
        })
       
    }) 
}

fetchForecast()
