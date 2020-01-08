var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require('mysql');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.por || 3000;
var router = express.Router();

app.all("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", router);


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "zenpower"
});

router.get("/consumptioncount", function (req, res, next) {
	
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "SELECT count(totalinlet) FROM water_daywise";
  con.query(sql, function (err, result) {
    if (err) throw err;
   res.send(result);
  });
});
});

router.get("/consumptionrecords", function (req, res, next) {
	
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "SELECT * FROM water_daywise";
  con.query(sql, function (err, result) {
    if (err) throw err;
   res.send(result);
  });
});
});

app.listen(port, function () {
    console.log("Express server running on port %d", port);
});