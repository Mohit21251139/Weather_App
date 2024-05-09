const request = require("request");

const openweathermap = {
    BASE_URL:"https://api.openweathermap.org/data/2.5/weather?q=",
    SECRET_KEY:"7fe8f8c369091364fc4cd14b28007386",
}

const weatherData = (address, callback) =>{
   const url = openweathermap.BASE_URL + encodeURIComponent(address)+ "&APPID=" + openweathermap.SECRET_KEY;

   request({url,json:true}, (error,data) =>{
    if (error){
        callback(true,"Unable to fetch the weather data"+ error);
    }
    callback(false,data?.body);
   })
};

module.exports = weatherData;
