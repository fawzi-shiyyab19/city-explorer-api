const express=require('express');
require('dotenv').config();
const cors=require('cors');
const axios =require('axios');
const data=express();
data.use(cors());

const weatherData =require('./data/weather.json');
const { application, response } = require('express');

data.get('/weather', async (req,res) => {
const searchQuery=req.query.searchQuery;
const lat =req.query.lat;
const lon =req.query.lon;
// const cityArr = weatherData.find(item =>item.city_name.toLowerCase() === searchQuery.toLowerCase())
const cityArr=await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`)
console.log(cityArr.data)

try {
    const cityData=cityArr.data.data.map(item => new Forecast(item));
    res.status(200).send(cityData)
} catch (error){
    errorHandle(error, res)
}
res.send({cityArr})
})

data.get('/movies',async(req,res) => {
    const searchQuery=req.query.searchQuery;
    const movieArr=await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`);
    try{
const movieData=movieArr.data.results.map(item => new Movie(item));
res.status(200).send(movieData)
    }catch(error){
errorHandle(error,res)
    }
})

data.get('*',(req,res) => {res.status(404).send('page not find')})
function errorHandle(error,res){
res.status(500).send({error: 'something error'})
}

class Forecast {
    constructor(day){
        this.date=day.valid_date;
        this.description=day.weather.description;
    }
}

class Movie{
    constructor(movie){
        this.title= movie.title;
    this.overview= movie.overview;
    this.average_votes= movie.vote_average;
    this.total_votes= movie.vote_count;
    this.image_url= movie.poster_path;
    this.popularity= movie.popularity;
    this.released_on= movie.released_on;
    }
}
data.listen(process.env.PORT, () => {
    console.log('server worked!')
})