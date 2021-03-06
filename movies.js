var axios = require('axios')
chalk = require('chalk');
var Sequelize = require('sequelize');
// var totalPages = 1;

var url = 'https://api.themoviedb.org/3/discover/movie?api_key=1527e6f2466d479e167b14c962e94e0e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=2000'; //'https://service.tokocrypto.com/client/rates/ticker?currencyPair=btcidr',
var bak_page = 1;
var interval_count = 1;

var year = 2000;
var reqPages = 2;
// var leter = 0;
// var charcters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

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
    // genre_ids: Sequelize.STRING,
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

sequelize.sync()
    .then(function() {
        console.log('db sync');
    })
    .catch(function(err) {
        console.log(err);
    })


setInterval(function() {
    console.log('__time');
    app()
    interval_count++;
}, 6000)



async function fetchdata(url) {
    return await new Promise((resolve, reject) => {
        axios.get(url)
            .then(function(response) {

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


function pages(year) {
    var url = 'https://api.themoviedb.org/3/discover/movie?api_key=1527e6f2466d479e167b14c962e94e0e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=' + year;
    var pageCount = fetchdata(url);
    return pageCount;
}


function app() {
    var count = 1
    var arr = fetchdata(url);
    arr.then(function(resp) {
            // console.log(resp)
            let currentPage = (interval_count > 1) ? bak_page + 1 : resp.page;
            let totalPages = resp.data.total_pages;
            return result = {
                currentPage: currentPage,
                totalPages: totalPages
            }
        })
        .then(function(result) {
            console.log('current_page', result.currentPage);
            console.log('total_page', result.totalPages);

            for (result.currentPage; count < 10; result.currentPage++) {

                if (result.currentPage == reqPages) {
                    // c = String.fromCharCode(c.charCodeAt(0) + 1);
                    // console.log('------------------------ Letter Channed to ' + " " + c);
                    year++;
                    console.log('------------------------ Year Channed to ' + " " + year);
                    result.currentPage = 1;
                }
                var url = 'https://api.themoviedb.org/3/discover/movie?api_key=1527e6f2466d479e167b14c962e94e0e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=' + result.currentPage + '&year=' + year;
                // var url = 'https://api.themoviedb.org/3/search/movie?api_key=1527e6f2466d479e167b14c962e94e0e&language=en-US&query=' + c + '&page=' + result.currentPage + '&include_adult=false';
                console.log(url);
                var fullArr = fetchdata(url);

                fullArr.then(function(resp) {
                    console.log(resp.data.results);
                    for (i = 0; i < resp.data.results.length; i++) {
                        // movie.create({

                        //     'mid': resp.data.results[i].id,
                        //     'release_date': resp.data.results[i].release_date,
                        //     'title': resp.data.results[i].title,
                        //     'original_title': resp.data.results[i].original_title,
                        //     'adult': resp.data.results[i].adult,
                        //     'vote_count': resp.data.results[i].vote_count,
                        //     'vote_average': resp.data.results[i].vote_average,
                        //     'popularity': resp.data.results[i].popularity,
                        //     'original_language': resp.data.results[i].original_language,
                        //     'genre_ids': resp.data.results[i].genre_ids,
                        //     'backdrop_path': resp.data.results[i].backdrop_path,

                        // });

                    }
                })
                fullArr.catch(function(err) {
                    console.log(chalk.green(err));
                })

                bak_page = result.currentPage
                count++;
            }
            // }
        })
        .catch(function(err) {
            console.log(chalk.red(err));
        })

}


// console.log("hello")