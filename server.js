'use strict';
const express = require ('express');
const cors = require ('cors');
require('dotenv').config();
//---
const weather =require('./data/weather.json');
const PORT = process.env.PORT;
const server = express ();
server.use(cors());

server.get('/', (req,res)=>{
    res.send('home route')
})



server.get('/weather', handleWeather);


function handleWeather(request, response){
   
        let x = request.query.x;
        const result = weather.find((item) =>{
        
                if(item.city_name.toLowerCase()===x.toLowerCase()){
                    console.log('hello from inside')
                    
                    return item

                }
            
        })
    try{   
     const weatherArray = result.data.map(day => new Forecast(day))
     response.status(200).send(weatherArray.description)
    console.log(weatherArray)
    }catch(error){
        errorHandler(error, response)
    }          

        
       
 
    
}

 function Forecast(day){
     this.date=day.datetime
     this.description = day.weather.description 

 }

function errorHandler(error, response) {
    response.status(500).send(`something went wrong ==> ${error}`);
}

server.get('*',(rquest,response) =>{
    response.status(400).send('not found')
})

server.listen(PORT , ()=>{
    console.log(`Listrning to PORT ${PORT}`)
})