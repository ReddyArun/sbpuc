var express = require('express');
var pg = require('pg');
var uuid = require('node-uuid');

var router = express.Router();

/* GET home page. */
router.post('/:id', function (req, res) {
    var results = "";
    var id = req.params.id;
    var data = {
        id: uuid.v1(),
        studentid: id,
        amount: req.body.amount,
        description: req.body.description,
        date: new Date()
    };
    // Get a Postgres client from the connection pool
    pg.connect(global.connectionString, function (err, client, done) {
        // Handle connection errors
        if (err) {
            done();
            console.log(err);
            return res.status(500).json({success: false, data: err});
        }
        // SQL Query > Insert Data
        client.query("INSERT INTO studentfee(studentfeeid, studentid, amount, description, paiddate) values($1, $2, $3, $4, $5)", [data.id, data.studentid, data.amount, data.description, data.date]);
//        // SQL Query > Select Data
//        var query = client.query("SELECT * FROM student WHERE id=($1)", [id]);
//        query.on('row', function (row) {
//            results = row;
//        });
//        query = client.query("SELECT * FROM studentfee WHERE studentid=($1)", [id]);
//        query.on('row', function (row) {
//            results += row;
//        });
//        query = client.query("SELECT sum(amount) paidamount FROM studentfee WHERE studentid=($1)", [id]);
//        query.on('row', function (row) {
//            results += row;
//        });
//        query.on('end', function () {
//            done();
//            return res.json(results);
//        });
        return res.json(data.id);
    });
});
module.exports = router;