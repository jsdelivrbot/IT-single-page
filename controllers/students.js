var express = require('express');
var app = express();


var db = require('../db/connect');
var app = require('../index');
var client = db();
// Список продуктов
module.exports.getStudents = function (req, res) {
    client.query('SELECT * FROM student', function (data, err) {
        if (!err) {
            res.render('students', {
                students: JSON.stringify(data)
            });
        } else {
            console.log(req, res, err);
        }
    });
};
