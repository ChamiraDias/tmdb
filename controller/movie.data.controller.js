const movie = require("../models/movies");
const filmography = require("../models/filmography");
const moviedetail = require("../models/moviedetails");
const axios = require('axios')
const sequelize = require("../db/db");
var moment = require('moment');

let controller = {}


controller.GetMoviesProProcessing = (limit) => {
    return new Promise((resolve, reject) => {

        movie.findAll({
            where: {
                detailsPulledAt: null,
                detailsPulledP: null
            },
            limit: limit
        }).then(function(results) {
            let ms = []
            if (results) {
                results.forEach(r => {
                    ms.push(r.id)
                })

                console.log("Processing - ", ms.join(', '));
                movie.update({ detailsPulledP: moment() }, {
                    where: {
                        id: {
                            $in: ms
                        }
                    }
                });

                resolve(results);
            } else {

                resolve([]);
            }


        }).catch(e => {

            resolve([]);
        })
    });
}




controller.getMoviesDetails = (req, res) => {
    if (res) {

        res.json({ "message": "Processing started" });
    }
    console.log("Pull movies from API");
    controller.GetMoviesProProcessing(30)
        .then(ms => {
            if (ms.length > 0) {
                let promises = [];
                let item_ids = [];

                ms.forEach(i => {
                    item_ids.push(i.id);
                    promises.push(controller.getSingleMovieDetail(i.movie_id));
                })

                Promise.all(promises)
                    .then(x => {
                        movie.update({ detailsPulledP: null }, {
                                where: {
                                    detailsPulledAt: null,
                                    id: {
                                        $in: item_ids
                                    }
                                }
                            })
                            .then(y => {
                                console.log("Process next set");
                                setTimeout(() => {

                                    controller.getMoviesDetails();
                                }, 10000)
                            })
                            .catch(e => {
                                console.log(e);
                            })
                    })
                    .catch(e => {
                        console.log(e);
                    })
            }
        })
}

controller.getSingleMovieDetail = function(movieid) {

    return new Promise(function(resolve, reject) {


        var url = 'https://api.themoviedb.org/3/movie/' + movieid + '?api_key=1527e6f2466d479e167b14c962e94e0e&language=en-US';

        console.log("Get data for movie - ", movieid);
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

                        console.log("Success - Get data for movie - ", movieid);
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

                        console.log("Error - Get data for movie - ", movieid, e);
                        movie.update({ detailsPulledAt: null, detailsPulledP: null }, {
                                where: {
                                    movie_id: result.id
                                }
                            })
                            .then(function(yyy) { resolve(true); }).catch(e => { resolve(true); });

                    });
            }).catch(e => {
                console.log("Error - Get data for movie - ", movieid, e);
                movie.update({ detailsPulledAt: null, detailsPulledP: null }, {
                        where: {
                            movie_id: result.id
                        }
                    })
                    .then(function(yyy) { resolve(true); }).catch(e => { resolve(true); });

            });
    });
}

//=====================================================================================================================================================
//============================================================================= Get Crew Details =======================================================
//======================================================================================================================================================



controller.GetMoviesProProcessing = (limit) => {
    return new Promise((resolve, reject) => {

        movie.findAll({
            where: {
                crewPulledAt: null,
                crewPulledP: null
            },
            limit: limit
        }).then(function(results) {
            let ms = []
            if (results) {
                results.forEach(r => {
                    ms.push(r.id)
                })

                console.log("Processing - ", ms.join(', '));
                movie.update({ crewPulledP: moment() }, {
                    where: {
                        id: {
                            $in: ms
                        }
                    }
                });

                resolve(results);
            } else {

                resolve([]);
            }


        }).catch(e => {

            resolve([]);
        })
    });
}



controller.getMovieCrewData = () => {

    console.log("Start Bulk process");
    console.log("Pull movies from API");
    controller.GetMoviesProProcessing(30)
        .then(ms => {
            if (ms.length > 0) {
                let promises = [];
                let item_ids = [];

                ms.forEach(i => {
                    item_ids.push(i.id);
                    promises.push(controller.getSingleMovieCrewDetail(i.movie_id));
                })

                Promise.all(promises)
                    .then(x => {
                        movie.update({ crewPulledP: null }, {
                                where: {
                                    crewPulledAt: null,
                                    id: {
                                        $in: item_ids
                                    }
                                }
                            })
                            .then(y => {
                                console.log("Bulk process done");

                            })
                            .catch(e => {
                                console.log(e);
                            })
                    })
                    .catch(e => {
                        console.log(e);
                    })
            }
        })
}

controller.getSingleMovieCrewDetail = function(movieid) {

    return new Promise(function(resolve, reject) {


        var url = 'https://api.themoviedb.org/3/movie/' + movieid + '/credits?api_key=1527e6f2466d479e167b14c962e94e0e';

        console.log("Get data for movie - ", movieid);
        axios.get(url)
            .then(function(results) {
                result = results.data;

                let pArray = [];
                if (results.data.cast) {

                    let createFilemograpies = [];
                    let createFilemograpyMovieIds = [];

                    for (let cast of results.data.cast) {
                        createFilemograpyMovieIds.push(movieid);
                        createFilemograpies.push({
                            'movie_id': movieid,
                            'user_id': cast.id,
                            'department': 'Cast',
                            'job': 'Actor',
                            'name': cast.name,
                            'gender': cast.gender,
                            'character': cast.character
                        });
                    }

                    pArray.push(new Promise((resolve1, reject1) => {

                        filmography.bulkCreate(createFilemograpies)
                            .then(d => {
                                movie.update({ crewPulledAt: moment() }, {
                                    where: {
                                        movie_id: createFilemograpyMovieIds
                                    }
                                })
                                resolve1(true);
                            }).catch(e => {

                                console.log("Error in set - ", createFilemograpyMovieIds);
                                movie.update({ crewPulledAt: null, crewPulledP: null }, {
                                    where: {
                                        movie_id: createFilemograpyMovieIds,
                                        crewPulledAt: null
                                    }
                                })
                                resolve1(true);
                            });
                    }))


                }

                if (results.data.crew) {

                    let createCrewFilemograpies = [];
                    let createCrewFilemograpyMovieIds = [];

                    for (let crew of results.data.crew) {
                        createCrewFilemograpyMovieIds.push(movieid);
                        createCrewFilemograpies.push({
                            'movie_id': movieid,
                            'user_id': crew.id,
                            'department': crew.department,
                            'job': crew.job,
                            'name': crew.name,
                            'gender': crew.gender,
                            'character': crew.character
                        });
                    }

                    pArray.push(new Promise((resolve1, reject1) => {

                        filmography.bulkCreate(createCrewFilemograpies)
                            .then(d => {
                                movie.update({ crewPulledAt: moment() }, {
                                    where: {
                                        movie_id: createCrewFilemograpyMovieIds
                                    }
                                })
                                resolve1(true);
                            }).catch(e => {

                                console.log("Error in set - ", createCrewFilemograpyMovieIds);
                                movie.update({ crewPulledAt: null, crewPulledP: null }, {
                                    where: {
                                        movie_id: createCrewFilemograpyMovieIds,
                                        crewPulledAt: null
                                    }
                                })
                                resolve1(true);
                            });
                    }))



                }

                //rr
                Promise.all(pArray)
                    .then(data => {
                        resolve(data);
                    }).catch(e => {
                        resolve(true);
                    })

            }).catch(e => {
                console.log("Error - Get data for movie - ", movieid, e);
                movie.update({ crewPulledAt: null, crewPulledP: null }, {
                        where: {
                            movie_id: result.id
                        }
                    })
                    .then(function(yyy) { resolve(true); }).catch(e => { resolve(true); });

            });
    });
}

module.exports = controller;