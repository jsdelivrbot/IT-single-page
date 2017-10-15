var express = require('express');
var app = express();


const { Client } = require('pg')

const client = new Client(process.env.DATABASE_URL ? {
  connectionString: process.env.DATABASE_URL
} : {
  user: 'postgres',
  host: 'localhost',
  database: 'group',
  password: '0945vinn',
  port: 5432,
});

client.connect();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  const text= 'CREATE TABLE IF NOT EXISTS student("student_id" SERIAL PRIMARY KEY, "name" varchar(255), "role" varchar(255), "domain" varchar(255))';
  const users = [];
  client.query(text, (err, res) => {
    // if (err) throw err;
    // for (let row of res.rows) {
    //   users.push(JSON.stringify(row))
    // }
    console.log(err,res);
    client.end();
  });
  console.log(users);
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
