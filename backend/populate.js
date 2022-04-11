const { default: axios } = require("axios");
const { getRepository } = require("typeorm");
const Movie = require("./entities/movie");

const TMDB_API_URL =
  "https://api.themoviedb.org/3/movie/popular?api_key=522d421671cf75c2cba341597d86403a&language=en-US";

const populate = () => {
  const movieRepository = getRepository(Movie);
  var movies = [];
  axios.get(TMDB_API_URL).then((res) => {
    movies = res.data.results;
    const movieEntities = movieRepository.create(movies);
    movieRepository.insert(movieEntities).then((res) => {
      console.log("data added to movies");
    });
  });
};

populate();
