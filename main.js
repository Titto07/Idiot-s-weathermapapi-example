const axios = require('axios').default;
const fs = require('fs')

lat = 0 //Your address by Latitude and Longitude
lon = 0 //Here's a link that you can type in: latlong.net
api_key = "f280e80a843f4ed08091ea940f4ce729" //you can generate your own key at https://openweathermap.org by signing up and confirming email address or just use my key
link = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric` // you can open this link if you see things too difficult.

// use axios.get as a fuction to get information, 
axios.get(link).then(data => {

  // variables
 let unix_timestamp = `${data.data.dt}`
var date = new Date(unix_timestamp * 1000);
var hours = date.getHours();
var minutes = "0" + date.getMinutes();
var seconds = "0" + date.getSeconds();
var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);   
var cloudy_condition,rain_condition;

    // translation
    if (data.data.clouds.all > 70) {cloudy_condition=('Heavy clouds')}
    else if (data.data.clouds.all > 50 && data.data.clouds.all < 70) cloudy_condition=(`Beautiful clouds`)
    else {cloudy_condition=('Probably Sky full of stars or empty black lonely space')}

    if(data.data.main.humidity === 100)
     {rain_condition = 'raining'} 
    else {rain_condition = 'probably not raining'} 

if(data.data.weather.main === undefined) {
    data.data.weather.main = cloudy_condition + ', ' + rain_condition
}

    let messagepubclied = `
    
    ================Weather in ${data.data.name}================
    <>Overall weather's condition: ${data.data.weather.main}| ${formattedTime}
     + Description:: ${data.data.weather.description}
     + Data is collected at: ${data.data.name} ,${data.data.sys.country}, timezone: ${data.data.timezone/3600}
    <>Temperature: ${data.data.main.temp} oC // Feels like:: ${data.data.main.feels_like} oC
    <>Humidity: ${data.data.main.humidity} %
    <>visibility: ${data.data.visibility}m
    <>Rain volume:${data.data.rain}mm
    <>Wind:
     + Speed: ${data.data.wind.speed/3.6} km|h
     + Wind direction: ${data.data.wind.deg}
     + Heavy wind: ${data.data.wind.gust/3.6} km|h 
    <>Cloud: ${data.data.clouds.all} %
    `

    /// OUTPUT
    console.log(messagepubclied);
    },rejecteddata => {
        console.log('----------------------------------------REJECT DATA----------------------------------------')
        console.log(rejecteddata)
})


// HOPE THINGS WORK OK, SORRY I'M JUST A NOOB AT WRITING CODE IF YOU HAVE ANY PROBLEM WITH THE CODE PLEASE EMAIL ME: tpgbach7@gmail.com, THANKS A LOT.
// WELL, THE API WEBSITE HAS MORE, CHECK IT OUT HERE: https://openweathermap.org/api/one-call-3
