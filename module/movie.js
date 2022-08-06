const axios =require('axios');
const moviesCache = {};

async function handleMovie (req,res)  {

    const searchQuery=req.query.searchQuery;
    const movieArr=await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`);
    if (moviesCache[cityName] !== undefined) {
                console.log('comes from Our Server');
                response.status(200).send(moviesCache[cityName]);
            } else {
                    const moviesData = await axios.get(url);
                    const arrayOfMoviesData = moviesData.data.results.map(item => {
                        return new MovieApi(item);
                    });
                    console.log('comes from Outer API');
                    moviesCache[cityName] = arrayOfMoviesData;
                    response.status(200).send(arrayOfMoviesData);
            };
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
module.exports={handleMovie};



