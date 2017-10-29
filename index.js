var express = require('express');
var app = express();


var db = require('./db/connect');
var client = db();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  const text= 'CREATE TABLE IF NOT EXISTS student("student_id" SERIAL PRIMARY KEY, "name" varchar(255), "subgroup" varchar(255), "role" varchar(255), "domain" varchar(255), "modulefirst" integer, "modulesecond" integer)';
  const users = [];
  client.query(text, (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      users.push(JSON.stringify(row))
    }
  });
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


app.post('/', function(req, res, next) {
    var reqBody = '';
    req.on('data', function (data) {
        reqBody += data;
        if (reqBody.length > 1e7) {
            console.log(req, res, err);
        }
    });

    req.on('end', function () {
        reqBody = JSON.parse(reqBody);
        var sql = "INSERT INTO student(name, subgroup, role, domain, modulefirst, modulesecond) VALUES" +
        "('" + reqBody.name + "', '" + reqBody.subgroup + "', '" + reqBody.role +"', '" + reqBody.domain + "','" + reqBody.module_first + "', '" + reqBody.module_second + "')";
         client.query(sql, function(err, res){
          if (err) {
              console.log(err.stack)
            } else {
              console.log(res.rows[0])
            }
     });
        res.send('ok!');
    });
});
