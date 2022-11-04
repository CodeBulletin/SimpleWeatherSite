import { formatTime, timeCmpW } from './utils'

export function setData(data, edata) {

    document.getElementById("Location").innerHTML = edata.name;

    document.getElementById("Country").innerHTML = new Intl.DisplayNames(
        ['en'], {type: 'region'}
    ).of(edata.sys.country);

    document.getElementById("current").innerHTML = Math.round((edata.main.temp - 273.15)*10) / 10;
    document.getElementById("min").innerHTML = data.daily.temperature_2m_min[0];
    document.getElementById("max").innerHTML = data.daily.temperature_2m_max[0];
    document.getElementById("feel").innerHTML = Math.round((edata.main.feels_like - 273.15)*10) / 10;

    document.getElementById("weather_icon").src = `http://openweathermap.org/img/wn/${edata.weather[0].icon}@2x.png`
    document.getElementById("weather").innerHTML = edata.weather[0].main;

    document.getElementById("sunrise").innerHTML = formatTime(new Date(edata.sys.sunrise * 1000));
    document.getElementById("sunset").innerHTML = formatTime(new Date(edata.sys.sunset * 1000));

    document.getElementById("sunrise_t").innerHTML = timeCmpW(edata.sys.sunrise);
    document.getElementById("sunset_t").innerHTML = timeCmpW(edata.sys.sunset);

    let hm = Array.from(document.getElementsByClassName("humiditymeter"));
    let hp = Array.from(document.getElementsByClassName("humiditypercentage"));
    let ht = Array.from(document.getElementsByClassName("humiditytime"));

    let idx = 0;
    let t = Date.now();

    for (let i in data.hourly.time) {
        if (data.hourly.time[i] * 1000 >= t) break;
        idx += 1;
    }


    for(let i = 0; i < hm.length; i++) {
        hm[i].style.setProperty("--width", data.hourly.relativehumidity_2m[idx + i].toString() + "%");
        hp[i].innerHTML = data.hourly.relativehumidity_2m[idx + i].toString() + "%"
        ht[i].innerHTML = formatTime(new Date(data.hourly.time[idx + i] * 1000))
    }
}