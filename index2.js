const express = require("express");
var app = express();
var router = require("./router");
var db = require("./db/db");

//inject of routerss
app.get("/app", function(req, res) {
    res.send({ API: "api is working" })
})

app.use(router)

db.sequelize.sync()
    .then(function() {
        console.log('db sync');
    })
    .catch(function(err) {
        console.log(err);
    })

app.listen(9000, "localhost", () => {
    console.log("Service started on http://localhost:9000");
})