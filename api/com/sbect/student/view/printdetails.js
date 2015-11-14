var express = require('express');
var pg = require('pg');
var path = require('path');

var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    console.log(req.body.id);
    console.log(req.body.fid);
    res.sendFile(path.join(__dirname, '../', '../', '../', '../', '../', 'client', 'views', 'templates', 'student', 'view', 'print.html'));
});
router.get('/:sid/:fid', function (req, res) {
    var results = [];
    // Grab data from the URL parameters
    var id = req.params.sid;
    var feeid = req.params.fid;
    // Get a Postgres client from the connection pool
    pg.connect(global.connectionString, function (err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Select Data
        var query = client.query("SELECT name, class, puc1fee, puc2fee, amount, paiddate, (SELECT sum(amount) FROM studentfee WHERE studentid=($1)) paidamount FROM student s join studentfee sf ON sf.studentid = s.id WHERE id = ($2) and studentfeeid = ($3)", [id, id, feeid]);
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