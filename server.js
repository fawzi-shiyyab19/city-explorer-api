const express=require('express');
require('dotenv').config();
const cors=require('cors');
const data=express();
data.use(cors());

const weatherData =require('./data/weather.json');
const { application, response } = require('express');

data.get('/weather',(req,res) => {
const searchQuery=req.query.searchQuery;
const lat =req.query.lat;
const lon =req.query.lon;
const cityArr = weatherData.find(item =>item.city_name.toLowerCase() === searchQuery.toLowerCase())
try {
    const cityData=cityArr.data.map(item => new Forecast(item));
    res.status(200).send(cityData)
} catch (error){
    errorHandle(error, res)
}
res.send({cityArr})
})
application.get('*',(req,res) => {res.status(404).send('page not find')})
function errorHandle(error,res){
res.status(500).send({error: 'something error'})
}

class Forecast {
    constructor(day){
        this.date=day.valid_date;
        this.description=day.weather.description;
    }
}
data.listen(process.env.PORT, () => {
    console.log('server worked!')
})