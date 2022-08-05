const express=require('express');
require('dotenv').config();
const cors=require('cors');
const data=express();
data.use(cors());
const {handleWeather}=require('./module/weather');
const {handleMovie}=require('./module/movie')
const weatherData =require('./data/weather.json');
const { application, response } = require('express');

data.get('/weather',handleWeather);

data.get('/movie',handleMovie);

data.get('*',(req,res) => {res.status(404).send('page not find')})
function errorHandle(error,res){
res.status(500).send({error: 'something error'})
}


data.listen(process.env.PORT, () => {
    console.log('server worked!')
})

