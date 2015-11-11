var express = require('express');
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', '../', 'configuration'));

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    var results = [];
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function (err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Select Data
        var query = client.query("SELECT * FROM student ORDER BY id ASC");
        query.on('row', function (row) {
            results.push(row);
        });
        query.on('end', function () {
            done();
            return res.json(results);
        });
    });
});
/* GET home page. */
router.get('/:id', function (req, res) {
    var results = [];
    // Grab data from the URL parameters
    var id = req.params.id;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function (err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Select Data
        var query = client.query("SELECT * FROM student WHERE id=($1)", [id]);
        query.on('row', function (row) {
            results.push(row);
        });
        query = client.query("SELECT * FROM studentfee WHERE studentid=($1)", [id]);
        query.on('row', function (row) {
            results.push(row);
        });
        query = client.query("SELECT sum(amount) paidamount FROM studentfee WHERE studentid=($1)", [id]);
        query.on('row', function (row) {
            results.push(row);
        });
        query.on('end', function () {
            done();
            console.log('results : ' + results);
            return res.json(results);
        });
        
    });
});
module.exports = router;