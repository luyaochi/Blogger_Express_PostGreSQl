var routes  = require( './routes' );
var express = require('express');
var app = express();
var pg = require('pg');
var view = require('fs');
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use( bodyParser.urlencoded() ); // to support URL-encoded bodies

app.set('port', (process.env.PORT || 5000))
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'))


app.get('/', function(request, response) {
  var a = {'title':'titleName','name':'authorName','content':'blog_content','id':1};
  response.render('index.ejs',{'data':a});
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
app.get('/db2', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM blogger_table;', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { 
        var a = result.rows;
        response.render('db2.ejs',{'data' : a}); 
      }
    });
  });
})

app.post('/db/insert', function (request, response) {
  var a = request.body;
  var insert = a.id + ",\'" + a.title + "\',\'" + a.name + "\',\'" + a.content + "\'";

  insert = "insert into blogger_table  values (" + insert + ");"
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query(insert, function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { 
        //var a = result.rows;
        response.send({'data' : insert}); 
      }
    });
  });

});

app.post('/db/read', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM blogger_table;', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { 
        var a = result.rows;
        response.send({'data' : a}); 
      }
    });
  });

});

app.post('/db/update', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    var a = request.body;
    var update = a.title + "\',\'" + a.name + "\',\'" ;
    update = 'UPDATE blogger_table SET content = \'' + a.content + '\' WHERE title = \'' + a.title + '\' AND name = \'' + a.name + '\';';
    client.query(update, function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { 
        response.send({'data' : a}); 
      }
    });
  });

});

app.post('/db/delete', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    var a = request.body;
    var delete1 = 'DELETE FROM blogger_table  WHERE title = \'' + a.title + '\' AND name = \'' + a.name + '\';';
    client.query(delete1, function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { 

        response.send({'data' : a}); 
      }
    });
  });

});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});

