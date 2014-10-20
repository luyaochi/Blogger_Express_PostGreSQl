
var express = require('express');
var app = express();
var pg = require('pg');
var view = require('fs')


app.set('port', (process.env.PORT || 5000))
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))

app.get('/', function(request, response) {
  var a = {'1':'testing data','2':'data2'};
  response.render('index.ejs',{'data':a['1']});
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
        response.render('db.ejs',{'data' : a}); 
      }
    });
  });
})


app.post('/db/create', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM blogger_table;', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { 
        var a = result.rows;
        response.render('db.ejs',{'data' : a}); 
      }
    });
  });
  console.log('create');

});

app.get('/db/read', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM blogger_table;', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { 
        var a = result.rows;
        response.render('db.ejs',{'data' : a}); 
      }
    });
  });
  console.log('read');

});

app.post('/db/update', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM blogger_table;', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { 
        var a = result.rows;
        response.render('db.ejs',{'data' : a}); 
      }
    });
  });
  console.log('update');

});

app.post('/db/delete', function (request, response) {
  pg.connect("pg://postgres:@localhost:5432/blogger_table", function(err, client, done) {
    client.query('SELECT * FROM blogger_table;', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { 
        var a = result.rows;
        response.render('db.ejs',{'data' : a}); 
      }
    });
  });
  console.log('delete');

});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});

