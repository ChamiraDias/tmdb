const express = require("express");
var app = express();
// var app2 = express();
// var app3 = express();
// var app4 = express();
var router = require("./router");
var db = require("./db/db");
var cron = require("./controller/cron.runner");

//inject of routerss
app.get("/app", function(req, res) {
    res.send({ API: "api is working" })
})

app.use(router);
// app2.use(router);
// app3.use(router);
// app4.use(router);


db.sequelize.sync()
    .then(function() {
        console.log('db sync');
    })
    .catch(function(err) {
        console.log(err);
    })

app.listen(8000, "localhost", () => {
        console.log("Service started on http://localhost:8000");
    })
    // app2.listen(8001, "localhost", () => {
    //     console.log("Service started on http://localhost:8001");
    // })
    // app3.listen(8002, "localhost", () => {
    //     console.log("Service started on http://localhost:8002");
    // })
    // app4.listen(8003, "localhost", () => {
    //     console.log("Service started on http://localhost:8003");
    // })