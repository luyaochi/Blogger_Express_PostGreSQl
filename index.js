
var express = require('express');
var app = express();
var pg = require('pg');
var view = require('fs')


app.set('port', (process.env.PORT || 5000))
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  response.render('index.ejs');
})

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM blogger_table;', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { 
        var a = result.rows;
        response.render('db.ejs',{data : a}); 
      }
    });
  });
})

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})