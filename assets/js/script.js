console.log(apiKey)

var cityFormEl = document.querySelector("#cityForm");
var cityInputEl = document.querySelector("#city");
var ul = document.querySelector('ul');
var citiesArray = localStorage.getItem('cities') ? JSON.parse(localStorage.getItem('cities')) : [];

var liMaker = (text) => {
    for (var index = ul.childNodes.length - 1; index >= 0; index--) {
        if (text === ul.childNodes[index].textContent) {
            ul.removeChild(ul.childNodes[index])
        }
    }
    var li = document.createElement('li');
    li.textContent = text;
    li.classList = "list-group-item"
    ul.insertBefore(li, ul.childNodes[0]);
    while (ul.childNodes.length > 7) {
        ul.removeChild(ul.lastChild)
    }

    li.addEventListener("click", function () {
        console.log(text)
        getWeather(text)
        getForecast(text)
        liMaker(text)
        citiesArray = []

        for (var index = 0; index < ul.childNodes.length; index++) {
            citiesArray[index] = ul.childNodes[index].textContent
        }
        citiesArray.reverse()
        console.log(citiesArray)
        localStorage.setItem('cities', JSON.stringify(citiesArray));
    })
}

const api = {
    key: apiKey,
    base: "https://api.openweathermap.org/data/2.5/",
};

const api2 = {
    key: apiKey,
    base: "https://api.openweathermap.org/data/2.5/",
};

const api3 = {
    key: apiKey,
    base: "https://api.openweathermap.org/data/2.5/",
};

var weatherHere = function () {
    fetch(`${api.base}weather?q=Las&Vegas&units=imperial&APPID=${api.key}`)
        .then(function (weather) {
            // request was successful
            if (weather.ok) {
                return weather.json()
                    .then(displayVegas);
            } else {
                document.querySelector(".error").textContent = "Error: " + weather.statusText
                document.querySelector(".status").style = "display: block";
                setTimeout(function () {
                    document.querySelector(".status").style = "display: none";
                }, 2000);

            }
        })
        .catch(function (error) {

            document.querySelector(".error").textContent = "Unable to connect to Open Weather Map"
            document.querySelector(".status").style = "display: block";
            setTimeout(function () {
                document.querySelector(".status").style = "display: none";
            }, 2000);

        });
}

function displayVegas(weather) {
    console.log(weather);
    var cityName = document.querySelector("#cityName");
    cityName.innerHTML = "Las Vegas";

    var date = document.querySelector(".date");
    date.innerText = moment().format('l');

    var temp = document.querySelector(".temp");
    temp.innerHTML = `Temperature: ${Math.round(weather.main.temp)} <span>°f<span>`;

    var humidity = document.querySelector(".humidity");
    humidity.innerHTML = `Humidty: ${weather.main.humidity} <span>%</span>`;

    var windspeed = document.querySelector(".windspeed");
    windspeed.innerHTML = `Windspeed: ${weather.wind.speed} <span>m.p.h.</span>`;

    var icon = document.querySelector(".icon");
    console.log(weather.weather[0].description)
    console.log(weather.weather[0].icon)
    var iconData = weather.weather[0].icon
    icon.src = "http://openweathermap.org/img/w/" + iconData + ".png"

    var lon = weather.coord.lon
    var lat = weather.coord.lat
    uvFetch(lon, lat)
    var city = "Las Vegas"
    getForecast(city)
}

var getWeather = function (city) {
    fetch(`${api.base}weather?q=${city}&units=imperial&APPID=${api.key}`)
        .then(function (weather) {
            // request was successful
            if (weather.ok) {
                return weather.json()
                    .then(displayResults);
            } else {
                document.querySelector(".error").textContent = "Error: " + weather.statusText;
                document.querySelector(".status").style = "display: block";
                setTimeout(function () {
                    document.querySelector(".status").style = "display: none";
                }, 2000);
            }
        })
        .catch(function (error) {

            document.querySelector(".error").textContent = "Unable to connect to Open Weather Map";
            document.querySelector(".status").style = "display: block";
            setTimeout(function () {
                document.querySelector(".status").style = "display: none";
            }, 2000);

        });
}

function displayResults(weather) {
    console.log(weather);
    var cityName = document.querySelector("#cityName");
    cityName.innerHTML = `${weather.name}`;

    var date = document.querySelector(".date");
    date.innerText = moment().format('l');

    var temp = document.querySelector(".temp");
    temp.innerHTML = `Temperature: ${Math.round(weather.main.temp)} <span>°f<span>`;

    var humidity = document.querySelector(".humidity");
    humidity.innerHTML = `Humidty: ${weather.main.humidity} <span>%</span>`;

    var windspeed = document.querySelector(".windspeed");
    windspeed.innerHTML = `Windspeed: ${weather.wind.speed} <span>m.p.h.</span>`;

    var icon = document.querySelector(".icon");
    console.log(weather.weather[0].description)
    console.log(weather.weather[0].icon)
    var iconData = weather.weather[0].icon
    icon.src = "http://openweathermap.org/img/w/" + iconData + ".png"


    var lon = weather.coord.lon
    var lat = weather.coord.lat
    uvFetch((lat), (lon))
}

var uvFetch = function (lat, lon) {
    fetch(`${api2.base}uvi?lat=${lat}&lon=${lon}&APPID=${api2.key}`)
        .then(function (uvi) {
            console.log(uvi)
            // request was successful
            if (uvi.ok) {
                return uvi.json()
                    .then(uvDisplay);
            } else {
                document.querySelector(".error").textContent = uvi.statusText;
                document.querySelector(".status").style = "display: block";
                setTimeout(function () {
                    document.querySelector(".status").style = "display: none";
                }, 2000);


            }
        })
        .catch(function (error) {
            document.querySelector(".error").textContent = "Unable to connect to Open Weather Map.";
            document.querySelector(".status").style = "display: block";
            setTimeout(function () {
                document.querySelector(".status").style = "display: none";
            }, 2000);

        });
}

function uvDisplay(uvi) {
    console.log(uvi.value);

    var uvclass = document.querySelector(".uv-favorable")
    if (uvi.value < 3) {
        uvclass.classList.add('favorable')
        uvclass.classList.remove("moderate", "severe")
    }

    if (uvi.value >= 3 <= 7) {
        uvclass.classList.add('moderate')
        uvclass.classList.remove("favorable", "severe")
    }

    if (uvi.value > 7) {
        uvclass.classList.add('severe')
        uvclass.classList.remove("moderate", "favorable")
    }
    var uviSpan = document.querySelector(".uv-favorable");
    uviSpan.innerHTML = uvi.value;
}

var getForecast = function (city) {
    fetch(`${api3.base}forecast?q=${city}&units=imperial&APPID=${api3.key}`)
        .then((forecast) => {
            return forecast.json();
        })
        .then(displayForecast);
}

function displayForecast(forecast) {

    var date1 = document.querySelector(".date1");
    date1.innerText = moment().add(1, 'days').format('dddd, MMMM Do')

    var date2 = document.querySelector(".date2");
    date2.innerText = moment().add(2, 'days').format('dddd, MMMM Do')

    var date3 = document.querySelector(".date3");
    date3.innerText = moment().add(3, 'days').format('dddd, MMMM Do')

    var date4 = document.querySelector(".date4");
    date4.innerText = moment().add(4, 'days').format('dddd, MMMM Do')

    var date5 = document.querySelector(".date5");
    date5.innerText = moment().add(5, 'days').format('dddd, MMMM Do')

    var temp1 = document.querySelector(".temp1");
    temp1.innerHTML = Math.round(forecast.list[0].main.temp) + "<span>°f<span>"

    var temp2 = document.querySelector(".temp2");
    temp2.innerHTML = Math.round(forecast.list[1].main.temp) + "<span>°f<span>";

    var temp3 = document.querySelector(".temp3");
    temp3.innerHTML = Math.round(forecast.list[2].main.temp_min) + "<span>°f<span>"

    var temp4 = document.querySelector(".temp4");
    temp4.innerHTML = Math.round(forecast.list[3].main.temp) + "<span>°f<span>"

    var temp5 = document.querySelector(".temp5");
    temp5.innerHTML = Math.round(forecast.list[4].main.temp) + "<span>°f<span>"

    var humidity1 = document.querySelector(".humidity1");
    humidity1.innerHTML = forecast.list[0].main.humidity;

    var humidity2 = document.querySelector(".humidity2");
    humidity2.innerHTML = forecast.list[1].main.humidity;

    var humidity3 = document.querySelector(".humidity3");
    humidity3.innerHTML = forecast.list[2].main.humidity;

    var humidity4 = document.querySelector(".humidity4");
    humidity4.innerHTML = forecast.list[3].main.humidity;

    var humidity5 = document.querySelector(".humidity5");
    humidity5.innerHTML = forecast.list[4].main.humidity;

    var icon1 = document.querySelector(".icon1");
    var iconData1 = forecast.list[0].weather[0].icon
    icon1.src = "http://openweathermap.org/img/w/" + iconData1 + ".png"

    var icon2 = document.querySelector(".icon2");
    var iconData2 = forecast.list[1].weather[0].icon
    icon2.src = "http://openweathermap.org/img/w/" + iconData2 + ".png"

    var icon3 = document.querySelector(".icon3");
    var iconData3 = forecast.list[2].weather[0].icon
    icon3.src = "http://openweathermap.org/img/w/" + iconData3 + ".png"

    var icon4 = document.querySelector(".icon4");
    var iconData4 = forecast.list[3].weather[0].icon
    icon4.src = "http://openweathermap.org/img/w/" + iconData4 + ".png"

    var icon5 = document.querySelector(".icon5");
    var iconData5 = forecast.list[4].weather[0].icon
    icon5.src = "http://openweathermap.org/img/w/" + iconData5 + ".png"
}

var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value from input element
    var city = cityInputEl.value.trim();

    if (city) {

        liMaker(city);
        citiesArray = []

        for (var index = 0; index < ul.childNodes.length; index++) {
            citiesArray[index] = ul.childNodes[index].textContent
        }

        citiesArray.reverse()
        localStorage.setItem('cities', JSON.stringify(citiesArray));
        getWeather(city);
        getForecast(city);
        cityInputEl.value = "";
    } else {
        document.querySelector("#status").textContent = "Please enter a city.";
        document.querySelector(".status").style = "display: block";
        setTimeout(function () {
            document.querySelector(".status").style = "display: none";
        }, 2000);

    }
    console.log(event);
};

citiesArray.forEach(city => {
    liMaker(city);
});

cityFormEl.addEventListener("submit", formSubmitHandler);
weatherHere()






