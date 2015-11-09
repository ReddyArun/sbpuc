var express = require('express');
var pg = require('pg');
var path = require('path');
var uuid = require('node-uuid');
var connectionString = require(path.join(__dirname, '../', '../', 'configuration'));

var router = express.Router();

/* GET home page. */
router.post('/', function (req, res) {
    var results = [];
    // Grab data from http request
     console.log(req.body);
    var data = {
        id: uuid.v1(),
        name: req.body.name,
        dob: new Date(req.body.dob).toISOString().substr(0,10),
        rollnumber: req.body.rollnumber,
        class: req.body.class,
        initialfee: req.body.initialfee.toString(),
        mobile: req.body.mobile.toString(),
        address: req.body.address,
        sslcschooladdress: req.body.sslcschooladdress,
        sslcpercentage: req.body.sslcpercentage
    };
    console.log(data);
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function (err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Insert Data
        client.query("INSERT INTO student(id, name, dob, rollnumber, class, initialfee, mobile, address, sslcschooladdress, sslcpercentage) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)", [data.id, data.name, data.dob, data.rollnumber, data.class, data.initialfee, data.mobile, data.address, data.sslcschooladdress, data.sslcpercentage]);
        // SQL Query > Select Data
        var query = client.query("SELECT * FROM student ORDER BY id ASC");
        query.on('row', function (row) {
            results.push(row);
        });
        console.log(results);
        query.on('end', function () {
            done();
            return res.json(results);
        });
    });
});
module.exports = router;