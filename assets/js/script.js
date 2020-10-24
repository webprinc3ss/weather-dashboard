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




// Search for city
//results appear in the main panel
var getWeather = function (city) {
    // format the github api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=ec337b6ddcef697761a71f0466d910b3";
    //test api https://api.openweathermap.org/data/2.5/weather?q=Tarzana&units=imperial&appid=ec337b6ddcef697761a71f0466d910b3
    // make a request to the url
    fetch(apiUrl)
        .then(function (response) {
            // request was successful
            if (response.ok) {
                response.json().then(function (data) {

                    if (city === 0) {
                        error.textContent = "No city found.";
                        return;
                    }

                    // var data = response
                    // var myArray = Object.values(data);

                    console.log("data is: " + response.value);
                    //Clear container from old
                    //var container = document.querySelector(".card-body")
                    // container.text = "";


                    //Fill in weather for today (top of main section)
                    console.log(data.name.value);

                    var cityName = document.getElementById("cityName");
                    cityName.innerHTML = data.name.value
                    console.log(data.name.value);

                    var date = document.querySelector(".cityName");
                    date.innerHTML = moment().format('l');

                    var icon = document.querySelector(".icon");
                    var gifImg = document.createElement("img");
                    gifImg.setAttribute("src", data.weather.icon);
                    icon.appendChild(gifImg)


                    // icon.innerHTML = data.weather.icon.value

                    var temp = document.querySelector(".temp");
                    temp.innerHTML = data.main.temp.value

                    var humidity = document.querySelector(".humidity");
                    humidity.innerHTML = data.humidity.value

                    var windspeed = document.querySelector(".windspeed");
                    windspeed.innerHTML = data.speed.value


                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            // Notice this `.catch()` getting chained onto the end of the `.then()` method
            alert("Unable to connect to Open Weather");
        });
};

//Save City data to local storage and make clickable that they show up again in the middle


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


// var displayWeather = function (response) {

//     // var uv = data.current.uvi.value
//     // console.log(uv);
//     //class=uv-favorable


// };

// var cityFormEl = document.querySelector("#cityForm");
// var cityInputEl = document.querySelector("#cityName");
// api.openweathermap.org / data / 2.5 / forecast ? q = "Las_Vegas" & appid="ec337b6ddcef697761a71f0466d910b3"


//Test: https://api.openweathermap.org/data/2.5/weather?id=6167865&appid=ec337b6ddcef697761a71f0466d910b3

//https://api.openweathermap.org/data/2.5/weather?q=Tarzana=imperial&appid=ec337b6ddcef697761a71f0466d910b3

//https://api.openweathermap.org/data/2.5/onecall?q=Las_Vegas,NV&appid=6167865&appid=ec337b6ddcef697761a71f0466d910b3

//https://api.openweathermap.org/data/2.5/weather?id=6167865&appid=ec337b6ddcef697761a71f0466d910b3


//http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=ec337b6ddcef697761a71f0466d910b3

//http://api.openweathermap.org/data/2.5/uvi/forecast?q=Tarzana&units=imperial&APPID=ec337b6ddcef697761a71f0466d910b3


    // var cityName = city
    // console.log(cityName);
    // var date = moment().format('l');
    // console.log(date);
    // var temp = data.main.temp.value
    // console.log(temp);
    // var humidity = data.main.humidity.value
    // console.log(humidity);
    // var wind = data.wind.speed.value
    // console.log(windspeed);


    // container.innerHTML = "";




    // $("#cityName").append(cityName).innerHTML
    // $(".date").append(date).innerHTML
    // $(".temp").append(temp).innerHTML
    // $(".humidity").append(humidity).innerHTML
    // $(".windspeed").append(windspeed).innerHTML
    // $(".uv").append(uv).innerHTML