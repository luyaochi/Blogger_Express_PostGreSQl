exports.db2 = function ( req, res ){
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
	    client.query('SELECT * FROM blogger_table;', function(err, result) {
	      done();
	      if (err)
	       { console.error(err); response.send("Error " + err); }
	      else
	       { 
	        var a = result.rows;
	        response.render('db2',{'data' : a}); 
	      }
	    });
	  });
};