var express = require('express');
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', '../', 'configuration'));

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    var results = [];
    // Grab data from the URL parameters
    var id = req.params.id;
    // Grab data from http request
    var data = {text: req.body.text, complete: req.body.complete};
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

module.exports = router;