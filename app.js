const { response } = require("express");
const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));//

app.get("/", function(req,res){

    res.sendFile(__dirname + "/index.html");

})
app.post("/",function(req,res){
   // console.log(req.body.cityName);
    const city = req.body.cityName;
    //const apikey = 7af4afac82756a5e63beb6eff5501708;


    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +city+"&appid=7af4afac82756a5e63beb6eff5501708";

   https.get(url , function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
        const weatherData = JSON.parse(data)
        const temperature = weatherData.main.temp
        const description = weatherData.weather[0].description
        const iconid = weatherData.weather[0].icon
        const imageurl = "https://openweathermap.org/img/wn/"+iconid+"@2x.png";
        console.log(temperature);
        console.log ("-----json ----");
        console.log(weatherData);
        res.write("<h1> The temperature in "+city+" is " + temperature+ " degrees kelvin</h1>");
        res.write("<br> Weather description : "+ description);
        res.write("<img src = " +imageurl+">")
        res.send();
    })

     console.log(response.statusCode);
   })
    


})


app.listen(3000, function(){
    console.log("server is running on port 3000");
})