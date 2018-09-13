const express = require("express");
var router = express.Router();

const movie = require("./controller/movie.controller")
const moviedata = require("./controller/movie.data.controller")

router.route('/app/getMovieCrewData').get(moviedata.getMovieCrewData) // Movies table - Done
router.route('/app/getMoviesByYearNPages/:min/:max').get(movie.getMoviesByYearNPages) // Movies table - Done
router.route('/app/getMovieDetail/').get(movie.getMovieDetail) // Movie Detail table - Done 
router.route('/app/createDataWh/').get(movie.createDataWh)


router.route('/app/Test/').get(movie.Test)
    // router.route('/app/TestgetMovieDetail/').get(movie.TestgetMovieDetail) // Test Movie Detail table

router.route('/tmpCredits/').get(movie.tmpCredits)


router.route('/app/get-single-movie/').get(movie.getSingleMovieDetail)
    // router.route('/app/get-single-crew/').get(movie.getSingleCrewDetail)



router.route('/app/get-movie-data/').get(moviedata.getMoviesDetails)


module.exports = router;