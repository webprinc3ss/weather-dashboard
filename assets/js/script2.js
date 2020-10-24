var cityFormEl = document.querySelector("#cityForm");
var cityInputEl = document.querySelector("#city");



//List searches keep to five
//Search Code
var cityInput = document.getElementById("city");
var cityForm = document.getElementById("cityForm");

var local1 = document.getElementById("local1");
var local2 = document.getElementById("local2");
var local3 = document.getElementById("local3");
var local4 = document.getElementById("local4");
var local5 = document.getElementById("local5");

var savedLocations = ["", "", "", "", ""];

cityForm.addEventListener("submit", function (event) {
    for (let i = 0; i < savedLocations.length; i++) {
        if (savedLocations[i] == "") {
            savedLocations[i] = cityInput.value;
        } else {
            savedLocations[4] = savedLocations[3];
            savedLocations[3] = savedLocations[2];
            savedLocations[2] = savedLocations[1];
            savedLocations[1] = savedLocations[0];
            savedLocations[0] = cityInput.value;
            break;
        }
    }

    local1.innerHTML = `<a href="">${savedLocations[0]}</a>`;
    local2.innerHTML = `<a href="">${savedLocations[1]}</a>`;
    local3.innerHTML = `<a href="">${savedLocations[2]}</a>`;
    local4.innerHTML = `<a href="">${savedLocations[3]}</a>`;
    local5.innerHTML = `<a href="">${savedLocations[4]}</a>`;

    event.preventDefault();
});


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
    if (uvi.value > 3) {
        uvclass.classList.add('favorable')
    }

    if (uvi.value <= 3 <= 7) {
        uvclass.classList.add('moderate')
    }

    if (uvi.value > 7) {
        uvclass.classList.add('severe')
    }
    var uviSpan = document.querySelector(".uv-favorable");
    uviSpan.innerHTML = `${uvi.value}`;
}



var formSubmitHandler = function (event) {
    event.preventDefault();
    // get value from input element
    var city = cityInputEl.value.trim();

    if (city) {
        getWeather(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city.");
    }
    console.log(event);
};


cityFormEl.addEventListener("submit", formSubmitHandler);





// weather.description = `${ weather[0].description } `
// console.log(weather.description)




// var icon = document.querySelector(".icon");
// icon.src = "http://openweathermap.org/img/w/" + `${ weather.icon } `;
//console.log(weather[0].icon)





// Finally tack on the prefix.


//$(".icon").html("<img src='http://openweathermap.org/img/w/" + weather[0].icon + ".png");


// var icon = document.querySelector(".icon");
// icon.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

// icon.src = `http://openweathermap.org/img/w/${weather.[0].iconID}.png`;
// console.log(`${ weather.[0].iconID } `)


//http://openweathermap.org/img/wn/03d@2x.png
// let weather_el = document.querySelector(".current .weather");
// weather_el.innerText = weather.weather[0].main;




//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// var icon = document.querySelector(".icon");
// var gifImg = document.createElement("img");
// gifImg.setAttribute("src", data.weather.icon);
// icon.appendChild(gifImg)


// Search for city
//results appear in the main panel
// var getWeather = function (city) {

//     // make a request to the url
//     fetch(apiUrl)
//         .then(function (response) {
//             // request was successful
//             if (response.ok) {
//                 response.json().then(function (data) {

//                     if (city === 0) {
//                         error.textContent = "No city found.";
//                         return;
//                     }



//                     var icon = document.querySelector(".icon");
//                     var gifImg = document.createElement("img");
//                     gifImg.setAttribute("src", data.weather.icon);
//                     icon.appendChild(gifImg)



//                 });
//             } else {
//                 alert("Error: " + response.statusText);
//             }
//         })
//         .catch(function (error) {
//             // Notice this `.catch()` getting chained onto the end of the `.then()` method
//             alert("Unable to connect to Open Weather");
//         });
// };

//Save City data to local storage and make clickable that they show up again in the middle

    // if (weather.description.includes("rain")) {
    //     icon.src = "https://img.icons8.com/color/48/000000/snow.png";
    // }
    // if (`${weather.Array(1).id} `.includes("sun")) {
    //     icon.src = "https://img.icons8.com/color/48/000000/sun.png";
    // }
    // if (`${weather.id} `.includes("partly cloudy")) {
    //     icon.src = "https://img.icons8.com/color/48/000000/partly-cloudy-rain.png";
    // }
    // if (`${weather.id} `.includes("rain")) {
    //     icon.src = "https://img.icons8.com/color/48/000000/rain.png";
    // }





