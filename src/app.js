const express = require("express");
const hbs = require("hbs");
const path = require("path");

const app = express();
const weatherData = require("../utils/weatherData");

const publicPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

app.set("view engine","hbs");//IT tell which view engine is used
app.set("views",viewsPath);//It tell that i am created a views and used it 
hbs.registerPartials(partialsPath);//HERE i actually tell the hbs that i am using a partials
app.use(express.static(publicPath));//Now Main part i tell the express that i used to link my static website

const port =  process.env.PORT || 5000;

app.get("/",(req,res) =>{
  res.render("index",{title: "Weather APP"});

});

app.get("/weather",(req,res) =>{
    if(!req.query.address){
        return res.send("Address is required");
    }
   weatherData(req.query.address,(error,result) =>{
        if (error){
            return res.send(error);
        }
        res.send(result);
   });

});

app.get("*" ,(req,res) =>{
      res.render("404",{title: "Page not found"});
});

app.listen(port,() =>{
    console.log("Connection successful"+ port);
});

