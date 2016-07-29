var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();
var mysql 		   = 		 require("mysql");
var con 		   = 		 mysql.createConnection({
							  host: "localhost",
							  user: "root",
							  password: "",
							  database: "test"
							});

app.get('/',function(req,res){
  res.sendFile('index.html',{ root : __dirname});
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

con.connect(function(err){
	if(err){
	    console.log('Error connecting to Db');
	    return;
	  }
	  app.post('/login',function(req,res){
	  	  console.log('Connection established');
	  	  var email		=	req.body.user;
		  var password	=	req.body.password;
		  console.log("User name = "+email+", password is "+password);
		  var qry = 'SELECT id,name,email FROM users where email="'+email+'"';
		  console.log("\n"+qry);
		  con.query(qry,function(err,rows){
		  	if(err)
		  	{
		      	console.log('Error Fetch in Record From Server: ');
		      	return;
		    }
		    if(rows.length==0){
				res.sendStatus(0);
		    	console.log("Invalid Email ID Try Again.....");
				return;
		    }else
		    {
		    	console.log(rows);
			}
		  });	
	   });	  
});

app.listen(3000,function(){
  console.log("Started on PORT 3000");
})