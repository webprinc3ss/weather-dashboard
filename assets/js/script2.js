var cityFormEl = document.querySelector("#cityForm");
var cityInputEl = document.querySelector("#city");




// Store  data.
function saveCitySearch(city) {

    data.push({ city });
    localStorage.setItem("cities", JSON.stringify(data));

}

// Do something with your data.
function loadCities() {

    data = JSON.parse(localStorage.getItem("cities")) || [];
    let i = 0;
    while (i < loadCities.length) {
        console.log(i);
        i++;

        var li = document.getElementsByTagName("li")
        li.innerHTML = data[i]
        li.classList = "list-group-item"
        document.getElementsByTagName("ul").appendChild(li)

    }

}

//     data.forEach((element) => {
//         var newli = $("<li>").appendTo("<ul>")
//         $(newli).innerHTML("cities[i])



//     })
// };





//List searches keep to five
//Search Code
// var cityInput = document.getElementById("city");
// var cityForm = document.getElementById("cityForm");

// var local1 = document.getElementById("local1");
// var local2 = document.getElementById("local2");
// var local3 = document.getElementById("local3");
// var local4 = document.getElementById("local4");
// var local5 = document.getElementById("local5");

// var savedLocations = ["", "", "", "", ""];

// cityForm.addEventListener("submit", function (event) {
//     for (let i = 0; i < savedLocations.length; i++) {
//         if (savedLocations[i] == "") {
//             savedLocations[i] = cityInput.value;
//         } else {
//             savedLocations[4] = savedLocations[3];
//             savedLocations[3] = savedLocations[2];
//             savedLocations[2] = savedLocations[1];
//             savedLocations[1] = savedLocations[0];
//             savedLocations[0] = cityInput.value;
//             break;
//         }
//     }

//     local1.innerHTML = `<a href="">${savedLocations[0]}</a>`;
//     local2.innerHTML = `<a href="">${savedLocations[1]}</a>`;
//     local3.innerHTML = `<a href="">${savedLocations[2]}</a>`;
//     local4.innerHTML = `<a href="">${savedLocations[3]}</a>`;
//     local5.innerHTML = `<a href="">${savedLocations[4]}</a>`;

//     event.preventDefault();
// });

var weatherHere = function () {
    fetch(`${api.base}weather?q=Las&Vegas&units=imperial&APPID=${api.key}`)
        .then((weather) => {
            return weather.json();


        })
        .then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    var cityName = document.querySelector("#cityName");
    cityName.innerHTML = "Something goes here";

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


    console.log(weather.coord.lon)
    var lon = weather.coord.lon
    console.log(lon)
    var lat = weather.coord.lat
    console.log(lat)
    uvFetch(lon, lat)
    var city = "Las Vegas"
    getForecast(city)
}


var getWeather = function (city) {
    fetch(`${api.base}weather?q=${city}&units=imperial&APPID=${api.key}`)
        .then((weather) => {
            return weather.json();


        })
        .then(displayResults);
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


    console.log(weather.coord.lon)
    var lon = weather.coord.lon
    console.log(lon)
    var lat = weather.coord.lat
    console.log(lat)
    uvFetch(lon, lat)

}

var uvFetch = function (lat, lon) {
    fetch(`${api2.base}uvi?lat=${lat}&lon=${lon}&APPID=${api2.key}`)
        .then((uvi) => {
            return uvi.json();
        })
        .then(uvDisplay);
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
    uviSpan.innerHTML = `${uvi.value}`;


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
        getWeather(city);
        getForecast(city);
        saveCities(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city.");
    }
    console.log(event);
};


cityFormEl.addEventListener("submit", formSubmitHandler);
weatherHere()







