var cron = require('cron');

let controller = require('../controller/movie.data.controller');

var job1 = new cron.CronJob({
    cronTime: "*/15 * * * * *",
    onTick: function() {
        controller.getMovieCrewData();
        console.log(
            "\n----------------------------------------------Running Event Monitor--------------------------------------\n"
        );
    },
    start: true
        ///
});