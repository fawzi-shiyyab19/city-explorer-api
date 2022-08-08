const axios = require('axios');

async function handleWeather(req, res) {
    console.log("handle weather call")
    const searchQuery = req.query.searchQuery;
    const lat = req.query.lat;
    const lon = req.query.lon;
    // const cityArr = weatherData.find(item =>item.city_name.toLowerCase() === searchQuery.toLowerCase())
    // const cityArr=await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`)
    // console.log(cityArr.data)

    try {
        const cityArr = await axios.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`)
        console.log(cityArr.data)
        const cityData = cityArr.data.data.map(item => new Forecast(item));
        res.status(200).send(cityData)
    } catch (error) {
        errorHandle(error, res)
    }
    // res.send({cityArr})
};
function errorHandle(error, res) {
    res.status(500).send({ error: 'something error' })
}

class Forecast {
    constructor(day) {
        this.date = day.valid_date;
        this.description = day.weather.description;
    }
}

module.exports = handleWeather;