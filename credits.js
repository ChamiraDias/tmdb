var axios = require('axios')
chalk = require('chalk');
var Sequelize = require('sequelize');


var url = 'https://api.themoviedb.org/3/discover/movie?api_key=1527e6f2466d479e167b14c962e94e0e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=2000'; //'https://service.tokocrypto.com/client/rates/ticker?currencyPair=btcidr',
var bak_page = 1;
var interval_count = 1;

var year = 2000;
var reqPages = 2;
var result;

const sequelize = new Sequelize({
    database: 'imdb',
    username: 'root',
    password: null,
    dialect: 'mysql'
});

const movie = sequelize.define('movies', {
    mid: Sequelize.INTEGER,
    release_date: Sequelize.DATE,
    title: Sequelize.STRING,
    original_title: Sequelize.STRING,
    adult: Sequelize.TEXT,
    vote_count: Sequelize.INTEGER,
    vote_average: Sequelize.FLOAT,
    popularity: Sequelize.FLOAT,
    original_language: Sequelize.STRING,
    genre_ids: {
        type: Sequelize.STRING,
        get: function() {
            return JSON.parse(this.getDataValue('genre_ids'));
        },
        set: function(val) {
            return this.setDataValue('genre_ids', JSON.stringify(val));
        }
    },
    backdrop_path: Sequelize.TEXT,

})
let j = 1;
// Pick movie id  one by one from the database table - movies
movie.findById(j).then(function(result) {
    console.log(result.dataValues.mid);
    var url = 'https://api.themoviedb.org/3/movie/' + result.dataValues.mid + '/credits?api_key=1527e6f2466d479e167b14c962e94e0e';
    console.log(url);
    console.log(j++);
    setInterval(function() {
        console.log('__time');
        var arr = fetchdata(url).then(function(results) {
            console.log(results.data.cast.length);
            for (i = 0; i < results.data.cast.length; i++) {
                console.log(results.data.cast[i].name);
            }
        });
        interval_count++;
    }, 6000)

})

async function fetchdata(url) {
    return await new Promise((resolve, reject) => {
        axios.get(url)
            .then(response => {

                // for (i = 0; i < response.data.results.length; i++) {
                //     movie.create({
                //         'mid': response.data.results[i].id,
                //         'title': response.data.results[i].title,
                //         'adult': response.data.results[i].adult,
                //         'backdrop_path': response.data.results[i].backdrop_path,
                //         'original_language': response.data.results[i].original_language,
                //         'original_title': response.data.results[i].original_title,
                //         'popularity': response.data.results[i].popularity,
                //         'poster_path': response.data.results[i].poster_path,
                //         'release_date': response.data.results[i].release_date,
                //         'vote_average': response.data.results[i].vote_average,
                //         'vote_count': response.data.results[i].vote_count
                //     });
                // }
                // console.log(response.data.results[0].title);
                resolve(response);
            })
            .catch(function(error) {
                console.log(chalk.red(error));
                reject(error);
            });
    })
}