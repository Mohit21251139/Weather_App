

let weatherApi = "/weather";

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weatherIcon = document.querySelector(".weatherIcon i");
const weatherCondition = document.querySelector(".weatherCondition");
const temp = document.querySelector(".temperature span");
const  place = document.querySelector(".place");
const date = document.querySelector(".date");

const currDate = new Date();
const option  = {month: "long"};
const monthName = currDate.toLocaleString("en-US",option);
date.textContent  = currDate.getDate() + "," + monthName; 

if ("geolocation" in navigator){
    place.textContent = "Loading...";
    navigator.geolocation.getCurrentPosition(
        function (position){
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`;
           fetch(apiUrl).then((response) =>response.json()).then((data) =>{
            if (data && data.address && data.address.city){
                const city = data.address.city;
                showData(city);
            }else{
               console.log("City not found");
            }
           }).catch((error) =>{
              console.log(error);
           })
        },function(error){
              console.log(error.message);
        }
    )
}
else{
   console.log("Geolocation is not available");
}

weatherForm.addEventListener("submit",(e) =>{
    e.preventDefault();
   
    place.textContent = "Loading...";
    weatherIcon.className = "";
    temp.textContent = "";
    weatherCondition.textContent = "";

    showData(search.value);
});

function showData (city){
    getweatherData(city,(result) =>{
        // console.log (result);
        if (result.cod == 200){
            if (result.weather[0].description =="rain" ||result.weather[0].description == "fog" || result.weather[0].description == "dust" || result.weather[0].description =="wind" ){
                 weatherIcon.className = "wi wi-day-"+result.weather[0].description;
            }
            else{
                weatherIcon.className = "wi wi-day-cloudy";
            }
            place.textContent = result?.name;
            temp.textContent = (result?.main?.temp -273.5).toFixed(2)+String.fromCharCode(176);
            weatherCondition.textContent = result?.weather[0]?.description?.toUpperCase();
        }
        else{
            place.textContent = "City not found";
        }
    });
};
function getweatherData(city,callback){
    const locationApi = weatherApi + "?address=" +city;

    fetch(locationApi).then((response) =>{
        response.json().then((response) =>{
            callback(response);
        })
    })
}

