const movie = require("../models/movies");
const filmography = require("../models/filmography");
const moviedetail = require("../models/moviedetails");
const moviewh = require("../models/moviewh");
const axios = require('axios')
const async = require('async')
const util = require('../utils/utils')
const sequelize = require("../db/db");

var tempActorCount = 0;
var tempWriterCount = 0;
let aa;
var controller = {};

//-----------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------- Get Movie Crew Modified ------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------//
//

var moment = require('moment');
// controller.getSingleCrewDetail = function(movieid) {

//     return new Promise(function(resolve, reject) {
//         // console.log('***************************' + movieid);

//         var url = 'https://api.themoviedb.org/3/movie/' + movieid + '/credits?api_key=1527e6f2466d479e167b14c962e94e0e';

//         axios.get(url)
//             .then(function(results) {
//                 result = results.data;

//                 console.log(results.data.crew);
//                 if (results.data.cast) {
//                     //console.log('++++++++++++++++++++++cast', results.data.cast)
//                     results.data.cast.forEach(cast => {
//                         // console.log('++++++++++++++++++++++cast', cast)
//                         filmography.create({
//                                 'movie_id': movieid,
//                                 'user_id': cast.id,
//                                 'department': 'Cast',
//                                 'job': 'Actor',
//                                 'name': cast.name,
//                                 'gender': cast.gender,
//                                 'character': cast.character
//                             })
//                             .then(function(xxx) {

//                                 console.log("update time stampp", moment());
//                                 movie.update({ detailsPulledAt: moment() }, {
//                                         where: {
//                                             movie_id: xxx.movie_id
//                                         }
//                                     })
//                                     .then(function(yyy) {

//                                         resolve(true);
//                                     }).catch(e => {
//                                         console.log(e);
//                                         resolve(true);
//                                     });

//                             })
//                             .catch(e => {
//                                 console.log('Érror in creating Cast' + e);
//                                 // resolve(true);
//                             });
//                     })
//                 }

//                 if (results.data.crew) {
//                     console.log("!!!!!!")
//                         //console.log('++++++++++++++++++++++crew', results.data.crew)
//                     results.data.crew.forEach(crew => {
//                         // console.log('++++++++++++++++++++++cast', crew)
//                         filmography.create({
//                             'movie_id': movieid,
//                             'user_id': crew.id,
//                             'department': crew.department,
//                             'job': crew.job,
//                             'name': crew.name,
//                             'gender': crew.gender,
//                             'character': crew.character
//                         })

//                         .then(function(xxx) {

//                             console.log("update time stampp", moment());
//                             movie.update({ detailsPulledAt: moment() }, {
//                                     where: {
//                                         movie_id: xxx.movie_id
//                                     }
//                                 })
//                                 .then(function(yyy) {

//                                     resolve(true);
//                                 }).catch(e => {
//                                     console.log(e);
//                                     resolve(true);
//                                 });

//                         }).catch(e => {
//                             // resolve(true);
//                             console.log('Error creating Crew' + e)
//                         });
//                     })
//                 }

//             }).catch(e => {
//                 console.log('***************************' + result);
//                 resolve(true);
//             });
//     });
// }


// var prossesingMovieId = 0;

// function get40Crew() {
//     return new Promise((resolve, reject) => {

//         sequelize.sequelize.transaction().then(function(t) {
//             return movie.findAll({
//                     limit: 2,
//                     where: {
//                         // detailsPulledAt: {
//                         //     $in: [null, 0, '']
//                         // },
//                         // detailsPulledP: {
//                         //     $in: [null, 0, '']
//                         // },
//                         detailsPulledAt: {
//                             $eq: null
//                         },
//                         detailsPulledP: {
//                             $eq: null
//                         },
//                     },

//                     lock: true,
//                     skipLocked: true,
//                     transaction: t
//                 })
//                 .then(movies => {
//                     let ps = [];
//                     for (let m of movies) {
//                         m.update({ detailsPulledP: moment() })
//                     }

//                     Promise.all(ps).then(ups => {
//                             t.commit();
//                             return resolve(movies);
//                         })
//                         .catch(e => {

//                             t.rollback();
//                             return reject(e);
//                         })
//                 })
//                 .catch(e => {
//                     t.rollback();
//                     return reject(e);
//                 })
//         });
//     });
// }


// controller.getCrewDetailsBulk = function() {


//     get40Crew()
//         .then(function(movies) {
//             let cont = false;

//             if (movies.length >= 40) {
//                 cont = true;
//             }

//             let promises = [];

//             for (let m of movies) {

//                 prossesingMovieId = m.movie_id;
//                 promises.push(controller.getSingleCrewDetail(m.movie_id));
//             }

//             Promise.all(promises)
//                 .then(function(results) {
//                     if (cont) {
//                         controller.getCrewDetailsBulk();
//                     }
//                 })

//             .catch(function(e) {
//                 console.log(e);
//             });
//         })

//     .catch(function(e) {
//         console.log(e);
//     });

// }


// controller.getMovieCrewData = function(req, res) {

//     controller
//         .getCrewDetailsBulk();


//     res.json({ message: 'Prosessing in background!', now: prossesingMovieId });

//     return 0;

// }






//-----------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------- Get Movie Crew Oriinal--------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------//



// controller.findMovieCrewAndGetData = function(req, res) {
//     let foundData = [];
//     movie.findAll({ attributes: ['movie_id'] }).then(function(results) {

//         // console.log('Length' + results.length);
//         // console.log(results[1].dataValues);
//         // console.log(results.data.crew);




//         async.each(results, function(result, callback) {
//             var url = 'https://api.themoviedb.org/3/movie/' + result.movie_id + '/credits?api_key=1527e6f2466d479e167b14c962e94e0e';

//             // console.log('__time', result.id, result.mid);
//             axios.get(url)
//                 .then(results => {
//                     console.log(results.data.crew);
//                     if (results.data.cast) {
//                         //console.log('++++++++++++++++++++++cast', results.data.cast)
//                         results.data.cast.forEach(cast => {
//                             // console.log('++++++++++++++++++++++cast', cast)
//                             filmography.create({
//                                 'movie_id': result.movie_id,
//                                 'user_id': cast.id,
//                                 'department': 'Cast',
//                                 'job': 'Actor',
//                                 'name': cast.name,
//                                 'gender': cast.gender,
//                                 'character': cast.character
//                             });
//                         })
//                     }

//                     if (results.data.crew) {
//                         console.log("!!!!!!")
//                             //console.log('++++++++++++++++++++++crew', results.data.crew)
//                         results.data.crew.forEach(crew => {
//                             // console.log('++++++++++++++++++++++cast', crew)
//                             filmography.create({
//                                 'movie_id': result.mid,
//                                 'user_id': crew.id,
//                                 'department': crew.department,
//                                 'job': crew.job,
//                                 'name': crew.name,
//                                 'gender': crew.gender,
//                                 'character': crew.character
//                             });
//                         })
//                     }

//                     console.log('Crew----------------------' + results.data.crew.length);
//                     console.log('Length----------------------' + results.data.cast.length);

//                     for (i = 0; i < results.data.cast.length; i++) {
//                         //console.log(results.data.cast[i].name);
//                     }
//                     foundData.push(results.data)
//                     callback()
//                         // setTimeout(function() {callback()}, 10000)

//                 })
//                 .catch(err => {
//                     callback(err)
//                 })

//         }, function(err) {
//             res.send(foundData).status(200)
//         });
//     })
// }

//-----------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------//
//---------------------------------------------------- Get Movies -------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------//




controller.getMoviesByYearNPages = function(req, res) {

    let urls = [];
    let baseUrl = "https://api.themoviedb.org/3/discover/movie?api_key=1527e6f2466d479e167b14c962e94e0e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&";

    if (req.params.min > req.params.max) {
        res.send({ error: "min year should no grater than max year(min = " + req.params.min + " - max = " + req.params.max }).status(400);
        return false;
    }

    for (let i = req.params.min; i <= req.params.max; i++) {
        urls.push({ url: "page=1&year=" + i, year: i })
    }

    console.log("--URLS--", urls)

    async.each(urls, function(url, callback) {
        // console.log("--Curtrent URL--", baseUrl + url.url) //concatenate Base URl with the modified url
        axios.get(baseUrl + url.url)
            .then(results => {
                // console.log(results.data);

                if (results.data.total_pages == 1) {
                    create(results.data.results[0])
                        .then(response => {
                            callback()
                        })
                } else if (results.data.total_pages > 1) {
                    let subPages = [];

                    for (let j = 1; j <= results.data.total_pages; j++) {
                        subPages.push({ url: "page=" + j + "&year=" + url.year, year: url.year, page: j })
                    }

                    util.asyncLoop(subPages.length, function(loop) {
                        axios.get(baseUrl + subPages[loop.iteration()].url)
                            .then(pageResults => {
                                let records = [];
                                if (pageResults.data.results.length > 0) {
                                    // console.log("--Curtrent Page URL--", baseUrl + subPages[loop.iteration()].url)
                                    // console.log("*****************************************************Length***********************************************", pageResults.data.results.length)
                                    //console.log(pageResults.data.results);
                                    pageResults.data.results.forEach(subPageData => {
                                        // console.log('ooooooooooooooooooooooo', "00000000000000000");
                                        // console.log(subPageData.id);
                                        // /console.log('ooooooooooooooooooooooo', "00000000000000000");

                                        records.push(create({
                                            'release_date': subPageData.release_date,
                                            'movie_id': subPageData.id,
                                            'title': subPageData.title,
                                            'original_title': subPageData.original_title || "",
                                            'adult': subPageData.adult,
                                            'vote_count': subPageData.vote_count,
                                            'vote_average': subPageData.vote_average,
                                            'popularity': subPageData.popularity,
                                            'original_language': subPageData.original_language,
                                            'genre_ids': JSON.stringify(subPageData.genre_ids),
                                            'backdrop_path': subPageData.backdrop_path,

                                        }))
                                    });

                                    Promise.all([records])
                                        .then(response => {
                                            setTimeout(function() {
                                                loop.next()
                                            }, 10000)
                                        })
                                        .catch(err => {
                                            console.log("--err--", err)
                                            setTimeout(function() {
                                                loop.next()
                                            }, 10000)
                                        })

                                } else {
                                    setTimeout(function() {
                                        loop.next()
                                    }, 10000)
                                }

                            })
                            .catch(err => {
                                console.log(err)
                                setTimeout(function() {
                                    loop.next()
                                }, 10000)
                            })
                    }, function() {
                        callback()
                    })

                    // let currentPage = 0;
                    // async.each(subPages, function(page, cbInside) {

                    //     setTimeout(function() {
                    //         axios.get(baseUrl + page.url)
                    //             .then(pageResults => {
                    //                 let records = [];
                    //                 if (pageResults.data.results.length > 0) {
                    //                     console.log("--Curtrent Page URL--", baseUrl + page.url)
                    //                     console.log("*****************************************************Length***********************************************", pageResults.data.results.length)

                    //                     pageResults.data.results.forEach(subPageData => {
                    //                         records.push(create({
                    //                             'mid': subPageData.id,
                    //                             'release_date': subPageData.release_date,
                    //                             'title': subPageData.title,
                    //                             'original_title': subPageData.original_title,
                    //                             'adult': subPageData.adult,
                    //                             'vote_count': subPageData.vote_count,
                    //                             'vote_average': subPageData.vote_average,
                    //                             'popularity': subPageData.popularity,
                    //                             'original_language': subPageData.original_language,
                    //                             'genre_ids': subPageData.genre_ids,
                    //                             'backdrop_path': subPageData.backdrop_path,

                    //                         }))
                    //                     });

                    //                     Prom7ise.all(records)
                    //                         .then(response => {
                    //                             // console.log("--created--", response)
                    //                             // currentPage++;
                    //                             cbInside()
                    //                         })
                    //                         .catch(err => {
                    //                             cbInside(err)
                    //                         })


                    //                     // bulkCreate(records)
                    //                     //     .then(response => {
                    //                     //         // console.log("--created--", response)
                    //                     //         currentPage++;
                    //                     //         cbInside()
                    //                     //     })
                    //                     //     .catch(err => {
                    //                     //         cbInside(err)
                    //                     //     })
                    //                 } else {
                    //                     cbInside()
                    //                 }

                    //             })
                    //             .catch(err => {
                    //                 console.log(err)
                    //                 cbInside(err)
                    //             })
                    //     }, 7000);


                    // }, function(err) {
                    //     callback()
                    // });
                } else {
                    console.log("cannot find any records");
                    callback()
                }

            })
            .catch(err => {
                callback(err)
            })

    }, function(err) {
        console.log("--err--", err)
        res.send({ sync: "done" }).status(200)
    });
}

controller.getMovieDetail = function(req, res) {
        // console.log('Hello');
        let foundData = [];
        movie.findAll({ attributes: ['movie_id'] }).then(function(results) {

            // console.log('Length' + results.length);
            // console.log(results[1].dataValues);
            // console.log(results);




            async.each(results, function(result, callback) {
                var url = 'https://api.themoviedb.org/3/movie/' + result.movie_id + '?api_key=1527e6f2466d479e167b14c962e94e0e&language=en-US';
                console.log('__URL', url);
                // console.log('__time', result.id, result.mid);
                axios.get(url)
                    .then(results => {
                        result = results.data
                        console.log(result);

                        // console.log({
                        //     'movie_id': result.id,
                        //     'imdb_id': result.imdb_id,
                        //     'original_language': result.original_language,
                        //     'original_title': result.original_title,
                        //     'budget': result.budget,
                        //     'revenue': result.revenue,
                        //     'runtime': result.runtime,
                        //     'status': result.status

                        // });

                        moviedetail.create({
                            'movie_id': result.id,
                            'imdb_id': result.imdb_id,
                            'original_language': result.original_language,
                            'original_title': result.original_title,
                            'budget': result.budget,
                            'revenue': result.revenue,
                            'runtime': result.runtime,
                            'status': result.status,
                            'popularity': result.popularity

                        });

                        // if (results.data.crew) {
                        //     console.log("!!!!!!")
                        //         //console.log('++++++++++++++++++++++crew', results.data.crew)
                        //     results.data.crew.forEach(crew => {
                        //         // console.log('++++++++++++++++++++++cast', crew)
                        //         filmography.create({
                        //             'movie_id': result.mid,
                        //             'user_id': crew.id,
                        //             'department': crew.department,
                        //             'job': crew.job,
                        //             'name': crew.name,
                        //             'gender': crew.gender,
                        //             'character': crew.character
                        //         });
                        //     })
                        // }

                        // console.log('MOvie Cost');


                        // for (i = 0; i < results.data.cast.length; i++) {
                        //     //console.log(results.data.cast[i].name);
                        // }
                        foundData.push(results.data)
                        callback()
                            // setTimeout(function() {callback()}, 10000)

                    })
                    .catch(err => {
                        callback(err)
                    })

            }, function(err) {
                res.send(foundData).status(200)
            });
        })
    }
    //-----------------------------------------------------------------------------------------------------------------------------------------//
    //-------------------------------------------------  Testing ------------------------------------------------------------------------------//
    //-----------------------------------------------------------------------------------------------------------------------------------------//

controller.Test = function(req, res) {
    movie.findAll({
        attributes: ['movie_id']
    }).then(function(results) {
        console.log(results[0].dataValues.movie_id);

    })

}

//-----------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------ Create Data WareHouse ------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------//


controller.createDataWh = async function(req, res) {


    await getCastCount()
    await HT();
    // await 
    // await getUniqDepartments();
    // .then(r => {
    //     // console.log('-----------', r[0].dataValues.movie_id);
    //     // console.log('-----------', r);
    //     // console.log('----------- p');
    // })




    // console.log('Hello');
    // let foundData = [];
    // movie.findAll({}).then(function(results) {

    //     // console.log('Length' + results.length);
    //     // console.log(results[1].dataValues);
    //     // console.log(results);




    //     async.each(results, function(result, callback) {
    //             filmography.findAll({
    //                 where: {
    //                     movie_id: result.movie_id,
    //                     department: 'Cast',

    //                 }
    //             }).then(res => {
    //                 console.log(res.length)
    //                 if (res.length > tmp_ActorCount) {
    //                     tmp_ActorCount = res.length;

    //                 }

    //                 // result = res.dataValues




    //             })

    //             console.log('+++++++++++++++++++' + tmp_ActorCount)
    //                 //JSON.stringify(res.data)
    //                 // var url = 'https://api.themoviedb.org/3/movie/' + result.mid + '?api_key=1527e6f2466d479e167b14c962e94e0e&language=en-US';
    //                 // console.log('__URL', url);
    //                 // console.log('__time', result.id, result.mid);
    //                 // axios.get(url)
    //                 //     .then(results => {

    //             // console.log(result.mid);

    //             // console.log({
    //             //     'movie_id': result.id,
    //             //     'imdb_id': result.imdb_id,
    //             //     'original_language': result.original_language,
    //             //     'original_title': result.original_title,
    //             //     'budget': result.budget,
    //             //     'revenue': result.revenue,
    //             //     'runtime': result.runtime,
    //             //     'status': result.status

    //             // });

    //             // moviewh.create({
    //             //     'movie_id': result.id,
    //             //     'imdb_id': result.imdb_id,
    //             //     'original_language': result.original_language,
    //             //     'original_title': result.original_title,
    //             //     'budget': result.budget,
    //             //     'revenue': result.revenue,
    //             //     'runtime': result.runtime,
    //             //     'status': result.status,
    //             //     'popularity': result.popularity

    //             // });

    //             // if (results.data.crew) {
    //             //     console.log("!!!!!!")
    //             //         //console.log('++++++++++++++++++++++crew', results.data.crew)
    //             //     results.data.crew.forEach(crew => {
    //             //         // console.log('++++++++++++++++++++++cast', crew)
    //             //         filmography.create({
    //             //             'movie_id': result.mid,
    //             //             'user_id': crew.id,
    //             //             'department': crew.department,
    //             //             'job': crew.job,
    //             //             'name': crew.name,
    //             //             'gender': crew.gender,
    //             //             'character': crew.character
    //             //         });
    //             //     })
    //             // }

    //             // console.log('MOvie Cost');


    //             // for (i = 0; i < results.data.cast.length; i++) {
    //             //     //console.log(results.data.cast[i].name);
    //             // }
    //             // foundData.push(results.data)
    //             // callback()
    //             // setTimeout(function() {callback()}, 10000)

    //             // }
    //             // )
    //             // .catch(err => {
    //             //     callback(err)
    // })
    // console.log('00000000' + tmp_ActorCount);
    // },

    //         function(err) {
    //             res.send(foundData).status(200)
    //         });

    // })


}
async function HT() {
    console.log('--------------------------')
}

async function getCastCount() {
    let resultArray = []
    const res = await movie.findAll().then(results => {
        async.each(results, function(result, callback) {
            filmography.findAll({
                // attributes: ['movie_id'],
                where: {
                    movie_id: result.dataValues.movie_id,
                    department: 'Cast'
                }
            }).then(actorCount => {
                // console.log('temppppppp', result.id);

                if (tempActorCount < actorCount.length) {
                    tempActorCount = actorCount.length
                }

                if (results.indexOf(result) === (results.length - 1)) {
                    console.log('------------ Actor Column Count is ----  ' + tempActorCount)

                }
                // callback();
            }).then(async function() {

                await filmography.findAll({
                    where: {
                        movie_id: result.dataValues.movie_id,
                        department: 'Writing'
                    }
                })


            }).then(writerCount => {
                async.each(writerCount, function(result2) {
                    console.log(result2);
                    // callback2()
                })


                // async.each(writerCount, function(result) {
                //     // if (tempWriterCount < writerCount.length) {
                //     //     tempWriterCount = writerCount.length
                //     // }

                //     // if (writerCount.indexOf(result) === (writerCount.length - 1)) {
                //     //     console.log('------------ tempWriterCount Count is ----  ' + tempWriterCount)

                //     // }

                // })



                // console.log('temppppppp', result.id);

                // if (tempWriterCount < writerCount.length) {
                //     tempWriterCount = writerCount.length
                // }

                // if (results.indexOf(result) === (results.length - 1)) {
                //     console.log('------------ tempWriterCount Count is ----  ' + tempWriterCount)

                // }
                callback();
            })

        })



        // for (var i = 0; i < results.length; i++) {
        //     // console.log('temppppppp', i);
        //     Promise.resolve(filmography.findAll({
        //         where: {
        //             movie_id: results[i].dataValues.movie_id,
        //             department: 'Cast'
        //         }
        //     })).then(actorCount => {
        //         console.log('temppppppp', i);
        //         // if (tempActorCount < actorCount.length) {
        //         //     tempActorCount = actorCount.length
        //         // }

        //         // if (i === (results.length - 1)) {
        //         //     console.log('------------' + tempActorCount)
        //         // }
        //         // console.log(actorCount.length)
        //     })




        // }

        // return resultArray;
    })

    // return res;

}





function create(data) {
    return new Promise((resolve, reject) => {
        movie.create({
                'movie_id': data.movie_id,
                'release_date': data.release_date,
                'title': data.title,
                'original_title': data.original_title,
                'adult': data.adult,
                'vote_count': data.vote_count,
                'vote_average': data.vote_average,
                'popularity': data.popularity,
                'original_language': data.original_language,
                'genre_ids': data.genre_ids,
                'backdrop_path': data.backdrop_path,

            }).then(response => {
                resolve(response)
            })
            .catch(err => {
                reject(err)
            })
    })
}

function bulkCreate(data) {
    return new Promise((resolve, reject) => {
        movie.bulkCreate(data).then(response => {
                resolve(response)
            })
            .catch(err => {
                reject(err)
            })
    })
}


//------------------------------------------------------------------------------------------------------------------------
// Getting Movie by movie credit details to DB ---------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------

controller.tmpCredits = function(req, res) {
    let tmpMovie_id = 120;
    // movie.findAll({}).then(function(results) {

    //     // console.log('Length' + results.length);
    //     // console.log(results[1].dataValues);
    //     // console.log(results.data.crew);




    //     async.each(results, function(result, callback) {
    var url = 'https://api.themoviedb.org/3/movie/' + tmpMovie_id + '/credits?api_key=1527e6f2466d479e167b14c962e94e0e';

    // console.log('__time', result.id, result.mid);
    axios.get(url)
        .then(results => {
            console.log(results.data.crew);
            if (results.data.cast) {
                //console.log('++++++++++++++++++++++cast', results.data.cast)
                results.data.cast.forEach(cast => {
                    // console.log('++++++++++++++++++++++cast', cast)
                    filmography.create({
                        'movie_id': results.data.id,
                        'user_id': cast.id,
                        'department': 'Cast',
                        'job': 'Actor',
                        'name': cast.name,
                        'gender': cast.gender,
                        'character': cast.character
                    });
                })
            }

            if (results.data.crew) {
                console.log("!!!!!!")
                    //console.log('++++++++++++++++++++++crew', results.data.crew)
                    // console.log('++++++++++++++++++++++cast', results.data)
                results.data.crew.forEach(crew => {

                    filmography.create({
                        'movie_id': results.data.id,
                        'user_id': crew.id,
                        'department': crew.department,
                        'job': crew.job,
                        'name': crew.name,
                        'gender': crew.gender,
                        'character': crew.character
                    });
                })
            }

            console.log('Crew----------------------' + results.data.crew.length);
            console.log('Length----------------------' + results.data.cast.length);

            // for (i = 0; i < results.data.cast.length; i++) {
            //     //console.log(results.data.cast[i].name);
            // }
            // foundData.push(results.data)
            // callback()
            // setTimeout(function() {callback()}, 10000)

            //                 })
            //                 .catch(err => {
            //                     callback(err)
            //                 })

            //         }, function(err) {
            //             res.send(foundData).status(200)
            //         });
        })
}

//-----------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------//
//------------------------------------------------ Get Movie Details ----------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------------------------------------------//




var moment = require('moment');
controller.getSingleMovieDetail = function(movieid) {

    return new Promise(function(resolve, reject) {


        var url = 'https://api.themoviedb.org/3/movie/' + movieid + '?api_key=1527e6f2466d479e167b14c962e94e0e&language=en-US';
        axios.get(url)
            .then(function(results) {
                result = results.data;

                moviedetail.create({
                        'movie_id': result.id,
                        'imdb_id': result.imdb_id,
                        'genres': result.genres,
                        'original_language': result.original_language,
                        'original_title': result.original_title,
                        'budget': result.budget,
                        'revenue': result.revenue,
                        'runtime': result.runtime,
                        'status': result.status,
                        'popularity': result.popularity
                    })
                    .then(function(xxx) {

                        console.log("update time stampp", moment());
                        movie.update({ detailsPulledAt: moment() }, {
                                where: {
                                    movie_id: xxx.movie_id
                                }
                            })
                            .then(function(yyy) {

                                resolve(true);
                            }).catch(e => {
                                console.log(e);
                                resolve(true);
                            });

                    })
                    .catch(e => {
                        resolve(true);
                    });
            }).catch(e => {
                resolve(true);
            });
    });
}


var prossesingMovieId = 0;

function get20Movies() {
    return new Promise((resolve, reject) => {

        sequelize.sequelize.transaction().then(function(t) {
            return movie.findAll({
                    limit: 40,
                    where: {
                        // detailsPulledAt: {
                        //     $in: [null, 0, '']
                        // },
                        // detailsPulledP: {
                        //     $in: [null, 0, '']
                        // },
                        detailsPulledAt: {
                            $eq: null
                        },
                        detailsPulledP: {
                            $eq: null
                        },
                    },

                    lock: true,
                    skipLocked: true,
                    transaction: t
                })
                .then(movies => {
                    let ps = [];
                    for (let m of movies) {
                        m.update({ detailsPulledP: moment() })
                    }

                    Promise.all(ps).then(ups => {
                            t.commit();
                            return resolve(movies);
                        })
                        .catch(e => {

                            t.rollback();
                            return reject(e);
                        })
                })
                .catch(e => {
                    t.rollback();
                    return reject(e);
                })
        });
    });
}


controller.getMoviesDetailsBulk = function() {


    get20Movies()
        .then(function(movies) {
            let cont = false;

            if (movies.length >= 40) {
                cont = true;
            }

            let promises = [];

            for (let m of movies) {

                prossesingMovieId = m.movie_id;
                promises.push(controller.getSingleMovieDetail(m.movie_id));
            }

            Promise.all(promises)
                .then(function(results) {
                    if (cont) {
                        controller.getMoviesDetailsBulk();
                    }
                })

            .catch(function(e) {
                console.log(e);
            });
        })

    .catch(function(e) {
        console.log(e);
    });

}


controller.getMovieDetail = function(req, res) {

    controller
        .getMoviesDetailsBulk();


    res.json({ message: 'Prosessing in background!', now: prossesingMovieId });

    return 0;

}



// assuming openFiles is an array of file names and saveFile is a function
// to save the modified contents of that file:

//     // async.each(results, function(err) {
//     //     // if any of the saves produced an error, err would equal that error
//     // });

//     movie.findAll({ attributes: ['movie_id'] }).then(function(results) {
//             // assuming openFiles is an array of file names
//             async.each(results, function(result, callback) {

//                 // Perform operation on file here.
//                 var url = 'https://api.themoviedb.org/3/movie/' + result.movie_id + '?api_key=1527e6f2466d479e167b14c962e94e0e&language=en-US';

//                 if (result.movie_id == null) {
//                     console.log('results.movie_id is NUll');
//                     callback('results.movie_id is NUll');
//                 } else {
//                     // Do work to process file here

//                     axios.get(url).then(function(results, callback) {
//                         result = results.data;
//                         moviedetail.create({
//                             'movie_id': result.id,
//                             'imdb_id': result.imdb_id,
//                             'genres': result.genres,
//                             'original_language': result.original_language,
//                             'original_title': result.original_title,
//                             'budget': result.budget,
//                             'revenue': result.revenue,
//                             'runtime': result.runtime,
//                             'status': result.status,
//                             'popularity': result.popularity
//                         })
//                         callback();
//                     }, 100000)

//                     console.log('File processed');
//                     callback();
//                 }
//             })
//         }
//         // , function(err) {
//         //     // if any of the file processing produced an error, err would equal that error
//         //     if (err) {
//         //         // One of the iterations produced an error.
//         //         // All processing will now stop.
//         //         console.log('A file failed to process');
//         //     } else {
//         //         console.log('All files have been processed successfully');
//         //     }
//         // }
//     );
// }

// movie.findAll({ attributes: ['movie_id'] }).then(function(results) {
//         // async.each(results, function(result, callback) {
//         // console.log(results.length);
//         // var movie = ['155', '671'];
//         // async.each(movie, function(results, callback) {
//         //     var url = 'https://api.themoviedb.org/3/movie/' + results.movie_id + '?api_key=1527e6f2466d479e167b14c962e94e0e&language=en-US';
//         //     console.log(url);
//         //     axios.get(url).then(function(results, callback) {
//         //         result = results.data;
//         //         moviedetail.create({
//         //             'movie_id': result.id,
//         //             'imdb_id': result.imdb_id,
//         //             'genres': result.genres,
//         //             'original_language': result.original_language,
//         //             'original_title': result.original_title,
//         //             'budget': result.budget,
//         //             'revenue': result.revenue,
//         //             'runtime': result.runtime,
//         //             'status': result.status,
//         //             'popularity': result.popularity
//         //         });

//         //         callback();

//         //     }).catch(callback())

//         // })
//     }).catch(console.log('Error3'))
//     // })



// result.movie_id
// var url = 'https://api.themoviedb.org/3/movie/' + 671 + '?api_key=1527e6f2466d479e167b14c962e94e0e&language=en-US';

// axios.get(url).then(function(result, callback) {
//     result = results.data;
//     moviedetail.create({
//         'movie_id': result.id,
//         'imdb_id': result.imdb_id,
//         'genres': result.genres,
//         'original_language': result.original_language,
//         'original_title': result.original_title,
//         'budget': result.budget,
//         'revenue': result.revenue,
//         'runtime': result.runtime,
//         'status': result.status,
//         'popularity': result.popularity
//     });

//     console.log(url);
//     callback();
// });
// console.log(url);
// callback();

// },
// function(err) {
//     if (err) {
//         console.log('error');
//     } else {
//         console.log('Done');
//     }
// });

//     let count = 0;
//     async.each(results, function(result, callback) {
//         // result.movie_id
//         count++;
//         if (count < 5) {
//             var url = 'https://api.themoviedb.org/3/movie/' + '671' + '?api_key=1527e6f2466d479e167b14c962e94e0e&language=en-US';
//             console.log(url);
//             axios.get(url)
//                 .then(results => {
//                     console.log("hello");
//                     result = results.data;
//                     moviedetail.create({
//                         'movie_id': result.id,
//                         'imdb_id': result.imdb_id,
//                         'genres': result.genres,
//                         'original_language': result.original_language,
//                         'original_title': result.original_title,
//                         'budget': result.budget,
//                         'revenue': result.revenue,
//                         'runtime': result.runtime,
//                         'status': result.status,
//                         'popularity': result.popularity
//                     });

//                 })
//         } else { console.log("End") }
//         // .catch(err => {
//         //     // callback(err)
//         //     console.log(err);
//         //     // console.log(movie_array);
//         // })


//     })

//     .catch(err => {
//         console.log("--err--", err)
//         setTimeout(function() {
//             loop.next()
//         }, 10000)
//         //     })
//     })
// }










// controller.getMoviesByYearNPages = function(req, res) {

//     let urls = [];
//     let subPages = [];
//     let baseUrl = "https://api.themoviedb.org/3/discover/movie?api_key=1527e6f2466d479e167b14c962e94e0e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&";

//     // console.log(req.params.min);
//     // console.log(req.params.max);


//     if (req.params.min > req.params.max) {
//         res.send({ error: "min year should no grater than max year(min = " + req.params.min + " - max = " + req.params.max }).status(400);
//         return false;
//     }

//     for (let i = req.params.min; i <= req.params.max; i++) {
//         urls.push({ url: "page=1&year=" + i, year: parseInt(i) })
//     }

//     return new Promise(function(resolve2, reject) {

//             async.each(urls, function(url, callback) {
//                 // console.log("--Curtrent URL--", baseUrl + url.url) //concatenate Base URl with the modified url
//                 return new Promise(function(resolve, reject) {
//                     console.log("--Curtrent URL--", baseUrl + url.url)
//                     axios.get(baseUrl + url.url)
//                         .then(results => {


//                             if (results.data.total_pages == 1) {
//                                 create(results.data.results[0])
//                                     .then(response => {
//                                         callback()
//                                     })
//                             } else if (results.data.total_pages > 1) {
//                                 // let subPages = [];

//                                 for (let j = 1; j <= results.data.total_pages; j++) {
//                                     subPages.push({ url: "page=" + j + "&year=" + url.year, year: url.year, page: j })
//                                 }

//                                 // util.asyncLoop(subPages.length, function(loop) {
//                                 //         // axios.get(baseUrl + subPages[loop.iteration()].url)
//                                 //         //     .then(pageResults => {
//                                 //         //         let records = [];
//                                 //         //         if (pageResults.data.results.length > 0) {
//                                 //         //             pageResults.data.results.forEach(subPageData => {
//                                 //         //                 records.push(create({
//                                 //         //                     'release_date': subPageData.release_date,
//                                 //         //                     'movie_id': subPageData.id,
//                                 //         //                     'title': subPageData.title,
//                                 //         //                     'original_title': subPageData.original_title || "",
//                                 //         //                     'adult': subPageData.adult,
//                                 //         //                     'vote_count': subPageData.vote_count,
//                                 //         //                     'vote_average': subPageData.vote_average,
//                                 //         //                     'popularity': subPageData.popularity,
//                                 //         //                     'original_language': subPageData.original_language,
//                                 //         //                     'genre_ids': JSON.stringify(subPageData.genre_ids),
//                                 //         //                     'backdrop_path': subPageData.backdrop_path,

//                                 //         //                 }))
//                                 //         //             });

//                                 //         //             Promise.all([records])
//                                 //         //                 .then(response => {
//                                 //         //                     setTimeout(function() {
//                                 //         //                         loop.next()
//                                 //         //                     }, 10000)
//                                 //         //                 })
//                                 //         //                 .catch(err => {
//                                 //         //                     console.log("--err--", err)
//                                 //         //                     setTimeout(function() {
//                                 //         //                         loop.next()
//                                 //         //                     }, 10000)
//                                 //         //                 })

//                                 //         //         } else {
//                                 //         //             setTimeout(function() {
//                                 //         //                 loop.next()
//                                 //         //             }, 10000)
//                                 //         //         }

//                                 //         //     })
//                                 //         //     .catch(err => {
//                                 //         //         console.log(err)
//                                 //         //         setTimeout(function() {
//                                 //         //             loop.next()
//                                 //         //         }, 10000)
//                                 //         //     })
//                                 //     },
//                                 //     function() {
//                                 //         // console.log("THE END ***********************************")
//                                 //         callback()
//                                 //     })

//                             } else {
//                                 console.log("cannot find any records");
//                                 callback()

//                             }

//                         })
//                         .catch(err => {
//                             callback(err)
//                         })
//                     resolve(true)
//                     callback()
//                 })
//             })
//             resolve2(true);
//         },



//         function(err) {
//             console.log("--err--", err)
//             console.log("THE END ***********************************")
//             res.send({ sync: "done" }).status(200)
//         }).then(res => {
//         console.log('111', res)
//     }, )
// }







module.exports = controller;