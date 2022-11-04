import './scss/index.scss'
import { formatTime } from './utils'
import { setData } from './right';

const OWAPI = "1b8bbebb4b1bf62f09899945ed613fc9"

async function GET_Current_Weather_Data(lat, lon) {
    const call_weather_meteo = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,precipitation,weathercode,surface_pressure,windspeed_10m,winddirection_10m,shortwave_radiation,direct_radiation,diffuse_radiation,direct_normal_irradiance,terrestrial_radiation&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset&current_weather=true&timeformat=unixtime&timezone=auto`
    const response_weather_meteo = await fetch(call_weather_meteo);
    const data_weather_meteo = await response_weather_meteo.json();

    const call_weather_ow = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OWAPI}`
    const response_weather_ow = await fetch(call_weather_ow);
    const data_weather_ow = await response_weather_ow.json();
    setData(data_weather_meteo, data_weather_ow);
}

async function getData () {
    GET_Current_Weather_Data(28.7041, 77.1025);
    if (navigator.geolocation) {
        await navigator.geolocation.getCurrentPosition((sucess) => {
            GET_Current_Weather_Data(sucess.coords.latitude, sucess.coords.longitude);
        }, (err) => {
            GET_Current_Weather_Data(28.7041, 77.1025);
        })
    } else {
        GET_Current_Weather_Data(28.7041, 77.1025);
    }
}
window.onload = async function() {
    document.getElementById("Time").innerHTML = formatTime(new Date());
    await getData();
}